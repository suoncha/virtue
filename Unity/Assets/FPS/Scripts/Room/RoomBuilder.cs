using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class RoomBuilder
{
    private GameObject m_basicFloorPrefab;
    private GameObject m_wall4mPrefab;
    private GameObject m_dunBigDoor;
    private GameObject m_wallDoor;
    private Vector3Int m_size;

    private GameObject m_smallEnemyPrefab;
    private GameObject m_bigEnemyPrefab;

    private bool m_hasFloor = true;
    private bool m_hasCeiling = true;
    private bool m_hasLeftWall = true;
    private bool m_hasRightWall = true;
    private bool m_hasTopWall = true;
    private bool m_hasBottomWall = true;
    private DoorType m_topDoorType = DoorType.NONE;
    private DoorType m_bottomDoorType = DoorType.NONE;
    private DoorType m_leftDoorType = DoorType.NONE;
    private DoorType m_rightDoorType = DoorType.NONE;

    private int m_BigEnemyCount = 0;
    private int m_SmallEnemyCount = 0;

    public RoomBuilder SetBasicFloorPrefab(GameObject basicFloorPrefab)
    {
        m_basicFloorPrefab = basicFloorPrefab;
        return this;
    }

    public RoomBuilder SetWall4mPrefab(GameObject wall4mPrefab)
    {
        m_wall4mPrefab = wall4mPrefab;
        return this;
    }

    public RoomBuilder SetDunBigDoor(GameObject dunBigDoor)
    {
        m_dunBigDoor = dunBigDoor;
        return this;
    }

    public RoomBuilder SetWallDoor(GameObject wallDoor)
    {
        m_wallDoor = wallDoor;
        return this;
    }

    public RoomBuilder SetSmallEnemy(GameObject smallEnemy)
    {
        m_smallEnemyPrefab = smallEnemy;
        return this;
    }

    public RoomBuilder SetBigEnemy(GameObject bigEnemy)
    {
        m_bigEnemyPrefab = bigEnemy;
        return this;
    }

    public RoomBuilder SetSize(Vector3Int size)
    {
        m_size = size;
        return this;
    }

    public RoomBuilder SetHasFloor(bool hasFloor)
    {
        m_hasFloor = hasFloor;
        return this;
    }

    public RoomBuilder SetHasCeiling(bool hasCeiling)
    {
        m_hasCeiling = hasCeiling;
        return this;
    }

    public RoomBuilder SetHasLeftWall(bool hasLeftWall)
    {
        m_hasLeftWall = hasLeftWall;
        return this;
    }

    public RoomBuilder SetHasRightWall(bool hasRightWall)
    {
        m_hasRightWall = hasRightWall;
        return this;
    }

    public RoomBuilder SetHasTopWall(bool hasTopWall)
    {
        m_hasTopWall = hasTopWall;
        return this;
    }

    public RoomBuilder SetHasBottomWall(bool hasBottomWall)
    {
        m_hasBottomWall = hasBottomWall;
        return this;
    }

    public RoomBuilder SetTopDoorType(DoorType topDoorType)
    {
        if (IsRoomTooSmall())
            return this;
        m_topDoorType = topDoorType;
        return this;
    }

    public RoomBuilder SetBottomDoorType(DoorType bottomDoorType)
    {
        if (IsRoomTooSmall())
            return this;

        m_bottomDoorType = bottomDoorType;
        return this;
    }

    public RoomBuilder SetLeftDoorType(DoorType leftDoorType)
    {
        if (IsRoomTooSmall())
            return this;

        m_leftDoorType = leftDoorType;
        return this;
    }

    public RoomBuilder SetRightDoorType(DoorType rightDoorType)
    {
        if (IsRoomTooSmall())
            return this;

        m_rightDoorType = rightDoorType;
        return this;
    }

    public RoomBuilder SetEnemyCount(int bigEnemyCount = 0, int smallEnemyCount = 0)
    {
        if (IsRoomTooSmall(3))
            return this;

        m_BigEnemyCount = bigEnemyCount; 
        m_SmallEnemyCount = smallEnemyCount;
        
        return this;
    }

    private bool IsRoomTooSmall(int minSize = 2)
    {
        return (m_size.x < minSize && m_size.y < minSize && m_size.z < minSize);
    }

    public RoomSpawner Build(GameObject target)
    {
        RoomSpawner roomSpawner = target.AddComponent<RoomSpawner>();
        roomSpawner.SetProperties(
            m_basicFloorPrefab,
            m_wall4mPrefab,
            m_dunBigDoor,
            m_wallDoor,
            m_smallEnemyPrefab,
            m_bigEnemyPrefab,
            m_size,
            m_hasFloor,
            m_hasCeiling,
            m_hasLeftWall,
            m_hasRightWall,
            m_hasTopWall,
            m_hasBottomWall,
            m_topDoorType,
            m_bottomDoorType,
            m_leftDoorType,
            m_rightDoorType,
            m_BigEnemyCount,
            m_SmallEnemyCount
        );
        return roomSpawner;
    }
}
