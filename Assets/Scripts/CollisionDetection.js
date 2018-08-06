#pragma strict
var boom:GameObject;
var domage:int=2;
function Start () {

}

function Update () {

}
function OnCollisionEnter(collision: Collision) {
	var hp:Hp=collision.gameObject.GetComponent(Hp);
	if(hp!=null)
	{
		hp.Hit(domage);
	}
	for (var contact: ContactPoint in collision.contacts) {
		Debug.DrawRay(contact.point, contact.normal, Color.white);
	}
	Instantiate(boom,transform.position,transform.rotation);
	Destroy(gameObject);
}