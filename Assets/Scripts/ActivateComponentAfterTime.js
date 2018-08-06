#pragma strict
var behaviour:Behaviour;
var time:float=10;
private var counter:float=0;
var progressBarRoot:GameObject;
var progressBar:GameObject;
var barSizeMultipler:float=2.0;
private var rectTran:RectTransform;

function Start ()
{
	rectTran=progressBar.GetComponent(RectTransform);
	
}

function Update ()
{
	
	counter+=Time.deltaTime;
	if(counter>time)
	{
		behaviour.enabled=true;
		progressBarRoot.SetActive(false);
	}
	else
	{
		behaviour.enabled=false;
	}
	rectTran.sizeDelta.x=barSizeMultipler*counter*100.0/time;
}