

function addPlatforms(){
	platforms.array = [];
	platforms.firesPerLevel = [0, 1, 2, 2, 3];

//	platforms.upFire = false;
//	platforms.timeToUpFires = game.time.now; 

	for(var i=0; i<10; i++){
		platforms.array[i] = game.add.sprite(140 + i * 53, 300, 'platform');
		game.physics.enable(platforms.array[i], Phaser.Physics.ARCADE);
		platforms.array[i].body.immovable = true;
		platforms.array[i].text = platforms.array[i].addChild( game.add.text(20, 5, i, 
    		{ font: '14px ferney', fill: '#fff', stroke: '#000000', strokeThickness: 3 }) );

		platforms.array[i].fire = platforms.array[i].addChild(addFire());
		platforms.array[i].fire.visible = false;

		platforms.array[i].damage = 30;
	}

//	platforms.fireOff = platformsFireOff;
//	platforms.fireOn = platformsFireOn;


	platforms.update = updatePlatforms;

	platforms.setPlatforms = setFirePlatforms;
	platforms.setAlive = setPlatformsAlive;

}

function addFire () {
	var fire = game.add.sprite(0, -70, 'fire');
//	fire.anchor.setTo(0.5, 0.8);
	fire.animations.add('fire', [0, 1, 2], 8, true);
	fire.play('fire');

	return fire;
}

function updatePlatforms(){
/*	if(this.upFire){
		if(game.time.now > this.timeToUpFires ){
			this.upFire = false;
			this.setPlatforms();
		}
	}*/
}

/*function platformsFireOff(){
	for(var i=0; i<10; i++){
		this.array[i].fire.visible = false;
	}
}*/

/*function platformsFireOn(){
	this.upFire = true;
	this.timeToUpFires = game.time.now + 3000;
}*/

function setPlatformsAlive(value){

	for(var i=0; i<10; i++){
		if(value){
			this.array[i].revive();
			this.array[i].fire.revive();
			this.array[i].fire.visible = false;
		}
		else{
			this.array[i].kill();
			this.array[i].fire.kill();
		}
	}
}

function setFirePlatforms(){
	var i=0;
	var number;
	while (i < this.firesPerLevel[game.global.level - 1]){
		number = Math.floor(Math.random() * 10);
		if(this.array[number].fire.visible == false){
			i++;
			this.array[number].fire.visible = true;
		}
	}
}