var shootInterval:float=0.5;
var target:ResourceMine;
var shootTime:float=0;
var force:int=1;
var unit:Unit;
var range:float=8;
var workMarker:GameObject;
// Use this for initialization
function Start () {
}

// Update is called once per frame
function Update ()
{
	if(target==null)
	{
		target=unit.FindMine();
		workMarker.SetActive(false);
	}
	else
	{
		if((transform.position-target.transform.position).sqrMagnitude < range*range)
		{
			Shoot();
			workMarker.SetActive(true);
		}
		else
		{
			target=unit.FindMine();
			workMarker.SetActive(false);
		}
	}
}

function Shoot()
{
	if(Time.time>shootTime)
	{
		shootTime=Time.time+shootInterval;
		target.AddCrew(unit.playerNum,force);
	}
}