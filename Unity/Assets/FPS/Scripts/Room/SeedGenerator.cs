using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Unity.FPS.Game;
using Unity.FPS.Gameplay;

public class SeedGenerator : CustomStartHandler
{
    /*
    The rate of hp: tính từ trung bình hp rate của mỗi màn chơi
    Win a level: hp percentage = hp / total hp
    Lose a level: hp percentage = 0
    */
    private float m_HpRate = 0.5f;

    private int m_DeadCount = 0;

    private int m_WinCount = 0;

    private int m_PlayTimeCount = 0;

    public const float HpRateWeight = 2.4f;
    public const float DeadCountWeight = -0.4f;
    public const float WinCountWeight = 3.9f;
    public const float PlayTimeCountWeight = 0.2f;

    private PlayerCharacterController m_PlayerCharacterController;
    private GameFlowManager m_GameFlowManager;

    private void Awake()
    {
        m_PlayerCharacterController = FindObjectOfType<PlayerCharacterController>();
        m_GameFlowManager = FindObjectOfType<GameFlowManager>();

        EventManager.AddListener<PlayerDeathEvent>(OnPlayerDeath);
        EventManager.AddListener<DisplayMessageEvent>(OnDisplayMessage);
    }

    void OnPlayerDeath(PlayerDeathEvent evt) =>
        UpdateStats(
            hpRate: m_HpRate * m_PlayTimeCount / (m_PlayTimeCount + 1),
            deadCount: m_DeadCount++,
            m_WinCount,
            playTimeCount: m_PlayTimeCount++
        );

    void OnDisplayMessage(DisplayMessageEvent evt) => Foo(evt);

    // REACT CALLBACKS

    public void InitStats(string inputData)
    {
        Debug.Log("Init stats");
	string[] saveInfo = inputData.Split('|');

        m_HpRate = float.Parse(saveInfo[0]);
        m_DeadCount = int.Parse(saveInfo[1]);
        m_WinCount = int.Parse(saveInfo[2]);
        m_PlayTimeCount = int.Parse(saveInfo[3]);
    }

    public (float, int, int, int) UpdateStats(
        float hpRate,
        int deadCount,
        int winCount,
        int playTimeCount
    )
    {
        return (hpRate, deadCount, winCount, playTimeCount);
    }

    public void Foo(DisplayMessageEvent evt)
    {
        if (evt == null)
            return;

        if (m_GameFlowManager == null)
            return;

        if (evt.Message != m_GameFlowManager.WinGameMessage)
            return;

        // if (m_PlayerCharacterController == null) return;

        UpdateStats(
            hpRate: m_HpRate * m_PlayTimeCount
                + m_PlayerCharacterController.PlayerHealth.GetRatio() / (m_PlayTimeCount + 1),
            deadCount: m_DeadCount,
            winCount: m_WinCount++,
            playTimeCount: m_PlayTimeCount++
        );
    }

    public override void StartHandler()
    {
        Debug.Log("Start seed Handler");

        int seed = GenerateSeed();

        Generator3D.Instance.setSeed(seed);
    }

    private int GenerateSeed()
    {
        float result =
            (HpRateWeight * m_HpRate)
            * ((DeadCountWeight * m_DeadCount) + (WinCountWeight * m_WinCount))
            / (PlayTimeCountWeight * m_PlayTimeCount);

        if (result < 0)
            result = 0;

        return (int)result;
    }
}
