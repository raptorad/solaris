#pragma strict

function Start () {

}

function Update () {
	 var rcHit : RaycastHit;
 //Make raycast direction down
 var theRay : Vector3 = transform.TransformDirection(Vector3.down);
 
 if (Physics.Raycast(transform.position, theRay, rcHit))
 {
     //this is for getting distance from object to the ground
     var GroundDis = rcHit.distance;
     //with this you rotate object to adjust with terrain
     var rotation:Quaternion=Quaternion.FromToRotation(Vector3.up, rcHit.normal);

     transform.rotation = rotation;
     
     //finally, this is for putting object IN the ground
     //transform.localPosition.y = (transform.localPosition.y - GroundDis)+1;
     
 }
}