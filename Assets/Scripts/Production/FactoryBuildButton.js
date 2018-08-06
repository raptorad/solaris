#pragma strict
var factory:Factory;
var id:int=0;
function Start ()
{
	var image:UI.Image=GetComponent(UI.Image);
	image.sprite=factory.unitsCanBuild[id].sprite;
}

function Update () {

}
function Click()
{
	factory.CommandBuildUnit(id);
}