#pragma strict

//var playerTarget:GameObject;
private var down:boolean=false;
private var downPosition:Vector3;
private var selectionStart:Vector3;
private var selectionEnd:Vector3;
private var selection=false;
var raycastPlate:GameObject;
private var raycastCollider:Collider;
var objectToPlace:GameObject;
var objectCost:int;
static var instance:Interface;
var mode:int=0;

static var MODE_DEFAULT:int=0;
static var MODE_PLACE_OBJECT:int=1;
static var MODE_REMOVE_OBSTACLES:int=2;
var arrow:Texture2D;
var move:Texture2D;
var attack:Texture2D;
var build:Texture2D;
var erase:Texture2D;

var enableRangeMarkers:boolean;
var text:UI.Text;


function GetSelection():boolean
{
	return selection;
}
function Awake()
{
	instance=this;
	raycastCollider=raycastPlate.GetComponent(Collider);
}
function Start ()
{
	text.text="Tryb wydawania poleceń.";
}
function SetModeDefault()
{
	Cursor.SetCursor (arrow, Vector2.zero, CursorMode.Auto);
	mode=MODE_DEFAULT;
	text.text="Tryb wydawania poleceń.";
}
function SetModePlaceObject(obj:GameObject,cost:int)
{
	objectToPlace=obj;
	objectCost=cost;
	Cursor.SetCursor (build, Vector2.zero, CursorMode.Auto);
	mode=MODE_PLACE_OBJECT;
	text.text="Tryb stawiania obiektów.";
	
}
function SetModeRemoveObstacles()
{
	Cursor.SetCursor (erase, Vector2.zero, CursorMode.Auto);
	mode=MODE_REMOVE_OBSTACLES;
	text.text="Tryb usuwania przeszkód.";
}
function Update ()
{
	if(InGameButton.clicked>0)
	{
		--InGameButton.clicked;
	}
	if(mode==MODE_DEFAULT)
	{
		if(!selection && LocalPlayer.instance.selectedUnits.Count>0)
		{
			Cursor.SetCursor (move, Vector2.zero, CursorMode.Auto);
		}
		else
		{
			Cursor.SetCursor (arrow, Vector2.zero, CursorMode.Auto);
		}
	}
}
function MousePoint():Vector3
{
	var hit:RaycastHit;
	var ray=Camera.main.ScreenPointToRay(Input.mousePosition);
		raycastCollider.Raycast(ray,hit,200.0f);
		return hit.point;

}
function OnGUI()
{
	DrawSelection();
}
function PlaceObject(pos:Vector3):boolean
{
	var rectangles:Component[];
	pos.x=Mathf.RoundToInt(pos.x);
	pos.z=Mathf.RoundToInt(pos.z);
	rectangles=objectToPlace.GetComponents(RectangleObstacle);
	for(var r in rectangles)
	{
		if(!(r as RectangleObstacle).IsGoodPlace(pos))
		{
			return false;
		}
	}
	Instantiate(objectToPlace,pos,objectToPlace.transform.rotation);
	return true;
}
function LateUpdate()
{
	var point:Vector3;
		if(InGameButton.clicked)
		{
			down=false;
			return;
		}
	if(down)
	{
		
		point=MousePoint();
		//playerTarget.transform.position=point;
		selectionEnd=Input.mousePosition;
				if(mode==MODE_PLACE_OBJECT)
		{
			if(UnitManager.instance.money[LocalPlayer.instance.playerNum]>=objectCost)
			{
				if(PlaceObject(point))
				{
					UnitManager.instance.money[LocalPlayer.instance.playerNum]-=objectCost;
				}
			}
		}
		if(mode==MODE_REMOVE_OBSTACLES)
		{
			Astar.instance.GetNode(point).RemoveObstacleObjects();
		}
	}
	if(Input.GetMouseButtonUp(0))
	{
		point=MousePoint();

		selection=false;

		if(mode==MODE_DEFAULT)
		{
			if((downPosition-point).sqrMagnitude<1)
			{
				LocalPlayer.instance.SendUnitsToDestination(point);
			}
			else
			{
				LocalPlayer.instance.SelectUnits(downPosition,point);

			}
		}
		down=false;
	}

	if(Input.GetMouseButtonDown(0))
	{
		if(!InGameButton.clicked) down=true;
		Debug.Log("Mouse down");
		selectionStart=selectionEnd=Input.mousePosition;
		selection=true;
		downPosition=MousePoint();
	}
}
function DrawSelection()
{
	if(selection && mode==MODE_DEFAULT)
	{
		if(selectionStart!=selectionEnd)
		{
		 var startX:float=selectionStart.x;
		 var startY:float=Screen.height-selectionStart.y;
		 var EndX:float=selectionEnd.x-startX;
		 var EndY:float=Screen.height-selectionEnd.y-startY;
		 GUI.Box(new Rect(startX,startY,EndX,EndY), "");
		}
	}
}