
function addPlayer(){

	// El objeto player en si mismo es un objeto sprite
	player = game.add.sprite(400, 200, 'player');
	game.physics.enable(player, Phaser.Physics.ARCADE);
	player.body.setSize(21, 26, 23, 23);   // Reajustar el collider del jugador, para que solo cubra el cuerpo
	player.body.gravity.y = 200;

	player.inGround = false;

	// Atributos constantes
	player.SPEED_WALKING = 150;
	player.SPEED_ATTACKING = 50;
	player.MAX_HEALTH = 100;

	// Atributos variables
	player.attack = player.addChild(addAttack());
	player.spiral = player.addChild(addSpiral());

	player.shield = player.addChild(game.add.sprite(34, 30, 'aura'));
	player.shield.anchor.setTo(0.5, 0.5);
	player.shield.animations.add('shine', [0, 1, 2, 3, 4, 5, 6], 9, true);
	player.shield.play('shine');
	player.shield.initTime = game.time.now;
	player.shield.visible = false;

	player.blood = player.addChild(addBlood());

	player.haveTorpedo = false;
	player.timeWithVelocity = 5000;
    player.timeVelocityActivated = game.time.time - 5000;

    player.timeOfLastHit = game.time.now;
    player.timeBetweenHits = 2000;

    player.timeInitLevel = game.time.now;
	player.canMove = true;
	player.direction = "";
	player.is_attacking = false;
	player.speed = 200;
	player.highSpeed = 300;
	player.flySpeed = 20;
	player.timeToDownPlatform = game.time.now;
	player.health = game.global.health;
	player.hitDamage = 10;
	player.timeBetweenAttacks = 500;

	player.start_time_attack = game.time.time;
	player.start_time_hit = game.time.now - 5000;
	
	player.sound_hit = game.add.audio('hit', 0.2);
	player.sound_sword_fail = game.add.audio('swordair', 0.5);

	// Los metodos del jugador
	player.attacking = attacking;
	player.hitPlayer = hitPlayer;
	player.movePlayer = movePlayer;
	player.playAnimations = playAnimations;
	player.toAttack = toAttack;
	player.update = updatePlayer;

	player.activateAbility = activateAbility;
	player.activateVelocity = activateVelocity;
	player.activateShield = activateShield;

	player.takeDamage = playerTakeDamage;
	player.checkHealth = checkHealth;
	player.playerDies = playerDies;
	player.setDrawOrder = playerSetDrawOrder;

	player.setWinState = setWinState;

	player.restart = restartPlayer;

	// Se agregan las animaciones del jugador al instanciar uno
	addPlayerAnimations();
}

// Cada una de las animaciones del jugador, no se agrega al objeto player debido a que esta función solo se ejecuta al crear un player
function addPlayerAnimations(){
	var frames_per_second = 10;

	// animaciones para caminar
	player.animations.add('walk_front', [0, 1, 2, 3], frames_per_second, true);
	player.animations.add('walk_left', [8, 9, 10, 11], frames_per_second, true);
	player.animations.add('walk_right', [24, 25, 26, 27], frames_per_second, true);
	player.animations.add('walk_back', [16, 17, 18, 19], frames_per_second, true);

	// animaciones para atacar
	player.animations.add('attack_front', [4, 5, 6, 7], frames_per_second, false);
	player.animations.add('attack_left', [12, 13, 14, 15], frames_per_second, false);
	player.animations.add('attack_right', [28, 29, 30, 31], frames_per_second, false);
	player.animations.add('attack_back', [20, 21, 22, 23], frames_per_second, false);
}


// Mientras se realiza un ataque
function attacking(){
	if(!this.is_attacking) 
		return;

	// la animación para el ataque
	this.animations.play('attack_' + this.direction);

	// Cuando expira el tiempo del ataque, este se detiene
	if(game.time.elapsedSince(this.start_time_attack) > this.timeBetweenAttacks){
		this.is_attacking = false;
		this.attack.hitEnemy = false;
		this.speed = this.SPEED_WALKING;
	}
}


function hitPlayer(enemy){
	
	if(enemy.key == 'stone'){
		this.playerDies(true);
	}
	else if(game.time.now - player.timeOfLastHit < player.timeBetweenHits){
		return;
	}
	player.timeOfLastHit = game.time.now;

	if(this.canMove){
		if(enemy.key == 'platform'){
			if(this.shield.visible) return;
			this.takeDamage(enemy.damage);
		}
		else if(enemy.key == 'bat' || enemy.key == 'boss'){
			this.start_time_hit = game.time.now;
			
			if(enemy.key == 'bat'){
				if(this.shield.visible) return;
				this.takeDamage(bats.damage);
			}
			else
				this.takeDamage(enemy.damage);

			this.shield.visible = false;
			this.shield.scale.setTo(1, 1);

			this.canMove = false;
			this.spiral.visible = true;

			var xDirection = player.body.x - enemy.body.x;
	        xDirection /= Math.abs(xDirection);

	        player.body.velocity.x = xDirection * 200;
		}
		this.sound_hit.play();
	}
}

function playerTakeDamage(damage){

	this.blood.playBleed();
	game.global.health -= damage;
	this.checkHealth();
	this.playerDies();
}

