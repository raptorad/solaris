#pragma strict
class FactoryQueueButton extends InGameButton
{
	var factory:Factory;
	var id:int=0;
	var image:UI.Image;
	var button:UI.Button;

	function Start ()
	{
		image=GetComponent(UI.Image);
		button=GetComponent(UI.Button);
	}

	function Update () {
		if(factory.productionQueue.Count > id)
		{
			button.interactable=true;
			image.sprite=factory.productionQueue[id].sprite;
		}
		else
		{
			button.interactable=false;
		}
	}
	function Click()
	{
		factory.AbortProduction(id);
	}
}