

function addBoss(){
	boss = game.add.sprite(50, 200, 'boss');
	game.physics.enable(boss, Phaser.Physics.ARCADE);
    boss.body.setSize( 56, 59, 59, 22);
    boss.animations.add('fly', [0, 1, 2, 3, 4, 5], 8, true);
    boss.play('fly');

	boss.speed = 300;
	boss.pointA = 50;
    boss.pointB = 600;
    boss.yPoint = 100;

    boss.xTarget = player.body.x;
    boss.yTarget = player.body.y;
    boss.target = 'pointB';
    this.inMove = false;

    boss.damage = 50;
    boss.beaten = false;
    boss.health = 150;

    boss.timeToNextMove = 5000;
    boss.timeOverMove = game.time.now; 

    boss.maxHealth = 150;

    boss.healthBar = game.add.sprite(0,  -20, 'enemyBar');
    boss.healthBar.width = 190;
    boss.addChild(boss.healthBar);

    boss.killSound = game.add.audio('creature');
    boss.sound = game.add.audio('boss');

    boss.move = moveBossToTarget;
    boss.stopMove = stopBossMove;
    boss.update = updateBoss;
    boss.reset = resetBoss;
    boss.takeDamage = bossTakeDamage;
    boss.goBack = bossGoBack;

    game.physics.arcade.moveToXY(boss, boss.target, boss.y, boss.speed);
}

function moveBossToTarget(){
    this.beaten = false;
    this.xTarget = player.body.x;
    this.yTarget = player.body.y;

    this.inMove = true;
    game.physics.arcade.moveToXY(this, this.xTarget, this.yTarget, this.speed);
    this.sound.play();
}


function updateBoss(){
    if(game.physics.arcade.isPaused || game.time.now - game.global.timeInitLevel < 3000)
        return;

    if( this.inMove && game.physics.arcade.distanceToXY(this, this.xTarget, this.yTarget) < 10 ){
        if(this.xTarget == this.pointA || this.xTarget == this.pointB){
            this.stopMove();
        }
        else{
            this.yTarget = this.yPoint;
            if(this.target == 'pointA'){
                this.xTarget = this.pointA;
            }
            else{
                this.xTarget = this.pointB;
            }
            game.physics.arcade.moveToXY(this, this.xTarget, this.yTarget, this.speed);
        }
    }

    if(!this.inMove && !flags['winState'] && game.time.now - this.timeOverMove > this.timeToNextMove){
        this.move();
    }
}

function bossTakeDamage(damage){
    if(this.beaten)
        return;

    this.beaten = true;
    this.health -= damage;

    this.healthBar.width = 190 * ( this.health / this.maxHealth);

    this.goBack();

    if(this.health <= 0){
        this.healthBar.visible = false;

        this.kill();
        this.killSound.play();
    }

}

function bossGoBack(){
    this.yTarget = this.yPoint;
    // If this moves to the player...
    if(this.target == 'pointB'){
        this.target = 'pointA';
        this.xTarget = this.pointA;
        game.physics.arcade.moveToXY(this, this.xTarget, this.yTarget, this.speed);
    }
    else{
        this.target = 'pointB';
        this.xTarget = this.pointB;
        game.physics.arcade.moveToXY(this, this.xTarget, this.yTarget, this.speed);
    }
}

function stopBossMove(){
    this.inMove = false;
    this.beaten = false;
    this.timeOverMove = game.time.now;
    this.body.velocity.setTo(0, 0);

    if(this.target == 'pointA')
        this.target = 'pointB';
    else 
        this.target = 'pointA';
}

function resetBoss(){ 
	boss.y = this.pointA;
    boss.x = this.yPoint;
    boss.body.velocity.setTo(0,0);

    boss.target = 'pointB';
    boss.beaten = false;
    boss.health = 150;
    this.healthBar.width = 190;

    boss.timeOverMove = game.time.now; 
    this.inMove = false;
}