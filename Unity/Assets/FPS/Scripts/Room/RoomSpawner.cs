using System.Collections.Generic;
using UnityEngine;
using UnityEngine.AI;

public class RoomSpawner : MonoBehaviour
{
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


    [SerializeField]
    private Vector3Int m_size;

    [SerializeField]
    private bool m_hasFloor = true;

    [SerializeField]
    private bool m_hasCeiling = true;

    [SerializeField]
    private bool m_hasLeftWall = true;

    [SerializeField]
    private bool m_hasRightWall = true;

    [SerializeField]
    private bool m_hasTopWall = true;

    [SerializeField]
    private bool m_hasBottomWall = true;

    [SerializeField]
    private DoorType m_topDoorType = DoorType.NONE;

    [SerializeField]
    private DoorType m_bottomDoorType = DoorType.NONE;

    [SerializeField]
    private DoorType m_leftDoorType = DoorType.NONE;

    [SerializeField]
    private DoorType m_rightDoorType = DoorType.NONE;

    [SerializeField] private int m_BigEnemyCount = 0;
    [SerializeField] private int m_SmallEnemyCount = 0;

    public GameObject AutoLevel;

    [SerializeField]
    private List<GameObject> m_floors = new List<GameObject>();

    [SerializeField]
    private List<GameObject> m_ceilings = new List<GameObject>();

    [SerializeField]
    private List<GameObject> m_walls = new List<GameObject>();

    [SerializeField]
    private List<GameObject> m_doors = new List<GameObject>();

    [SerializeField]
    private List<GameObject> m_Enemies = new List<GameObject>();

    private const int smallDoorHeight = 1;
    private const int smallDoorWidth = 1;
    private const int bigDoorHeight = 2;
    private const int bigDoorWidth = 3;

    public void SetProperties(
        GameObject basicFloorPrefab,
        GameObject wall4mPrefab,
        GameObject dunBigDoor,
        GameObject wallDoor,
        GameObject smallEnemy,
        GameObject bigEnemy,
        Vector3Int size,
        bool hasFloor,
        bool hasCeiling,
        bool hasLeftWall,
        bool hasRightWall,
        bool hasTopWall,
        bool hasBottomWall,
        DoorType topDoorType,
        DoorType bottomDoorType,
        DoorType leftDoorType,
        DoorType rightDoorType,
        int bigEnemyCount,
        int smallEnemyCount
    )
    {
        m_basicFloorPrefab = basicFloorPrefab;
        m_wall4mPrefab = wall4mPrefab;
        m_dunBigDoor = dunBigDoor;
        m_wallDoor = wallDoor;
        m_smallEnemyPrefab = smallEnemy;
        m_bigEnemyPrefab = bigEnemy;
        m_size = size;
        m_hasFloor = hasFloor;
        m_hasCeiling = hasCeiling;
        m_hasLeftWall = hasLeftWall;
        m_hasRightWall = hasRightWall;
        m_hasTopWall = hasTopWall;
        m_hasBottomWall = hasBottomWall;
        m_topDoorType = topDoorType;
        m_bottomDoorType = bottomDoorType;
        m_leftDoorType = leftDoorType;
        m_rightDoorType = rightDoorType;
        m_BigEnemyCount = bigEnemyCount;
        m_SmallEnemyCount = smallEnemyCount;
    }

    public void StartSpawn()
    {
        if (this.m_hasFloor)
            PlaceFloors();
        if (this.m_hasCeiling)
            PlaceCeilings();
        PlaceTopDoor();
        PlaceBottomDoor();
        PlaceLeftDoor();
        PlaceRightDoor();
        // ! Must spawn walls after spawning doors to avoid overlapping
        PlaceWalls();
        CreateNavMeshSurface();
        SpawnEnemies();
        ParentElementsToAutoLevel();
    }

    private void CreateNavMeshSurface()
    {
        if (m_BigEnemyCount <= 0 && m_SmallEnemyCount <= 0) return;

        NavMeshSurface navMeshSurface = transform.gameObject.AddComponent<NavMeshSurface>();
        navMeshSurface.agentTypeID = 0;
        navMeshSurface.layerMask = LayerMask.GetMask("Default"); // Set the layer mask for the NavMeshSurface
        // Bake the NavMesh
        navMeshSurface.BuildNavMesh();
    }

