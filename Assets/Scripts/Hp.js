#pragma strict
var hp:int=100;
var maxHp:int=100;
var barSizePerHp:float=2.0;
var hpBar:GameObject;
private var rectTran:RectTransform;
function Start () {
	rectTran=hpBar.GetComponent(RectTransform);
}

function Update () {
	UpdateHp();
}
function Hit(dmg:int)
{
	hp-=dmg;
	UpdateHp();
}
private function UpdateHp()
{
	if(hp<=0)
	{
		Destroy(gameObject);
	}
	if(hp>maxHp)
	{
		hp=maxHp;
	}
	rectTran.sizeDelta.x=barSizePerHp*hp*100.0/maxHp;
	
}