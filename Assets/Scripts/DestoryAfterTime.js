#pragma strict
var time:float=0.1;
private var destroyTime:float;
function Start () {
	destroyTime=Time.time+time;
}

function Update ()
{
	if(Time.time>destroyTime)
	{
		Destroy(gameObject);
	}
}