#pragma strict

function OnCollisionEnter(collision: Collision) {
	transform.position+=Vector3(0,3,0);
}