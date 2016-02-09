
function addWall(x){
	var wall = game.add.sprite(x, -120, 'wall');
	game.physics.enable(wall, Phaser.Physics.ARCADE);
	wall.body.immovable = true;
	wall.body.setSize(60, 320, 0, -200);
	wall.body.gravity.y = 200;

	wall.restartPosition = restartWallPosition;
	wall.setAlive = setWallAlive;
	wall.update = updateWall;

	return wall;
}

function setWallAlive(value){
	if(value)
		this.revive();
	else
		this.kill();
}


function restartWallPosition(){
	this.y = -120;
	this.body.gravity.y = 200;
} 

function updateWall(){
	if(this.y > 180){
		this.body.gravity.y = 0;
		this.body.velocity.y = 0;
	}
}