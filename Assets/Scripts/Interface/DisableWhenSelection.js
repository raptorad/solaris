#pragma strict
var toDisable:GameObject;
function Start () {

}

function Update () {
	toDisable.SetActive(!Interface.instance.GetSelection());
}