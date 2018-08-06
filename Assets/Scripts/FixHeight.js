#pragma strict

function Start () {
transform.position.y = Terrain.activeTerrain.SampleHeight(transform.position);
}