    // Spawn the enemy
    private void SpawnEnemies()
    {
        Vector3 floorDimensions = GetPrefabDimensions(m_basicFloorPrefab);

        Vector3 center = transform.position + new Vector3(m_size.x / 2f * floorDimensions.x, 0.5f, m_size.z / 2f * floorDimensions.z);

        List<GameObject> bigEnemies = new List<GameObject>();

        List<GameObject> smallEnemies = new List<GameObject>();

        // Big Enemy
        if (m_BigEnemyCount == 1)
        {
            GameObject bigEnemy = Instantiate(m_bigEnemyPrefab, center, Quaternion.identity);
            bigEnemies.Add(bigEnemy);
        }
        else if (m_BigEnemyCount > 1)
        {
            List<Vector3> bigPoints = CirclePointsCalculator.CalculatePointsOnCircle(center, 2.5f, m_BigEnemyCount);

            foreach (var point in bigPoints)
            {
                var bigEnemy = Instantiate(m_bigEnemyPrefab, point, Quaternion.identity);
                bigEnemies.Add(bigEnemy);
            }
        }

        // Small Enemy
        if (m_SmallEnemyCount == 1 && m_BigEnemyCount == 0)
        {
            GameObject smallEnemy = Instantiate(m_bigEnemyPrefab, center, Quaternion.identity);
            smallEnemies.Add(smallEnemy);
        }
        else if (m_SmallEnemyCount >= 1)
        {
            List<Vector3> smallPoints = CirclePointsCalculator.CalculatePointsOnCircle(center, 5.5f, m_SmallEnemyCount);

            foreach (var point in smallPoints)
            {
                var smallEnemy = Instantiate(m_smallEnemyPrefab, point, Quaternion.identity);
                smallEnemies.Add(smallEnemy);
            }
        }

        foreach (var bigEnemy in bigEnemies)
        {
            m_Enemies.Add(bigEnemy);
        }

        foreach (var smallEnemy in smallEnemies)
        {
            m_Enemies.Add(smallEnemy);
        }
    }

    // Spawn the floor tiles
    private void PlaceFloors()
    {
        Vector3 floorDimensions = GetPrefabDimensions(m_basicFloorPrefab);

        for (int w = 0; w < m_size.x; w++)
        {
            for (int h = 0; h < m_size.z; h++)
            {
                var floorPosition =
                    transform.position
                    + new Vector3(w * floorDimensions.x, 0, h * floorDimensions.z);
                var floor = Instantiate(m_basicFloorPrefab, floorPosition, Quaternion.identity);
                m_floors.Add(floor);
            }
        }
    }

    // Spawn the walls
    private void PlaceWalls()
    {
        if (this.m_hasTopWall)
            PlaceTopWalls();
        if (this.m_hasBottomWall)
            PlaceBottomWalls();
        if (this.m_hasLeftWall)
            PlaceLeftWalls();
        if (this.m_hasRightWall)
            PlaceRightWalls();
    }

    private bool CanPlaceWalls(WallDoorDirection direction, DoorType type, int yIdx, int xzIdx)
    {
        bool horizontal =
            direction == WallDoorDirection.TOP || direction == WallDoorDirection.BOTTOM;

        if (type == DoorType.NONE)
            return true;

        int doorWidth = type == DoorType.SMALL ? smallDoorWidth : bigDoorWidth;
        int doorHeight = type == DoorType.SMALL ? smallDoorHeight : bigDoorHeight;

        if (yIdx >= doorHeight)
            return true;

        int maxWidth = horizontal ? m_size.z : m_size.x;
        float res = ((maxWidth - doorWidth) / 2f);
        int roundedRes = (type == DoorType.BIG) ? Mathf.CeilToInt(res) : Mathf.FloorToInt(res);

        return xzIdx < roundedRes || (maxWidth - xzIdx - 1) < roundedRes;
    }

    private void PlaceBottomWalls()
    {
        Vector3 wallDimensions = GetPrefabDimensions(m_wall4mPrefab);

        for (int j = 0; j < m_size.y; j++)
        {
            for (int i = 0; i < m_size.z; i++)
            {
                if (!CanPlaceWalls(WallDoorDirection.BOTTOM, m_bottomDoorType, j, i))
                    continue;

                Vector3 wallPosition =
                    transform.position + new Vector3(0, j * wallDimensions.y, i * wallDimensions.z);
                GameObject wall = Instantiate(m_wall4mPrefab, wallPosition, Quaternion.identity);
                m_walls.Add(wall);
            }
        }
    }

