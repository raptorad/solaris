#pragma strict
var playerNum:int=0;
var type:int;
var move:UnitMove;
var selectionMarker:GameObject;
var isSelected:System.Boolean;
var attacksAlly:boolean=false;
var target:Unit;
var captureModule:CaptureModule;
var hp:Hp;
var enemyMarker:GameObject;
var factory:Factory;
function Start ()
{
	move=GetComponent(UnitMove);
	factory=GetComponent(Factory);
	hp=GetComponent(Hp);
	UnitManager.instance.RegisterUnit(this);
	if(enemyMarker!=null)
		enemyMarker.SetActive(LocalPlayer.instance.playerNum!=playerNum);
	if(selectionMarker!=null)
		selectionMarker.SetActive(isSelected);
}

function Update () {

}
function GetHp():int
{
	if(hp==null) return 100;
	return Mathf.RoundToInt(hp.hp*100.0f/hp.maxHp);
}
function SetSelected(bSelected:System.Boolean)
{
	isSelected=bSelected;
	if(selectionMarker!=null)
	selectionMarker.SetActive(isSelected);

}
function OnDestroy()
{
	UnitManager.instance.RemoveUnit(this);
}
function FindTarget():Unit
{

	if(attacksAlly)
	{
		var u=UnitManager.instance.FindNearestAlly(this);
		if(u)
		if(u.GetHp()>=100)
		{
		return null;
		}
		else return u;
	}
	else
	{
			if(target!=null)
			{
				return target;
			}
		return UnitManager.instance.FindNearestEnemy(this);
	}
}
function CommandAttack(target:Unit)
{
	this.target=target;
}
function CommandMove(point:Vector3,commandID:int)
{
	if(move!=null)
	{
		move.CommandMove(point,commandID);
	}
	if(factory!=null)
	{
		factory.CommandSetExit(point);
	}
}
function FindMine():ResourceMine
{
	return UnitManager.instance.FindNearestResourceMine(this);
}
function CommandCapture(mine:ResourceMine)
{
	
}