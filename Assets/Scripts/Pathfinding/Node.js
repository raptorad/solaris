class Reservation
{
	var groupID:int;
	var reservations:int;
	function Reservation(groupID:int)
	{
		this.groupID=groupID;
		reservations=0;
	}
	function Reservation(groupID:int, reservations:int)
	{
		this.groupID=groupID;
		this.reservations=reservations;
	}
}
class Node
{
	var x:int;
	var y:int;
	var hCost:int;
	var gCost:int;
	@System.NonSerialized
	var parent:Node;
	var occupation:int=0;
	private var walkable:System.Boolean=true;

	var reservationStartValue:int=0;
	var obstacles:List.<GameObject>;
	var obstacle:int=0;
	var unitOn:GameObject;
	var distanceFromNeck:int=999;
	var reservations:List.<Reservation>;
	@System.NonSerialized
	var neighbours:List.<Node>;
	var speedModifier:float=1;
	var speedCost:int=0;
	function SetSpeedModifier(modifier:float)
	{
		speedModifier=modifier;
		speedCost=10;
		if(modifier>0.6)
		{
			speedCost=0;
		}
		if(modifier<0.4)
		{
			speedCost=50;
		}


	}
	function GetSpeedModifier():float
	{
		return speedModifier;
	}
	function SetNeighbours()
	{
		var neigh=new List.<Node>();
		for(var iY:int=-1;iY<=1;++iY)
		{
			var ysum=iY+y;
			if(ysum<0 || ysum>=Astar.instance.sizeY) continue;

			for(var jX:int=-1;jX<=1;++jX)
			{
				var xsum=jX+x;
				if(xsum<0 || xsum>=Astar.instance.sizeX) continue;
				if(xsum==x  && ysum==y) continue;
				if(Astar.instance.map[xsum,ysum].obstacle<1)
				{
					neigh.Add(Astar.instance.map[xsum,ysum]);
				}
			}
		}
		neighbours=neigh;
	}
	function Node()
	{
		reservations=new List.<Reservation>();
		obstacles=new List.<GameObject>();
	}
	function Node(x:int,y:int)
	{
		reservations=new List.<Reservation>();
		obstacles=new List.<GameObject>();
		this.x = x;
		this.y = y;
	}
	function MakeReservation(groupID:int)
	{
		for(var r in reservations)
		{
			if(r.groupID==groupID)
			{
				r.reservations++;
				return;
			}
		}
		var res:Reservation=new Reservation(groupID,reservationStartValue);
		res.reservations++;
		reservations.Add(res);

	}
	function RemoveReservation(groupID:int)
	{
		for(var r in reservations)
		{
			if(r.groupID==groupID)
			{
				r.reservations--;
				if(r.reservations<=reservationStartValue)
				{
					reservations.Remove(r);
				}
				return;
			}
		}

	}
	function RemoveObstacleObjects()
	{
		for(var g in obstacles)
		{
			UnityEngine.Object.Destroy(g);
		}
	}
	function PlaceObstacle(obj:GameObject)
	{
		obstacle++;
		obstacles.Add(obj);
		if(obstacle>0) walkable=false;
	}
	function RemoveObstacle(obj:GameObject)
	{
		obstacle--;
		obstacles.Remove(obj);
		if(occupation<1 && obstacle<1) walkable=true;
	}
	function Occupy()
	{
		occupation+=10;
		//if(occupation>0) walkable=false;
	}
	function Free()
	{
		occupation-=10;
		//if(occupation<1 && obstacle<1) walkable=true;
	}

	function fCost():int
	{
		return gCost+hCost+occupation+speedModifier;		
	}
	function SetWalkable(b:System.Boolean)
	{
		walkable=b;
	}
	function Walkable():System.Boolean
	{
		return walkable;
	}
	function Position():Vector3
	{
	    return Vector3(x,0,y);
	}
	function SetDistanceFromNeck()
	{
		if(neighbours.Count<3)
		{
			distanceFromNeck=0;
			return;
		}
		for(var n1:Node in neighbours)
		{
			if(n1.distanceFromNeck==0)
			{
				distanceFromNeck=1;
				return;
			}
		}
		distanceFromNeck=9;

	}
	function IsClear():boolean
	{
		if(occupation==0 && unitOn==null && obstacle==0)
		{
			return true;
		}
		return false;
	}
}