    private void PlaceTopWalls()
    {
        Vector3 wallDimensions = GetPrefabDimensions(m_wall4mPrefab);

        for (int j = 0; j < m_size.y; j++)
        {
            for (int i = 0; i < m_size.z; i++)
            {
                if (!CanPlaceWalls(WallDoorDirection.TOP, m_topDoorType, j, i))
                    continue;

                Vector3 wallPosition =
                    transform.position
                    + new Vector3(
                        m_size.x * wallDimensions.z,
                        j * wallDimensions.y,
                        i * wallDimensions.z
                    );
                GameObject wall = Instantiate(m_wall4mPrefab, wallPosition, Quaternion.identity);
                m_walls.Add(wall);
            }
        }
    }

    private void PlaceRightWalls()
    {
        Vector3 wallDimensions = GetPrefabDimensions(m_wall4mPrefab);

        for (int j = 0; j < m_size.y; j++)
        {
            for (int i = 0; i < m_size.x; i++)
            {
                if (!CanPlaceWalls(WallDoorDirection.RIGHT, m_rightDoorType, j, i))
                    continue;

                Vector3 wallPosition =
                    transform.position + new Vector3(i * wallDimensions.z, j * wallDimensions.y, 0);
                GameObject wall = Instantiate(
                    m_wall4mPrefab,
                    wallPosition,
                    Quaternion.Euler(0, 90, 0)
                );
                m_walls.Add(wall);
            }
        }
    }

    private void PlaceLeftWalls()
    {
        Vector3 wallDimensions = GetPrefabDimensions(m_wall4mPrefab);

        for (int j = 0; j < m_size.y; j++)
        {
            for (int i = 0; i < m_size.x; i++)
            {
                if (!CanPlaceWalls(WallDoorDirection.LEFT, m_leftDoorType, j, i))
                    continue;

                Vector3 wallPosition =
                    transform.position
                    + new Vector3(
                        i * wallDimensions.z,
                        j * wallDimensions.y,
                        m_size.z * wallDimensions.z
                    );
                GameObject wall = Instantiate(
                    m_wall4mPrefab,
                    wallPosition,
                    Quaternion.Euler(0, 90, 0)
                );
                m_walls.Add(wall);
            }
        }
    }

    private void PlaceCeilings()
    {
        Vector3 ceilingDimensions = GetPrefabDimensions(m_basicFloorPrefab);
        Vector3 wallDimensions = GetPrefabDimensions(m_wall4mPrefab);

        for (int i = 0; i < m_size.x; i++)
        {
            for (int j = 0; j < m_size.z; j++)
            {
                Vector3 ceilingPosition =
                    transform.position
                    + new Vector3(
                        i * ceilingDimensions.x,
                        m_size.y * wallDimensions.y,
                        j * ceilingDimensions.z
                    );
                GameObject ceiling = Instantiate(
                    m_basicFloorPrefab,
                    ceilingPosition,
                    Quaternion.identity
                );
                m_ceilings.Add(ceiling);
            }
        }
    }

    private void PlaceTopDoor()
    {
        switch (m_topDoorType)
        {
            case DoorType.NONE:
                return;
            case DoorType.SMALL:
                InstantiateSmallDoor(WallDoorDirection.TOP);
                break;
            case DoorType.BIG:
                InstantiateBigDoor(WallDoorDirection.TOP);
                break;
        }
    }

    private void PlaceBottomDoor()
    {
        switch (m_bottomDoorType)
        {
            case DoorType.NONE:
                return;
            case DoorType.SMALL:
                InstantiateSmallDoor(WallDoorDirection.BOTTOM);
                break;
            case DoorType.BIG:
                InstantiateBigDoor(WallDoorDirection.BOTTOM);
                break;
        }
    }

    private void PlaceLeftDoor()
    {
        switch (m_leftDoorType)
        {
            case DoorType.NONE:
                return;
            case DoorType.SMALL:
                InstantiateSmallDoor(WallDoorDirection.LEFT);
                break;
            case DoorType.BIG:
                InstantiateBigDoor(WallDoorDirection.LEFT);
                break;
        }
    }

    private void PlaceRightDoor()
    {
        switch (m_rightDoorType)
        {
            case DoorType.NONE:
                return;
            case DoorType.SMALL:
                InstantiateSmallDoor(WallDoorDirection.RIGHT);
                break;
            case DoorType.BIG:
                InstantiateBigDoor(WallDoorDirection.RIGHT);
                break;
        }
    }

