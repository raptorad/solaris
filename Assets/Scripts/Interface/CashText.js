#pragma strict
var text:UI.Text;
var descriptionText:String="Surowce: ";
function Start () {
	
}
function Update () {
	text.text=descriptionText+Mathf.Round(UnitManager.instance.money[LocalPlayer.instance.playerNum]).ToString();
}