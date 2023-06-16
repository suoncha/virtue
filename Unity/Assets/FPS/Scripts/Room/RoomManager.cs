using System.Collections;
using System.Collections.Generic;
using Random = System.Random;
using UnityEngine;

public class LevelConfig
{
    public string Id { get; set; }
    public string Name { get; set; }
    public Vector3Int LogicalPosition { get; set; }
    public Vector3Int Size { get; set; }

    public LevelConfig(string id, string name, Vector3Int logicalPosition, Vector3Int size)
    {
        Id = id;
        Name = name;
        LogicalPosition = logicalPosition;
        Size = size;
    }
}

class LevelSpawnManager
{
    public LevelConfig Config { get; }
    public GameObject Level { get; set; }
    public Vector3 AnchorPosition { get; }
    public float Multiplier { get; }

    public const float scaleX = 1.0f;
    public const float scaleY = 4f / 3f;
    public const float scaleZ = 1.0f;

    public LevelSpawnManager(LevelConfig config, float multiplier, Vector3 anchorPosition)
    {
        Config = config;
        Multiplier = multiplier;
        AnchorPosition = anchorPosition;
        // CreateLevel();
    }

    public void CreateLevel(bool force = true)
    {
        if (!force)
        {
            if (Level != null) return;
        }

        Level = new GameObject(Config.Name);
        Vector3 targetScale = new Vector3(
            Multiplier * scaleX,
            Multiplier * scaleY,
            Multiplier * scaleZ
        );
        Vector3 convertedVector = new Vector3(
            Config.LogicalPosition.x * targetScale.x,
            Config.LogicalPosition.y * targetScale.y,
            Config.LogicalPosition.z * targetScale.z
        );
        Vector3 realPosition = convertedVector + AnchorPosition;
        Level.transform.position = realPosition;
        Level.transform.rotation = Quaternion.identity;
    }
}

[System.Serializable]
public class CustomObject
{
    public Vector3Int location;
    public Vector3Int size;

    public CustomObject(Vector3Int location, Vector3Int size)
    {
        this.location = location;
        this.size = size;
    }
}

public class RoomManager : CustomStartHandler
{
    // Common Value
    [SerializeField]
    private GameObject m_basicFloorPrefab;

    [SerializeField]
    private GameObject m_wall4mPrefab;

    [SerializeField]
    private GameObject m_dunBigDoor;

    [SerializeField]
    private GameObject m_wallDoor;

    [SerializeField]
    private GameObject m_smallEnemyPrefab;

    [SerializeField]
    private GameObject m_bigEnemyPrefab;

    // [SerializeField]
    // private Generator3D generator3D;

    [SerializeField]
    private GameObject levelParent;

    [SerializeField]
    private Vector3 anchorPosition = new Vector3(0, 0, -200);

    [SerializeField]
    private int xCount = 3;

    [SerializeField]
    private int yCount = 3;

    [SerializeField]
    private int zCount = 3;

    [SerializeField]
    private Vector3Int roomSize = new Vector3Int(5, 5, 5);

    public List<LevelConfig> levelConfigs = new List<LevelConfig>();

    [SerializeField]
    private List<GameObject> levels = new List<GameObject>();

    [SerializeField]
    private List<LevelSpawnManager> levelSpawnManagers = new List<LevelSpawnManager>();

    [SerializeField]
    private List<GameObject> roomLevels = new List<GameObject>();

    [SerializeField]
    private DoorType m_TopDoorType = DoorType.BIG;
    [SerializeField] private DoorType m_BottomDoorType = DoorType.BIG;
    [SerializeField] private DoorType m_LeftDoorType = DoorType.BIG;
    [SerializeField] private DoorType m_RightDoorType = DoorType.BIG;
    [SerializeField] private int m_BigEnemyCount = 0;
    [SerializeField] private int m_SmallEnemyCount = 0;


    public override void StartHandler()
    {
        Debug.Log("Start room manager");
        levelConfigs.Clear();
        levelSpawnManagers.Clear();
        InitGenerator();
        CreateLevelConfigsFromAllCubeDatas();
        CreateLevelSpawnManagers();
        Debug.Log("level spawn manager count " + levelSpawnManagers.Count);
        SpawnPrefabsInLevels();
    }

    private void InitGenerator()
    {
        Generator3D.Instance.StartGenerating();
    }

