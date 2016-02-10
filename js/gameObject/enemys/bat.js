
var bat;

/*********************************************
            Group of bats
********************************************/

function addBats(){
	bats = game.add.group();
    bats.enableBody = true;
    bats.physicsBodyType = Phaser.Physics.ARCADE;
    bats.createMultiple(3, 'bat');
    bats.setAll('anchor.x', 0.5);
    bats.setAll('anchor.y', 0.5);
    bats.setAll('outOfBoundsKill', true);
    bats.setAll('checkWorldBounds', true);
    bats.setAll('body.immovable', true);

    bats.timeOfLastBat = game.time.now + 2000;
    bats.timeBetweenBats = 5000;

    bats.damage = 20;
    bats.speed = 300;

    bats.inGame = false;

    bats.sound = game.add.audio('bat');
    bats.killSound = game.add.audio('rugido');

    bats.attack = batGroupAttack;
    bats.update = updateBatsGroup;
    bats.updateBat = updateBat;
    bats.setBat = setBat;
    bats.reset = resetBats;
    bats.addAnimations = addBatsAnimations;

    bats.forEach(bats.setBat, bats);
    bats.forEach(bats.addAnimations, bats);
}

function addBatsAnimations(bat){
    bat.animations.add('fly', [0, 1, 2, 3, 4, 5, 6, 7], 15, true);
    bat.play('fly');

    bat.body.setSize(13, 19, 0, 19);
}

function resetBats(){
    this.timeOfLastBat = game.time.now + 2000;
    this.callAll('kill');
    this.setAll('touchPlayer', false);
}


function batGroupAttack(){
	bat = this.getFirstExists(false);
    if (bat)
    {
        bat.reset(0, 100 + (Math.random() * 300));
        this.setBat(bat);
        this.sound.play();
        game.physics.arcade.moveToXY(bat, bat.xTarget, bat.yTarget, this.speed);

        this.timeOfLastBat = game.time.now + this.timeBetweenBats;
    }
}

function updateBatsGroup(){

	if( game.physics.arcade.isPaused || flags['winState'] || 
            !game.global.is_playing || game.time.now - game.global.timeInitLevel < 3000)
		return;
	
	if( game.time.now - this.timeOfLastBat > 
		this.timeBetweenBats - (game.global.level * 800)){
			this.timeOfLastBat = game.time.now;
			this.attack();
	}

	this.forEachAlive(this.updateBat, this);
}

/*****************************************************
            Every single bat in the group
*****************************************************/

function setBat(bat){
    bat.xTarget = player.body.x;
    bat.yTarget = player.body.y;
    bat.touchPlayer = false;
}

function updateBat(bat){
	if(	this.touchPlayer || game.physics.arcade.distanceToXY(bat, bat.xTarget, bat.yTarget) <= 10 ){
		bat.xTarget = 900;
		bat.yTarget = 200 + (Math.random() * 200);

		game.physics.arcade.moveToXY(bat, bat.xTarget, bat.yTarget, this.speed);
	}
}

