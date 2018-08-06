#pragma strict
static var clicked:int=0;
function click()
{
}
function enter()
{
	Debug.Log("inside button");
	clicked=100;
}
function leave()
{
	clicked=0;
}