    private void CreateLevelConfigsFromAllCubeDatas()
    {
        var allCubeDatas = Generator3D.Instance.allCubeDatas;
        foreach (var cubeData in allCubeDatas)
        {
            string id = $"generic cube {cubeData.location} {cubeData.size}";
            LevelConfig config = new LevelConfig(id, id, cubeData.location, cubeData.size);
            levelConfigs.Add(config);
        }
    }

    private void CreateLevelConfigsFromXYZCount()
    {
        for (int xIdx = 0; xIdx < xCount; xIdx++)
        {
            for (int yIdx = 0; yIdx < yCount; yIdx++)
            {
                for (int zIdx = 0; zIdx < zCount; zIdx++)
                {
                    string id = xIdx + " " + yIdx + " " + zIdx;
                    LevelConfig config = new LevelConfig(
                        id,
                        id,
                        new Vector3Int(xIdx, yIdx, zIdx),
                        roomSize
                    );
                    levelConfigs.Add(config);
                }
            }
        }
    }

    private void CreateLevelSpawnManagers()
    {
        Vector3 floorPrefabDimensions = GetPrefabDimensions(m_basicFloorPrefab);
        var multiplier = floorPrefabDimensions.x;

        foreach (LevelConfig config in levelConfigs)
        {
            LevelSpawnManager levelSpawnManager = new LevelSpawnManager(
                config,
                multiplier,
                anchorPosition
            );

            levelSpawnManagers.Add(levelSpawnManager);
        }
    }

    private void SpawnPrefabsInLevels()
    {
        for (int i = 0; i < levelParent.transform.childCount; i++)
        {
            var child = levelParent.transform.GetChild(i);
            child.gameObject.SetActive(false);
        }

        var generatedLevel = new GameObject("GeneratedLevel" + SceneReloadCounter.Instance.ReloadCount);
        generatedLevel.transform.position = Vector3.zero;
        generatedLevel.transform.rotation = Quaternion.identity;
        generatedLevel.transform.SetParent(levelParent.transform);

        int seed = Generator3D.Instance.Seed;
        Random random = new Random(seed);

        foreach (LevelSpawnManager manager in levelSpawnManagers)
        {
            manager.CreateLevel();

            if (manager.Level == null) continue;

            int bigEnemyCount = random.Next(0, m_BigEnemyCount + 1);
            int smallEnemyCount = random.Next(1, m_SmallEnemyCount + 1);

            RoomBuilder builder = new RoomBuilder();

            builder.SetBasicFloorPrefab(m_basicFloorPrefab)
                .SetWall4mPrefab(m_wall4mPrefab)
                .SetDunBigDoor(m_dunBigDoor)
                .SetWallDoor(m_wallDoor)
                .SetSmallEnemy(m_smallEnemyPrefab)
                .SetBigEnemy(m_bigEnemyPrefab)
                .SetSize(manager.Config.Size)
                .SetTopDoorType(m_TopDoorType)
                .SetBottomDoorType(m_BottomDoorType)
                .SetLeftDoorType(m_LeftDoorType)
                .SetRightDoorType(m_RightDoorType)
                .SetEnemyCount(bigEnemyCount, smallEnemyCount);

            RoomSpawner spawner = builder.Build(manager.Level);

            spawner.StartSpawn();
            levels.Add(manager.Level);
            manager.Level.transform.SetParent(generatedLevel.transform);

            if (IsRoom(manager.Config))
            {
                roomLevels.Add(manager.Level);
            }
        }
    }

    private bool IsRoom(LevelConfig config)
    {
        return config.Size.x >= 3 && config.Size.y >= 3 && config.Size.y >= 3;
    }

    private Vector3 GetPrefabDimensions(GameObject prefab)
    {
        MeshFilter meshFilter = prefab.transform.Find("Mesh").GetComponent<MeshFilter>();
        Bounds meshBounds = meshFilter.sharedMesh.bounds;
        Vector3 localScale = meshFilter.transform.localScale;

        float xDimension = meshBounds.size.x * localScale.x;
        float yDimension = meshBounds.size.y * localScale.y;
        float zDimension = meshBounds.size.z * localScale.z;

        return new Vector3(xDimension, yDimension, zDimension);
    }

    // Update is called once per frame
    void Update() { }
}
