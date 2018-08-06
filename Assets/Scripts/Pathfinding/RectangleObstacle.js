#pragma strict
var cornerX:int=0;
var cornerY:int=0;
var x:int=1;
var y:int=1;
function Start () {
	TakePlace();
}

function Update () {

}
function OnDrawGizmosSelected() {
	transform.position.x=Mathf.Round(transform.position.x);
	transform.position.z=Mathf.Round(transform.position.z);
    Gizmos.color = new Color(1, 0.5f, 0.5f, 0.7F);
    Gizmos.DrawWireCube(transform.position+Vector3(cornerX-0.5+x*1.0/2,0,cornerY-0.5+y*1.0/2), new Vector3(x, 3, y));
}
function TakePlace()
{
	var maxX:int=cornerX+x+transform.position.x;
	var maxY:int=cornerY+y+transform.position.z;
	
	for(var iX:int=cornerX+transform.position.x; iX<maxX; ++iX)
	{
		for(var jY:int=cornerY+transform.position.z; jY<maxY; ++jY)
		{
			Astar.instance.map[iX,jY].PlaceObstacle(gameObject);
		}	
	}
	UpdateNeighbours();
}
function IsGoodPlace(pos:Vector3)
{
	var maxX:int=cornerX+x+pos.x;
	var maxY:int=cornerY+y+pos.z;
	
	for(var iX:int=cornerX+pos.x; iX<maxX; ++iX)
	{
		for(var jY:int=cornerY+pos.z; jY<maxY; ++jY)
		{
			if(!Astar.instance.map[iX,jY].IsClear())
			{
				return false;
			}
		}	
	}
	return true;
}
function UpdateNeighbours()
{
	var maxX:int=cornerX+x+transform.position.x+1;
	if(maxX>Astar.instance.sizeX) maxX=Astar.instance.sizeX;
	var maxY:int=cornerY+y+transform.position.z+1;
	if(maxY>Astar.instance.sizeY) maxY=Astar.instance.sizeY;

	for(var iX:int=cornerX+transform.position.x-1; iX<maxX; ++iX)
	{
		if(iX<0) continue;
		for(var jY:int=cornerY+transform.position.z-1; jY<maxY; ++jY)
		{
			if(jY<0) continue;
			Astar.instance.map[iX,jY].SetNeighbours();
		}	
	}
}
function FreePlace()
{
	var maxX:int=cornerX+x+transform.position.x;
	var maxY:int=cornerY+y+transform.position.z;
	
	for(var iX:int=cornerX+transform.position.x; iX<maxX; ++iX)
	{
		for(var jY:int=cornerY+transform.position.z; jY<maxY; ++jY)
		{
			Astar.instance.map[iX,jY].RemoveObstacle(gameObject);
		}	
	}
	UpdateNeighbours();
}
function OnDestroy()
{
	FreePlace();
}