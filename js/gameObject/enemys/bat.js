
var bat;

/*********************************************
            Group of bats
********************************************/

function addBats(){
	bats = game.add.group();
    bats.enableBody = true;
    bats.physicsBodyType = Phaser.Physics.ARCADE;
    bats.createMultiple(4, 'bat');
    bats.setAll('anchor.x', 0.5);
    bats.setAll('anchor.y', 0.5);
    bats.setAll('outOfBoundsKill', true);
    bats.setAll('checkWorldBounds', true);
    bats.setAll('body.immovable', true);

    bats.timeOfNextBat = game.time.now + 2000;

    bats.damage = 20;
    bats.speed = 400;

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
    this.timeOfNextBat = game.time.now + 2000;
    this.callAll('kill');
    this.setAll('touchPlayer', false);
}


function batGroupAttack(){
	bat = this.getFirstExists(false);
    if (bat)
    {
        
        this.setBat(bat);
        this.sound.play();
        game.physics.arcade.moveToXY(bat, bat.xTarget, bat.yTarget, this.speed);
    }
}

function updateBatsGroup(){

	if( game.physics.arcade.isPaused || flags['winState'] || 
            !game.global.is_playing || game.time.now - game.global.timeInitLevel < 3000)
		return;
	
	if( game.global.lives > 0 && game.time.now > this.timeOfNextBat ){

			this.timeOfNextBat = game.time.now;
            this.timeOfNextBat += ((2500 / game.global.level) + (Math.random() * 5000));
			this.attack();
	}

	this.forEachAlive(this.updateBat, this);
}

/*****************************************************
            Every single bat in the group
*****************************************************/

function setBat(bat){
    var x = -10;
    if(Math.random() <= 0.5)
        x = 810;

    bat.reset(x, 100 + (Math.random() * 400));
    bat.xTarget = player.body.x;
    bat.yTarget = player.body.y;
    bat.touchPlayer = false;
}

function updateBat(bat){
/*	if(	this.touchPlayer || game.physics.arcade.distanceToXY(bat, bat.xTarget, bat.yTarget) <= 10 ){
		bat.xTarget = 900;
		bat.yTarget = 200 + (Math.random() * 200);

		game.physics.arcade.moveToXY(bat, bat.xTarget, bat.yTarget, this.speed);
	}
*/
}

