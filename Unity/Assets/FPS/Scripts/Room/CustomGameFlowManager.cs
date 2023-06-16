using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CustomGameFlowManager : MonoBehaviour
{
    [SerializeField] private List<CustomStartHandler> m_CustomStartHandlers = new List<CustomStartHandler>();

    private void Awake()
    {
        SeedGenerator seedGenerator = FindObjectOfType<SeedGenerator>();
        RoomManager roomManager = FindObjectOfType<RoomManager>();
        DifficultyHandler difficultyHandler = FindObjectOfType<DifficultyHandler>();

        m_CustomStartHandlers.Add(seedGenerator);
        m_CustomStartHandlers.Add(roomManager);
        m_CustomStartHandlers.Add(difficultyHandler);

        // ! FOR DEBUGGING

        // var deadCount = 10;
        // var winCount = 60;

        // seedGenerator.InitStats(0.7f, deadCount, winCount, deadCount + winCount);
    }

    void Start()
    {
        StartCoroutine(StartSequence());
    }

    IEnumerator StartSequence()
    {
        // Iterate through the list and call StartHandler() for each ICustomStartHandler implementation
        foreach (CustomStartHandler handler in m_CustomStartHandlers)
        {
            handler.StartHandler();
            yield return null;
        }
    }
}