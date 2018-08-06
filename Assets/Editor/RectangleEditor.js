#pragma strict
@CustomEditor(RectangleObstacle)
@CanEditMultipleObjects
class RectangleEditor extends Editor {
	var cornerX: SerializedProperty;
	var cornerY: SerializedProperty;
	var x: SerializedProperty;
	var y: SerializedProperty;
	
	function OnEnable() {
		// Setup the SerializedProperties.
		cornerX = serializedObject.FindProperty("cornerX");
		cornerY = serializedObject.FindProperty("cornerY");
		x = serializedObject.FindProperty("x");
		y = serializedObject.FindProperty("y");
	}
	override function OnInspectorGUI () {
		GUILayout.Label("Corner X: "+cornerX.intValue.ToString());
		serializedObject.Update();
		if(GUILayout.Button ("++ CornerX")) {
			++cornerX.intValue;
		}
		if(GUILayout.Button ("-- CornerX")) {
			--cornerX.intValue;
		}
		GUILayout.Label("Corner Y: "+cornerY.intValue.ToString());
		if(GUILayout.Button ("++ CornerY")) {
			++cornerY.intValue;
		}
		if(GUILayout.Button ("-- CornerY")) {
			--cornerY.intValue;
		}
		GUILayout.Label("Size X: "+x.intValue.ToString());
		if(GUILayout.Button ("++ x")) {
			++x.intValue;
		}
		if(GUILayout.Button ("-- x")) {
			--x.intValue;
		}
		GUILayout.Label("Size Y: "+y.intValue.ToString());
		if(GUILayout.Button ("++ y")) {
			++y.intValue;
		}
		if(GUILayout.Button ("-- y")) {
			--y.intValue;
		}
		serializedObject.ApplyModifiedProperties();
	}
}