var playerNum:int;
// Use this for initialization
function Start ()
{
	UnitManager.instance.RegisterPowerPlant(this);
}

function OnDestroy()
{
	UnitManager.instance.RemovePowerPlant(this);
}

