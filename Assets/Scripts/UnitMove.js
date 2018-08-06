import System.Collections.Generic;
import System.Linq;
var path:List.<Node>;
var dynamicSpeed:float=1;
var staticSpeed:float=1;
var turnSpeed:float=200;

var destination:Vector3;
var isMoving:boolean=false;
var currentNode:Node;
var commandID:int;

function Update()
{
	Rotate();
	Move();
}
function Start()
{
	Astar.instance.GetNode(transform.position).Occupy();
	transform.position.y = Terrain.activeTerrain.SampleHeight(transform.position);
	
}
private function ChangeCurrentNode()
{
	var x:int=Mathf.RoundToInt(transform.position.x);
	var y:int=Mathf.RoundToInt(transform.position.z);
	if(currentNode.x!=x || currentNode.y!=y)
	{
		currentNode.Free();
		currentNode=Astar.instance.map[x,y];
		currentNode.Occupy();
	}

}
function CommandMove(destination:Vector3,commandID)
{
	FreePathReservation();
	this.commandID=commandID;
	var x:int=Mathf.RoundToInt(transform.position.x);
	var y:int=Mathf.RoundToInt(transform.position.z);

	isMoving=true;
	if(path.Count>0)
	{
		if(path[0].unitOn==gameObject) path[0].unitOn=null;
	}
	path =Astar.instance.Way(destination,x,y);
	ReservePath();
	if(path.Count>0)
	{
		this.destination=path[path.Count-1].Position();
	}
}
function CommandMove(destination:Vector3)
{
	CommandMove(destination,UnitManager.instance.GetCommandID());
}
private function ReservePath()
{
	for(var n:Node in path)
	{
		n.MakeReservation(commandID);
	}
}
private function FreePathReservation()
{
	for(var n:Node in path)
	{
		n.RemoveReservation(commandID);
	}
}
private function Rotate()
{

	if(path.Count>0)
	{
		var dir = path[0].Position()+Vector3(0,transform.position.y,0) - transform.position;
		
				
		var fDot:float=Vector3.Dot(dir,transform.right);
		
		var dir2=path[0].Position()+
		Vector3(0,Terrain.activeTerrain.SampleHeight(path[0].Position()),0)
		 - transform.position;
		var fDotDown:float=Vector3.Dot(dir2,transform.up);
		
		transform.Rotate(-fDotDown,fDot*Time.deltaTime*turnSpeed,0);
	}
}


function LateUpdate (){
		transform.position.y = Terrain.activeTerrain.SampleHeight(transform.position);
		 //make platform adjust terrain rotation

	}
private function Move()
{
	if(path.Count>0)
	{
		if(!path[path.Count-1].Walkable())
		{
			CommandMove(destination,commandID);
			return;
		}
		if(path[0].Walkable())
		{
			if(path[0].reservations[0].groupID!=commandID)
			{
				if(path.Count==1)
				{
					CommandMove(destination,commandID);
					return;
				}
				if(path[1].reservations[0].groupID!=commandID  || !path[1].IsClear() || !path[0].IsClear())
				{
					CommandMove(destination,commandID);
					return;
				}
			}
			if(path[0].unitOn==null && path[0].occupation<=0)
			{
				path[0].unitOn=gameObject;
			}
			if( path[0].unitOn==gameObject)
			{
				var sqrMag=(path[0].Position()+Vector3(0,transform.position.y,0)-transform.position).sqrMagnitude;
				var speed=staticSpeed+path[0].GetSpeedModifier()*dynamicSpeed;
				if(sqrMag>0.36)
				{
					speed=speed+speed*Vector3.Dot(transform.forward,path[0].Position()-transform.position+Vector3(0,transform.position.y,0));
					speed/=2;	
				}
				transform.position+=transform.forward*speed*Time.deltaTime;
				if(sqrMag<0.01)
				{
					if(path.Count==1)
					{
						isMoving=false;
					}
					path[0].unitOn=null;
					path[0].RemoveReservation(commandID);
					path.RemoveAt(0);
					CommandMove(destination,commandID);
				}
			}
			else
			{
				CommandMove(destination,commandID);
			}
		}
		else
		{
			
			CommandMove(destination,commandID);
		}

		ChangeCurrentNode();
	}

}
function OnDestroy()
{
	currentNode.Free();
	FreePathReservation();
}