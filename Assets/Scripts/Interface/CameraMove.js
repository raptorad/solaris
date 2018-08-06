#pragma strict
 var zoomSpeed = 10f;
 var minHeight : float = 5;
 var maxHeight : float = 70;
 var minX:float=5;
 var maxX:float=64;
 var minY:float=0;
 var maxY:float=62;
 
 
 function Start()
 {
 
 }
 function Move()
 {
 	transform.position.x+=Input.GetAxis ("Horizontal");
 	transform.position.z+=Input.GetAxis ("Vertical");
 	if(transform.position.x<minX)
 	{
 		transform.position.x=minX;
 	}
 	else
 	if(transform.position.x>=maxX)
 	{
 		transform.position.x=maxX;
 	}
 	
 	if(transform.position.z<minY)
 	{
 		transform.position.z=minY;
 	}
 	else
 	if(transform.position.z>=maxY)
 	{
 		transform.position.z=maxY;
 	}
 }
 function Zoom()
 {
  	var fov:float;

     fov=Camera.main.fov + Input.GetAxis("Mouse ScrollWheel") * zoomSpeed;
     if(fov<= minHeight)
     {
         Camera.main.fov = minHeight;
     }
     else
     if(fov>= maxHeight)
     {
         Camera.main.fov = maxHeight;
 	}
 	else
 	Camera.main.fov=fov;
 }
 function Update()
 {
 	Zoom();
 	Move();
 }