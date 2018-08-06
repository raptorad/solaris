#pragma strict

var obstacle:GameObject;
var terrainTexture:Texture2D;
function Start ()
{
	//GenerateRandom();
	SetWalkability();
}

function GenerateRandom()
{
	for(var iX:int=0;iX<Astar.instance.sizeX;++iX)
	{
		for(var jY:int=0;jY<Astar.instance.sizeY;++jY)
		{
			if(Random.value<0.2)
			{
				Astar.instance.map[iX,jY].Occupy();
				Instantiate(obstacle,Vector3(iX,0,jY),obstacle.transform.rotation);
			}
		}
	}
}
function SetWalkability()
{
	for(var iX:int=0;iX<terrainTexture.width;++iX)
	{
		for(var jY:int=0;jY<terrainTexture.height;++jY)
		{
			if(terrainTexture.GetPixel(iX,jY).r>0.5)
			{
				Astar.instance.map[iX,jY].SetSpeedModifier(0);
			}
			if(terrainTexture.GetPixel(iX,jY).g>0.5)
			{
				Astar.instance.map[iX,jY].SetSpeedModifier(0.5);
			}
			if(terrainTexture.GetPixel(iX,jY).b>0.5)
			{
				Astar.instance.map[iX,jY].SetWalkable(false);
			}
			if(terrainTexture.GetPixel(iX,jY).a>0.5)
			{
				Astar.instance.map[iX,jY].SetSpeedModifier(1);
			}
			
		}
	}
}
function Update () {

}