#pragma strict
var playerNum:int=0;
var moneyPerSecond:float=2;
var crew:int=4;
var maxCrew:int=8;
var playerMaterial:Material;
var enemyMaterial:Material;
var model:GameObject;
var bar:GameObject;
var rectTran:RectTransform;
function SetMaterial()
{

	if(playerNum==LocalPlayer.instance.playerNum)
	{
		model.GetComponent(Renderer).sharedMaterial=playerMaterial;
	}
	else
	{
		model.GetComponent(Renderer).sharedMaterial=enemyMaterial;
	}
}
function Start () {
	UnitManager.instance.RegisterResourceMine(this);
	SetMaterial();
	rectTran=bar.GetComponent(RectTransform);
	rectTran.sizeDelta.x=2*crew*100.0/maxCrew;
}

function Update ()
{
	AddMoney();
}
private function AddMoney()
{
	UnitManager.instance.money[playerNum]+=moneyPerSecond*Time.deltaTime;
}
function OnDestroy()
{
	UnitManager.instance.RemoveResourceMine(this);
}
function ChangePlayer(newPlayer:int)
{
	UnitManager.instance.RemoveResourceMine(this);
	playerNum=newPlayer;
	UnitManager.instance.RegisterResourceMine(this);
	SetMaterial();
}
function AddCrew(player:int,count:int)
{
	if(player!=playerNum)
	{
		crew-=count;
		if(crew<0)
		{
			crew=Mathf.Abs(crew);
			ChangePlayer(player);
		}
	}
	else
	{
		if(crew+count>maxCrew)
		{
			crew=maxCrew;
		}
		else
		{
			crew+=count;
		}
	}
	rectTran.sizeDelta.x=2*crew*100.0/maxCrew;
}