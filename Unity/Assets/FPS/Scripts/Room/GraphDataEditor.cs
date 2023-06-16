// using UnityEditor;
// using UnityEngine;
// using System.Collections.Generic;

// [CustomEditor(typeof(GraphData))]
// public class GraphDataEditor : Editor
// {
//     public override void OnInspectorGUI()
//     {
//         GraphData graphData = (GraphData)target;

//         // Draw default Inspector for GraphData properties
//         DrawDefaultInspector();

//         // Draw the graph
//         DrawGraph(graphData.SceneReloadCounts, 200, 100);
//     }

//     private void DrawGraph(Dictionary<int, int> data, float width, float height)
//     {
//         EditorGUILayout.Space();

//         GUILayout.Label("Graph:");

//         Rect graphRect = GUILayoutUtility.GetRect(width, height);

//         // Add padding to the graph
//         float padding = 10;
//         graphRect = new Rect(graphRect.x + padding, graphRect.y + padding, graphRect.width - 2 * padding, graphRect.height - 2 * padding);

//         // Draw graph background
//         EditorGUI.DrawRect(graphRect, new Color(0.9f, 0.9f, 0.9f));

//         // Draw graph lines
//         int maxValue = 0;
//         foreach (var entry in data)
//         {
//             maxValue = Mathf.Max(maxValue, entry.Value);
//         }

//         float pointWidth = graphRect.width / (data.Count - 1);
//         Vector3[] points = new Vector3[data.Count];
//         Handles.color = new Color(0.2f, 0.6f, 1f);
//         int index = 0;

//         foreach (var entry in data)
//         {
//             float pointHeight = (float)entry.Value / maxValue * graphRect.height;
//             points[index] = new Vector3(graphRect.x + index * pointWidth, graphRect.yMax - pointHeight, 0);

//             if (index > 0)
//             {
//                 Handles.DrawLine(points[index - 1], points[index]);
//             }

//             index++;
//         }

//         // Draw point circles
//         float circleRadius = 3;
//         for (int i = 0; i < points.Length; i++)
//         {
//             EditorGUI.DrawRect(new Rect(points[i].x - circleRadius, points[i].y - circleRadius, 2 * circleRadius, 2 * circleRadius), Handles.color);
//         }

//         // Draw axis lines
//         Handles.color = Color.black;
//         Handles.DrawLine(new Vector3(graphRect.x, graphRect.y, 0), new Vector3(graphRect.x, graphRect.yMax, 0));
//         Handles.DrawLine(new Vector3(graphRect.x, graphRect.yMax, 0), new Vector3(graphRect.xMax, graphRect.yMax, 0));

//         // Draw axis labels
//         GUIStyle labelStyle = new GUIStyle(GUI.skin.label) { alignment = TextAnchor.UpperRight };
//         EditorGUI.LabelField(new Rect(graphRect.x - padding, graphRect.y, padding, padding), maxValue.ToString(), labelStyle);
//         EditorGUI.LabelField(new Rect(graphRect.x - padding, graphRect.yMax - padding, padding, padding), "0", labelStyle);
//     }
// }