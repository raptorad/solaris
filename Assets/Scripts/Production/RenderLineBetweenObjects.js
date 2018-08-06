#pragma strict
var objects:GameObject[];
var lineRenderer:LineRenderer;
function Start () {
	lineRenderer.SetVertexCount(objects.length);
}

function Update () {
	var positions:Vector3[]=new Vector3[objects.length];
	for(var i=0; i<objects.length;++i)
	{
		lineRenderer.SetPosition(i,objects[i].transform.position);
	}
}