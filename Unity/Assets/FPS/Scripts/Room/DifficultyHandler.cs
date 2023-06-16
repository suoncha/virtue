using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using Unity.FPS.Gameplay;
using Unity.FPS.Game;
using Unity.FPS.AI;

public class DifficultyHandler : CustomStartHandler
{
    public PlayerCharacterController CharacterController;
    public Health PlayerHealthManager;

    public List<EnemyController> EnemyControllers = new List<EnemyController>();
    public List<Health> EnemyHealthManagers = new List<Health>();

    public const float DetectionRangeReduceRate = 0.8f;
    public const float AttackRangeReduceRate = 0.8f;
    public const float DelayBetweenShotsReduceRate = 0.8f;
    public const float PlayedMostSeedRateThreshold = 0.9f;
    public const int DeathThreshold = 10;
    public const int CurrentSeedDeathThreshold = 2;
    public const float EasyToHardDropRate = 0.5f;
    public const float HardToEasyDropRate = 0.5f;
    public const int DefaultRandomSeed = 12345;

    public override void StartHandler()
    {
        Debug.Log("start difficulty handler");

        CharacterController = FindObjectOfType<PlayerCharacterController>();
        PlayerHealthManager = CharacterController.gameObject.GetComponent<Health>();

        EnemyControllers = FindObjectsOfType<EnemyController>().ToList();
        EnemyHealthManagers = EnemyControllers.Select(controller => controller.gameObject.GetComponent<Health>()).ToList();

        SceneReloadCounter.Instance.PrintSceneReloadCounts();
        SceneReloadCounter.Instance.PrintSeedReloadCounts();

        UpdateEnemyStatsBasedOnSeedReload();
    }

    private void UpdateEnemyStatsBasedOnSeedReload()
    {
        if (DieCurrentSeedTooManyTimes())
        {
            HandleDieCurrentSeedTooManyTimes();
        }

        if (PlayedMostSeeds())
        {
            HandlePlayedMostSeeds();
            return;
        }

        if (DiedTooManyTimesOnMostSeeds())
        {
            HandleDiedTooManyTimes();
            return;
        }
    }

    private bool PlayedMostSeeds()
    {
        int count = 0;

        Dictionary<int, int> seedReloadCountsDictionary = SceneReloadCounter.Instance.SeedReloadCounts;

        foreach (KeyValuePair<int, int> entry in seedReloadCountsDictionary)
        {
            int value = entry.Value;

            if (value >= 1 && value <= 2)
            {
                count++;
            }
        }

        return (float)count / seedReloadCountsDictionary.Count >= PlayedMostSeedRateThreshold;
    }

    private int GetCurrentSeedReloadCount()
    {
        int seed = Generator3D.Instance.Seed;

        return SceneReloadCounter.Instance.GetSeedReloadCount(seed);
    }

    private bool DieCurrentSeedTooManyTimes()
    {
        return GetCurrentSeedReloadCount() >= CurrentSeedDeathThreshold;
    }

    private void HandleDieCurrentSeedTooManyTimes()
    {
        int currentSeedReloadCount = GetCurrentSeedReloadCount();

        ReduceDifficultyByRate(currentSeedReloadCount - 1);
    }

    private void ReduceDifficultyByRate(int ratePower)
    {
        foreach (EnemyController controller in EnemyControllers)
        {
            DetectionModule detectionModule = controller.DetectionModule;
            WeaponController weapon = controller.GetCurrentWeapon();

            detectionModule.DetectionRange *= Mathf.Pow(DetectionRangeReduceRate, ratePower);
            detectionModule.AttackRange *= Mathf.Pow(AttackRangeReduceRate, ratePower);

            weapon.DelayBetweenShots *= Mathf.Pow(DelayBetweenShotsReduceRate, ratePower);
        }
    }

    private void HandlePlayedMostSeeds()
    {
        if (TryEasyToHard())
        {
            ReduceDifficultyByRate(-3);
        }
    }

    private bool TryEasyToHard()
    {
        Random.State originalRandomState = Random.state;
        Random.InitState(DefaultRandomSeed);

        var value = Random.value;

        Random.state = originalRandomState;

        return value <= EasyToHardDropRate;
    }

    private bool DiedTooManyTimesOnMostSeeds()
    {
        int totalDeaths = 0;

        Dictionary<int, int> seedReloadCountsDictionary = SceneReloadCounter.Instance.SeedReloadCounts;

        foreach (KeyValuePair<int, int> entry in seedReloadCountsDictionary)
        {
            int value = entry.Value;

            totalDeaths += value - 1;
        }

        return totalDeaths >= DeathThreshold;
    }

    private void HandleDiedTooManyTimes()
    {
        if (TryHardToEasy())
        {
            ReduceDifficultyByRate(3);
        }
    }

    private bool TryHardToEasy()
    {
        Random.State originalRandomState = Random.state;
        Random.InitState(DefaultRandomSeed);

        var value = Random.value;

        Random.state = originalRandomState;

        return value <= HardToEasyDropRate;
    }
}
