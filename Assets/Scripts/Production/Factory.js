var player:int=0;
var unitsCanBuild:UnitUnderProduction[];
var productionQueue:List.<UnitUnderProduction>;
var buildTimer:float=0;
//var isWorking:System.Boolean=false;
var exit:GameObject;
var barSizeMultipler:float=2.0;
var progressBar:GameObject;
var destination:GameObject;
var paid:boolean=false;
private var rectTran:RectTransform;
// Use this for initialization
function Start ()
{
	rectTran=progressBar.GetComponent(RectTransform);
}

// Update is called once per frame
function Update ()
{
	if(UnitManager.instance.powerPlants[player]>0)
	{
		if(paid)
		{
			Build();
		}
		else
		{
			Pay();
		}
	}
}
function CommandSetExit(position:Vector3)
{
	destination.transform.position=position;
}
function Pay()
{
	if(productionQueue.Count>0)
	{
		if(UnitManager.instance.money[player]-productionQueue[0].cost>0)
		{
			UnitManager.instance.money[player]-=productionQueue[0].cost;
			paid=true;
		}
	}
}
function Build()
{
	if(productionQueue.Count>0)
	{
		buildTimer+=Time.deltaTime;
		rectTran.sizeDelta.x=barSizeMultipler*buildTimer*100.0/productionQueue[0].productionTime;
		if(productionQueue[0].productionTime<buildTimer)
		{
			buildTimer=0;
			var gUnit:GameObject=Instantiate(productionQueue[0].prefab,
			exit.transform.position,
			exit.transform.rotation);
			gUnit.GetComponent(Unit).playerNum=player;
			gUnit.GetComponent(UnitMove).CommandMove(destination.transform.position);
			if(productionQueue[0].infinitProduction)
			{
				productionQueue.Add(productionQueue[0]);
			}
			paid=false;
			productionQueue.RemoveAt(0);
		}
		
	}
}
function AbortProduction(num:int)
{
	if(num==0)
	{
		buildTimer=0;
		paid=false;
	}
	productionQueue.RemoveAt(num);
}
function CommandBuildUnit(num:int)
{
	Debug.Log("Building");
	if(unitsCanBuild.length>num)
	{
		var toBuild:UnitUnderProduction=new UnitUnderProduction();
		toBuild.sprite = unitsCanBuild[num].sprite;
		toBuild.prefab = unitsCanBuild[num].prefab;
		toBuild.productionTime = unitsCanBuild[num].productionTime;
		toBuild.cost = unitsCanBuild[num].cost;
		productionQueue.Add(toBuild);		
	}
}
