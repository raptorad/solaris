import System.Collections.Generic;

static var instance:Astar;
var map:Node[,];
var sizeX:int;
var sizeY:int;

function Awake()
{
		instance=this;
		map=new Node[sizeX,sizeY];
		for(var iX:int=0;iX<sizeX;++iX)
		{
			for (var jY:int=0;jY<sizeY;++jY)
		{
				map[iX,jY]=new Node(iX,jY);
				//map[iX,jY].Init(iX,jY);
			}
		}
		for( var node in map)
		{
			node.SetNeighbours();
		}
}
function GetNode(position:Vector3):Node
{
	return map[Mathf.Round(position.x),Mathf.Round(position.z)];
}
/*
function FindFree1(x:int,y:int):Vector3
{
	var max=1;
					if(map[x,y].Walkable())
				{
					
					return Vector3(x,0,y);
				}
	while(true)
	{
		var sign=1;
		for(var iX=0;Mathf.Abs(iX)<max; iX+=sign)
		{
			if(x<sizeX && x>0)
			{
				x+=sign;
				if(map[x,y].Walkable())
				{
					
					return Vector3(x,0,y);
				}
			}
		}
		for(var jY=0;Mathf.Abs(jY)<max; jY+=sign)
		{
			if(y<sizeY && y>0)
			{
				y+=sign;
				if(map[x,y].Walkable())
				{
					return Vector3(x,0,y);
				}
			}
		}
		sign*=-1;
		max++;
	}
}*/
function Way(dest:Vector3,xStart:int,yStart:int):List.<Node>
{
	return Way(xStart,yStart,Mathf.RoundToInt(dest.x),Mathf.RoundToInt(dest.z));
}
function Way(sX:int,sY:int,eX:int,eY:int):List.<Node>
{
	if(sX<0 || sY<0 || eX<0 || eY<0) return new List.<Node>();
	if(sX>=sizeX || sY>=sizeY || eX>=sizeX || eY>=sizeY) return new List.<Node>();
	var startNode:Node=map[sX,sY];
	var targetNode:Node=map[eX,eY];
	
	var openSet:List.<Node> =new List.<Node>();
	var closedSet:HashSet.<Node> = new HashSet.<Node>();

	startNode.gCost = 0;
	startNode.hCost = GetDistance(startNode, targetNode);
	startNode.parent = startNode;

	openSet.Add(startNode);
	while(openSet.Count>0)
	{
		var currentNode=openSet[0];
		for (var iO:int = 1; iO < openSet.Count; iO ++)
		{
			if (
			openSet[iO].fCost() < currentNode.fCost() || 
			openSet[iO].fCost() == currentNode.fCost() && 
			openSet[iO].hCost < currentNode.hCost
			) 
			{
					currentNode = openSet[iO];
			}
		}
		
		openSet.Remove(currentNode);
        closedSet.Add(currentNode);
		
		if ((currentNode.x == targetNode.x) &&
		(currentNode.y == targetNode.y))
		{
			return RetracePath(startNode,targetNode);
		}
 		
 		//checking neightbours
		for (var neighbour in currentNode.neighbours)
		{
			if (closedSet.Contains(neighbour))
			{
					continue;
			}

			var newMovementCostToNeighbour:int
			 = currentNode.gCost + GetDistance(currentNode, neighbour)+neighbour.speedCost+neighbour.occupation;

			if (newMovementCostToNeighbour < neighbour.gCost 
				|| !openSet.Contains(neighbour))
			{
				if(!neighbour.Walkable())
				{
					continue;
				}
				neighbour.gCost = newMovementCostToNeighbour;
				neighbour.hCost = GetDistance(neighbour, targetNode);
				neighbour.parent = currentNode;

				if (!openSet.Contains(neighbour))
						openSet.Add(neighbour);
			}
		}
		
	}
	//destination node is not walkable - finding nearest node 
	var minH:int=99999999;
	for(var n:Node in closedSet)
	{
		if(n.hCost<minH)
		{
			minH=n.hCost;
		}
	}
	var newDest:Node;
	var minF:int=99999999;
	for(n in closedSet)
	{
		if(n.hCost==minH)
		{
			var fcost=n.fCost();
			if(fcost<minF)
			{
				newDest=n;
				min=fcost;
			}
		}
	}
	return RetracePath(startNode,newDest);
	
}

private function RetracePath(startNode:Node,endNode:Node):List.<Node>
{
	var path:List.<Node> = new List.<Node>();
	var currentNode:Node = endNode;

	while (currentNode != startNode) {
			path.Add(currentNode);
            if(currentNode.parent==null) break;
			currentNode = currentNode.parent;
	}
	path.Reverse();

	return path;

}
function GetDistance(nodeA:Node,nodeB:Node):int
{
	var dstX:int = Mathf.Abs(nodeA.x - nodeB.x);
	var dstY:int = Mathf.Abs(nodeA.y - nodeB.y);

	if (dstX > dstY)
			return 14*dstY + 10* (dstX-dstY);
	return 14*dstX + 10 * (dstY-dstX);
}