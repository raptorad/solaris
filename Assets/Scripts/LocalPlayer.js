#pragma strict

var selectedUnits:List.<Unit>;
static var instance:LocalPlayer;
var um:UnitManager;
var playerNum=0;
function SendUnitsToDestination(point:Vector3)
{
	var toRemove:List.<Unit> = new List.<Unit>();
	var commandID=UnitManager.instance.GetCommandID();
	for (var u:Unit in selectedUnits)
	{
		if(u==null)
		{
			toRemove.Add(u);
			continue;
		}
		u.CommandMove(point,commandID);
	}
	for (u in toRemove)
	{
		selectedUnits.Remove(u);
	}
}
function Awake()
{
	instance=this;
}
function Start ()
{
	um=UnitManager.instance;
}
function SelectUnits(start:Vector3,end:Vector3)
{
	ClearSelection();
	for(var u:Unit in um.units[playerNum])
	{
		var position:Vector3=u.transform.position;
		if(position.x>start.x && position.x<end.x)
		{
			if(position.z<start.z && position.z>end.z)
			{
				u.SetSelected(true);
				selectedUnits.Add(u);
			}
		}
	}
}
function ClearSelection()
{
	for ( var u:Unit in selectedUnits)
	{	
		u.SetSelected(false);
	}
	selectedUnits.Clear();
}
function Update () {

}