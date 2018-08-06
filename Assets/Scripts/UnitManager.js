#pragma strict
var units:List.<Unit>[];
var resourceMines:List.<ResourceMine>[];
var numberOfPlayers:int=2;
var groupsOfPlayers:int[];
var powerPlants:int[];
var money:float[];
private var commandID:int=0;
static var instance:UnitManager;
function GetCommandID():int
{
	return ++commandID;
}
function Awake()
{
	instance=this;
	if(money.length<numberOfPlayers)
	{
		money=new float[numberOfPlayers];
	}
	units=new List.<Unit>[numberOfPlayers];
	powerPlants=new int[numberOfPlayers];
	resourceMines=new List.<ResourceMine>[numberOfPlayers];
	for(var i:int=0;i<numberOfPlayers;++i)
	{
		units[i]=new List.<Unit>();
		resourceMines[i]= new List.<ResourceMine>();
	}
	FixGroupsOfPlayers();
}

function FixGroupsOfPlayers()
{
	if(groupsOfPlayers.Length<numberOfPlayers)
	{
		var fix:int[]=new int[numberOfPlayers];
		var sum:int=1;
		for(var i:int=0;i<numberOfPlayers;++i)
		{
			if(i<groupsOfPlayers.Length)
			{
				fix[i]=groupsOfPlayers[i];
				sum+=fix[i];
			}
			else
			{
				++sum;
				fix[i]=sum;
			}
		}
		groupsOfPlayers=fix;	
	}
}
function RegisterPowerPlant(powerPlant:PowerPlant)
{
	powerPlants[powerPlant.playerNum]++;
}
function RemovePowerPlant(powerPlant:PowerPlant)
{
	powerPlants[powerPlant.playerNum]--;
}
function RegisterResourceMine(mine:ResourceMine)
{
	resourceMines[mine.playerNum].Add(mine);
}
function RemoveResourceMine(mine:ResourceMine)
{
	resourceMines[mine.playerNum].Remove(mine);
}
function RegisterUnit(unit:Unit)
{
	units[unit.playerNum].Add(unit);
}
function RemoveUnit(unit:Unit)
{
	units[unit.playerNum].Remove(unit);
	OnRemoveUnit(unit);
}
function OnRemoveUnit(unit:Unit)
{
	if(units[1].Count==0)
	{
		Application.LoadLevel("level_win");
	}
}
function FindNearestEnemy(unit:Unit):Unit
{
	var group:int=groupsOfPlayers[unit.playerNum];
	var position=unit.transform.position;
	var minMagnitude=9999;
	var nearestUnit:Unit;
	for(var iP:int=0; iP<numberOfPlayers; iP++)
	{
		if(groupsOfPlayers[iP]==group) continue;
		for(var jU:int=0;jU<units[iP].Count;++jU)
		{
			var u:Unit=units[iP][jU];
			var magnitude:float=(u.transform.position-position).sqrMagnitude;
			if(magnitude<minMagnitude)
			{
				minMagnitude=magnitude;
				nearestUnit=u;
			}
		}
		
	}
	return nearestUnit;
}
function FindNearestAlly(unit:Unit):Unit
{
	var group:int=groupsOfPlayers[unit.playerNum];
	var position=unit.transform.position;
	var minMagnitude=9999;
	var nearestUnit:Unit;
	for(var iP:int=0; iP<numberOfPlayers; iP++)
	{
		if(groupsOfPlayers[iP]!=group) continue;
		for(var jU:int=0;jU<units[iP].Count;++jU)
		{
			var u:Unit=units[iP][jU];
			if(u==unit) continue;
			if(u.GetHp()>=100) continue;
			var magnitude:float=(u.transform.position-position).sqrMagnitude;
			if(magnitude<minMagnitude)
			{
				minMagnitude=magnitude;
				nearestUnit=u;
			}
		}
		
	}
	return nearestUnit;
}
function FindNearestResourceMine(unit:Unit):ResourceMine
{
	var group:int=groupsOfPlayers[unit.playerNum];
	var position=unit.transform.position;
	var minMagnitude=9999;
	var nearestMine:ResourceMine;
	for(var iP:int=0; iP<numberOfPlayers; iP++)
	{
		if(groupsOfPlayers[iP]==group && iP!=unit.playerNum) continue;
		for(var jU:int=0;jU<resourceMines[iP].Count;++jU)
		{
			var mine:ResourceMine=resourceMines[iP][jU];
			var magnitude:float=(mine.transform.position-position).sqrMagnitude;
			if(magnitude<minMagnitude)
			{
				minMagnitude=magnitude;
				nearestMine=mine;
			}
		}
		
	}
	return nearestMine;
}