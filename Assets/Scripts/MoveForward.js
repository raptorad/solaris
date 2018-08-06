#pragma strict
var velocity:float;
function Start () {

}

function Update () {
	transform.position+=transform.forward*velocity*Time.deltaTime;
}