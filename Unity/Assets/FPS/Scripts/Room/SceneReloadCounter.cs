using UnityEngine;
using UnityEngine.SceneManagement;
using System.Collections.Generic;

public class SceneReloadCounter : MonoBehaviour
{
    public static SceneReloadCounter Instance { get; private set; }

    public int ReloadCount { get; private set; }

    public Dictionary<int, int> SeedReloadCounts;
    public Dictionary<string, int> SceneReloadCounts;

    private void Awake()
    {
        if (Instance == null)
        {
            Instance = this;
            DontDestroyOnLoad(gameObject);
        }
        else
        {
            Destroy(gameObject);
            return;
        }

        SceneReloadCounts = new Dictionary<string, int>();
        SeedReloadCounts = new Dictionary<int, int>();

        SceneManager.sceneLoaded += OnSceneLoaded;
    }

    private void OnSceneLoaded(Scene scene, LoadSceneMode mode)
    {
        string sceneName = scene.name;
        int seed = Generator3D.Instance.Seed;


        if (sceneName == SceneManager.GetActiveScene().name)
        {
            ReloadCount++;


            UpdateSceneReloadCounts(sceneName);

            if (sceneName == "RoomScene")
            {
                UpdateSeedReloadCounts(seed);
            }
        }
    }

    private void UpdateSceneReloadCounts(string sceneName)
    {
        if (SceneReloadCounts.ContainsKey(sceneName))
        {
            SceneReloadCounts[sceneName]++;
        }
        else
        {
            SceneReloadCounts.Add(sceneName, 1);
        }
    }

    private void UpdateSeedReloadCounts(int seed)
    {
        if (SeedReloadCounts.ContainsKey(seed))
        {
            SeedReloadCounts[seed]++;
        }
        else
        {
            SeedReloadCounts.Add(seed, 1);
        }
    }

    public void PrintSceneReloadCounts()
    {
        Debug.Log("Scene Reload Counts:");
        foreach (KeyValuePair<string, int> entry in SceneReloadCounts)
        {
            Debug.Log("scene name " + entry.Key + ", Reload Count: " + entry.Value);
        }
    }

    public void PrintSeedReloadCounts()
    {
        Debug.Log("Seed Reload Counts:");
        foreach (KeyValuePair<int, int> entry in SeedReloadCounts)
        {
            Debug.Log("seed name " + entry.Key + ", Reload Count: " + entry.Value);
        }
    }

    public int GetSeedReloadCount(int seed)
    {
        int reloadCount;

        if (SeedReloadCounts.TryGetValue(seed, out reloadCount))
        {
            return reloadCount;
        }

        return 0;
    }

    public int GetSceneReloadCount(string sceneName)
    {
        int reloadCount;

        if (SceneReloadCounts.TryGetValue(sceneName, out reloadCount))
        {
            return reloadCount;
        }

        return 0;
    }

    private void OnDestroy()
    {
        SceneManager.sceneLoaded -= OnSceneLoaded;
    }
}