    private void InstantiateSmallDoor(WallDoorDirection direction)
    {
        if (m_size.y < smallDoorHeight)
        {
            Debug.Log($"Cannot place small door in {direction}");
            return;
        }

        Quaternion rotation = GetQuaternionSmallDoor(direction);

        Vector3 floorDimensions = GetPrefabDimensions(m_basicFloorPrefab);
        float totalZDistance = floorDimensions.z * m_size.z;
        float totalXDistance = floorDimensions.x * m_size.x;
        Vector3 prefabDimensions = GetPrefabDimensions(m_wallDoor);
        float doorWidth = prefabDimensions.x;

        Vector3 positionVector = new Vector3(0, 0, 0);

        switch (direction)
        {
            case WallDoorDirection.TOP:
                {
                    positionVector = new Vector3(totalXDistance, 0, (totalZDistance + doorWidth) / 2);
                    break;
                }
            case WallDoorDirection.BOTTOM:
                {
                    positionVector = new Vector3(0, 0, (totalZDistance + doorWidth) / 2);
                    break;
                }
            case WallDoorDirection.LEFT:
                {
                    positionVector = new Vector3((totalXDistance - doorWidth) / 2, 0, totalZDistance);
                    break;
                }
            case WallDoorDirection.RIGHT:
                {
                    positionVector = new Vector3((totalXDistance - doorWidth) / 2, 0, 0);
                    break;
                }
        }

        Vector3 position = transform.position + positionVector;

        GameObject door = Instantiate(m_wallDoor, position, rotation);
        m_doors.Add(door);
    }

    private void InstantiateBigDoor(WallDoorDirection direction)
    {
        if (m_size.y < bigDoorHeight)
        {
            Debug.Log($"Cannot place big door in {direction}");
            return;
        }

        Quaternion rotation = GetQuaternionBigDoor(direction);

        Vector3 floorDimensions = GetPrefabDimensions(m_basicFloorPrefab);
        float totalZDistance = floorDimensions.z * m_size.z;
        float totalXDistance = floorDimensions.x * m_size.x;
        Vector3 prefabDimensions = GetPrefabDimensions(m_dunBigDoor);
        float doorWidth = prefabDimensions.z;

        Vector3 positionVector = new Vector3(0, 0, 0);

        switch (direction)
        {
            case WallDoorDirection.TOP:
                {
                    positionVector = new Vector3(totalXDistance, 0, (totalZDistance - doorWidth) / 2);
                    break;
                }
            case WallDoorDirection.BOTTOM:
                {
                    positionVector = new Vector3(0, 0, (totalZDistance - doorWidth) / 2);
                    break;
                }
            case WallDoorDirection.LEFT:
                {
                    positionVector = new Vector3((totalXDistance - doorWidth) / 2, 0, totalZDistance);
                    break;
                }
            case WallDoorDirection.RIGHT:
                {
                    positionVector = new Vector3((totalXDistance - doorWidth) / 2, 0, 0);
                    break;
                }
        }

        Vector3 position = transform.position + positionVector;

        GameObject door = Instantiate(m_dunBigDoor, position, rotation);
        m_doors.Add(door);
    }

    private Vector3 GetTotalRoomDimensionLengths()
    {
        Vector3 floorDimensions = GetPrefabDimensions(m_basicFloorPrefab);
        return new Vector3(
            floorDimensions.x * m_size.x,
            floorDimensions.y * m_size.y,
            floorDimensions.z * m_size.z
        );
    }

    private Quaternion GetQuaternionSmallDoor(WallDoorDirection direction)
    {
        switch (direction)
        {
            case WallDoorDirection.TOP:
            case WallDoorDirection.BOTTOM:
                return Quaternion.Euler(0, 90, 0);
            default:
                return Quaternion.identity;
        }
    }

    private Quaternion GetQuaternionBigDoor(WallDoorDirection direction)
    {
        switch (direction)
        {
            case WallDoorDirection.TOP:
            case WallDoorDirection.BOTTOM:
                return Quaternion.identity;
            default:
                return Quaternion.Euler(0, 90, 0);
        }
    }

    // Parent floors and walls to the Auto_Level GameObject
    private void ParentElementsToAutoLevel()
    {
        foreach (GameObject floor in m_floors)
        {
            floor.transform.SetParent(transform);
        }

        foreach (GameObject wall in m_walls)
        {
            wall.transform.SetParent(transform);
        }

        foreach (GameObject ceiling in m_ceilings)
        {
            ceiling.transform.SetParent(transform);
        }

        foreach (GameObject door in m_doors)
        {
            door.transform.SetParent(transform);
        }

        foreach (GameObject enemy in m_Enemies)
        {
            enemy.transform.SetParent(transform);
        }
    }

    // Calculate prefab dimensions
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
}
