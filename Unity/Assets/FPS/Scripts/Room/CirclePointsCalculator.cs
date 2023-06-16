using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CirclePointsCalculator
{
    public static List<Vector3> CalculatePointsOnCircle(Vector3 center, float radius, int pointCount)
    {
        List<Vector3> points = new List<Vector3>();

        if (pointCount < 1) return points;

        float angleStep = 360f / pointCount;
        float currentAngle = 0f;

        for (int i = 0; i < pointCount; i++)
        {
            float x = center.x + radius * Mathf.Cos(currentAngle * Mathf.Deg2Rad);
            float z = center.z + radius * Mathf.Sin(currentAngle * Mathf.Deg2Rad);
            Vector3 point = new Vector3(x, center.y, z);
            points.Add(point);
            currentAngle += angleStep;
        }

        return points;
    }
}