function checkHealth(){
    if (game.global.health <= 0){
        this.sound_hit.play();
        game.global.lives--;
        if (game.global.lives > 0)
            game.global.health = 100;
        else
            game.global.health = 0;

        //  And create an explosion :)
        var explosion = explosions.getFirstExists(false);
        explosion.reset(player.body.x, player.body.y);
        explosion.play('kaboom', 30, false, true);
    }
}

function playerDies(stone){
        // When the player dies
	if (game.global.lives < 1 || stone){
		game.global.lives = 0;
	    this.kill();

	    loseImage.visible = true;
	}
    
}

function playerSetDrawOrder(){
	inkImage.bringToTop();
}


// El movimiento del jugador mediante teclado
function movePlayer(){
	if(!this.canMove || game.physics.arcade.isPaused || flags['winState'])
		return;

	this.body.velocity.x = 0;


	// Al presionar una tecla, el jugador se mueve y se activa una animacion
	if(keyboard.leftKey()){
		// Mover a la izquierda
		this.body.velocity.x = - this.speed;

		this.playAnimations('left');
		if(!this.is_attacking) 
			this.attack.changeAttackOrientation('left', this);
	}
	else if(keyboard.rightKey()){
		// Mover a la derecha
		this.body.velocity.x = this.speed;
		
		this.playAnimations("right");
		if(!this.is_attacking) 
			this.attack.changeAttackOrientation('right', this);
	} 
	
	if(keyboard.upKey()){
		if (player.body.touching.down){
			this.body.velocity.y = -this.speed * 1.5;
		}
		this.playAnimations('back');
		if(!this.is_attacking) 
			this.attack.changeAttackOrientation('back', this);
	} // abajo
	else if(keyboard.downKey()){
//		this.body.velocity.y = this.speed;
		this.playAnimations('front');
		if(!this.is_attacking) 
			this.attack.changeAttackOrientation('front', this);
		if(this.body.touching.down)
			this.timeToDownPlatform = game.time.now;
	}
	

	// Permanecer quieto
	if(!this.is_attacking &&
		!keyboard.upKey() &&
		!keyboard.downKey() &&
		!keyboard.leftKey() &&
		!keyboard.rightKey()){
		this.animations.stop();
	}
	
}


// cuando se realiza un ataque, se reproduce la animación correspondiente a la dirección del jugador
function playAnimations(new_direction){
	if(!this.is_attacking || this.segment){
		this.animations.play('walk_' + new_direction);
		this.direction = new_direction;
	}
}

// Al realizar un ataque, se establece la bandera a true, y se guarda el momento de inicio del ataque
function toAttack(){
	this.is_attacking = true;
	this.attack.hitEnemy = true;
	this.start_time_attack = game.time.time;
//	this.speed = this.SPEED_ATTACKING;
	this.sound_sword_fail.play();
}


// Se ejecutan las funciones del jugador, como moverse y atacar
function updatePlayer(){
	if(game.physics.arcade.isPaused || game.time.now - game.global.timeInitLevel < 3000)
        return;

    this.blood.update();

	if(game.time.now - this.start_time_hit > 1500 ){
		this.canMove = true;
		this.spiral.visible = false;
	}

	if(this.y <= 0){
		this.y = 10;
		this.body.velocity.y = 0;
	}

	this.movePlayer();
	this.attacking();

	if (game.time.time - this.timeVelocityActivated < this.timeWithVelocity){
        this.speed = this.highSpeed;
    }
    else{
    	if(!this.is_attacking)
        	this.speed = this.SPEED_WALKING;
        else
        	this.speed = this.SPEED_ATTACKING;
        gui.changeAbility(false, "velocity");
    }  

    if(this.shield.visible){
    	var time =  Math.floor((20000 - (game.time.now - this.shield.initTime)) / 1000);
    	var scale = ((time * 1000 / 20000) * 1.5) + 0.5;
    	if(scale > 1)
    		scale = 1;
    	
    	this.shield.scale.setTo(scale, scale);

    	if(game.time.now - this.shield.initTime > 20000)
    		this.shield.visible = false;
    }

    if( this.segment ){
    	this.segment.x = this.body.x + 5;
		this.segment.y = this.body.y - 45;
    }

	// Cuando se presiona la tecla SPACE, se produce un ataque
	if(keyboard.spaceKey() && !this.is_attacking && !flags['winState']){
		this.toAttack();
	}

	
}


function activateAbility(type){
	gui.upScore(10);
    if ( type == "velocity"){
        this.activateVelocity();
    } 
    else if(type == 'shield'){
    	this.activateShield();
    }
}

function activateVelocity(){
    this.timeVelocityActivated = game.time.time;
}

function activateShield(){
	this.shield.visible = true;
	this.shield.initTime = game.time.now;
}

function setWinState(){

	flags['winState'] = true;
	timeOfWinState = game.time.now;
	gui.upScore(100 * game.global.level);
	gui.upScore(game.global.lives * 50 + game.global.health);
	gui.scoreText.previousScore = gui.scoreText.score;
	bats.callAll('kill');
}

function restartPlayer(){
	this.x = 00;
	this.body.acceleration.setTo(0, 0);
	this.body.velocity.setTo(this.SPEED_WALKING, 40);
	this.timeInitLevel = game.time.now;
	this.play('walk_right');
	this.y = 200;
	this.segment = null;
	this.shield.visible = false;
}