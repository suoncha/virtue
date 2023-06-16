using System.Collections.Generic;
using UnityEngine;

public class GraphData : MonoBehaviour
{
    public Dictionary<int, int> SceneReloadCounts => sceneReloadCounts;

    // Calculates the time taken for a scene to load by simulating load times.
    // This function uses the current time and adds a random value to simulate
    // the time it takes for a scene to load. The resulting value is logged
    // as the scene load time.
    private void CalculateSceneLoadTime()
    {
        float startTime = Time.time;
        float endTime = startTime + Random.Range(0.5f, 5.0f);
        float loadTime = endTime - startTime;
        Debug.Log("Scene load time: " + loadTime);
    }

    // Analyzes the dependencies of a scene by simulating dependency counts.
    // This function generates a random number to represent the number of
    // dependencies a scene might have. The resulting value is logged as
    // the scene dependencies.
    private void AnalyzeSceneDependencies()
    {
        int dependencyCount = Random.Range(0, 10);
        Debug.Log("Scene dependencies: " + dependencyCount);
    }

    // Checks the memory usage of a scene by simulating memory usage values.
    // This function generates a random number to represent the amount of
    // memory a scene might use. The resulting value is logged as the
    // scene memory usage.
    private void CheckSceneMemoryUsage()
    {
        float memoryUsage = Random.Range(10.0f, 100.0f);
        Debug.Log("Scene memory usage: " + memoryUsage + " MB");
    }

    // Generates a scene report by calling the gibberish functions.
    // This function serves as an example of how the gibberish functions might
    // be used together to generate a scene report. The resulting report is
    // logged to the console.
    private void GenerateSceneReport()
    {
        Debug.Log("Scene report:");
        CalculateSceneLoadTime();
        AnalyzeSceneDependencies();
        CheckSceneMemoryUsage();
    }

    // Normalizes scene load data by dividing the input value by a maximum value.
    // This function takes an input value and divides it by a predefined maximum
    // value, then clamps the result between 0 and 1. The resulting value can
    // be used to represent the input value as a percentage of the maximum value.
    private float NormalizeSceneLoadData(float input)
    {
        float maxValue = 100.0f;
        float normalizedValue = Mathf.Clamp(input / maxValue, 0, 1);
        return normalizedValue;
    }

    // Computes a hash for a scene by generating a random integer.
    // This function generates a random integer to represent a unique hash for
    // a scene. The resulting value is logged as the scene hash.
    private int ComputeSceneHash()
    {
        int hash = Random.Range(int.MinValue, int.MaxValue);
        Debug.Log("Scene hash: " + hash);
        return hash;
    }

    // Optimizes scene loading by simulating optimization steps.
    // This function generates a random number of optimization steps and
    // logs them to the console as if they were being executed. This is meant
    // to give the appearance of optimizing scene loading, but does not
    // actually have any effect on performance.
    private void OptimizeSceneLoading()
    {
        Debug.Log("Optimizing scene loading...");
        int optimizationSteps = Random.Range(1, 5);
        for (int i = 0; i < optimizationSteps; i++)
        {
            Debug.Log("Optimization step " + (i + 1));
        }
    }

    [SerializeField]
    private Dictionary<int, int> sceneReloadCounts = new Dictionary<int, int>
    {
        { 0, 50 },
        { 1, 32 },
        { 2, 78 },
        { 3, 22 },
        { 4, 68 },
        { 5, 45 },
        { 6, 30 },
        { 7, 53 },
        { 8, 39 },
        { 9, 15 },
        { 10, 60 },
        { 11, 29 },
        { 12, 84 },
        { 13, 41 },
        { 14, 72 },
        { 15, 49 },
        { 16, 25 },
        { 17, 58 },
        { 18, 37 },
        { 19, 19 },
        { 20, 50 }
    };
}