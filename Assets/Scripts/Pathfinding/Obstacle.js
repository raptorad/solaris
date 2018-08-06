#pragma strict
var rectangles:RectangleObstacle[];
/*
var cornerX:int=0;
var cornerY:int=0;
var x:int=1;
var y:int=1;
*/
function Start () {
	transform.position.x=Mathf.Round(transform.position.x);
	transform.position.z=Mathf.Round(transform.position.z);
	TakePlace();
}
function TakePlace()
{
	for(var r in rectangles)
	{
		TakePlace(r);
	}
}
function TakePlace(r:RectangleObstacle)
{
	var maxX:int=r.cornerX+r.x+transform.position.x;
	var maxY:int=r.cornerY+r.y+transform.position.z;
	
	for(var iX:int=r.cornerX+transform.position.x; iX<maxX; ++iX)
	{
		for(var jY:int=r.cornerY+transform.position.z; jY<maxY; ++jY)
		{
			Astar.instance.map[iX,jY].SetWalkable(false);
		}	
	}
}

function Update () {

}