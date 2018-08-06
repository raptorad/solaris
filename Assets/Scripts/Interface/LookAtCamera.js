#pragma strict

function Start () {

}

function Update () {
	transform.LookAt(Camera.main.transform.position);
}