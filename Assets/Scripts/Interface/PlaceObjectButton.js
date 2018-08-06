#pragma strict
class PlaceObjectButton extends InGameButton
{
	var cost:int=100;
	var objectToBuild:GameObject;

	function ClickBuild()
	{
			Interface.instance.SetModePlaceObject(objectToBuild,cost);
	}
	function ClickAbort()
	{
		Interface.instance.SetModeDefault();
	}
	function ClickRemove()
	{
		Interface.instance.SetModeRemoveObstacles();
	}
}