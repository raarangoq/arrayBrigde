
var timeOfWinState;

var items;

var textb;

levels = {
    create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
endImage.visible = false; 

    background.revive();

    player.revive();
    player.restart();

    gui.setAlive(true);


    walls.callAll('revive');

    

    stones.reset();
    bats.reset();

    if(game.global.level == 5){
        boss.revive();
        boss.reset();
    }

    door.setAlive(true);
    door.reset();

//    items = addItem('light');

    platforms.setAlive(true);
    platforms.setPlatforms();

    timeOfWinState = game.time.now;

    sound_backgroud.play();
dialog.kill();

game.time.advancedTiming = true;


    

    game.global.is_playing = true;
    gui.pauseGame();

    
    },

    

    update: function() {
        gui.update();


        this.playerTouchWalls();
            

        if (!flags['winState']){
            if (player.alive){
                
                game.physics.arcade.overlap(player, stones, this.playerHitStone, null, this);
                game.physics.arcade.overlap(player, bats, this.playerHitBat, null, this);

                if(door.visible)
                    game.physics.arcade.collide(player, door);

                game.physics.arcade.overlap(player, items, this.setAbility, null, this);

                if(player.is_attacking){
                    game.physics.arcade.overlap(player.attack, bats, this.attackHitBat, null, this);
                    if(game.global.level == 5)
                        game.physics.arcade.overlap(player.attack, boss, this.attackHitBoss, null, this);
                }

                if(game.global.level == 5 && !boss.beaten){
                    game.physics.arcade.overlap(player, boss, this.bossHitPlayer, null, this);
                }

                platforms.update();
                for(var i=0; i<10; i++){
                    game.physics.arcade.collide(player, platforms.array[i], this.playerHitPlatform, null, this);
                }

                if( keyboard.enterKey() )
                    gui.pauseGame();
            }
            else{
                if( keyboard.enterKey() ){

                    this.restart();
                }
            }
        }
        else{
            this.playWinAnimation();
            if( keyboard.enterKey() ){
                this.restart();
            }
        }

        


       
    },



    playerTouchWalls: function(){
        game.physics.arcade.collide(player, walls);
        
    },

    playerHitBat: function(player, bat){
        player.hitPlayer(bat);
    },

    playerHitPlatform: function(player, platform){
        if(platform.fire.visible){
            player.hitPlayer(platform);
        }
    },

    attackHitBat: function(attack, bat){
        bat.kill();
        gui.upScore(10);

        var prob = Math.random();
        if(items == null){
            if(prob < 0.2)
                items = addItem('shield');
            else if( prob < 0.4)
                items = addItem('velocity');
        }

        bats.killSound.play();
    },

    attackHitBoss: function(attack, boss){
        boss.takeDamage(player.hitDamage);
    },

    killBoss: function(boss, stone){
        boss.killSound.play();
        boss.kill();
        this.addExplosion(boss.x, boss.y);
        this.addExplosion(boss.x + 80, boss.y);
        this.addExplosion(boss.x + 40, boss.y + 40);
    },

    playerHitStone: function(player, stone){
        player.hitPlayer(stone);
        stone.kill();
    },

    bossHitPlayer: function(player, boss){
        player.hitPlayer(boss);
    },

    addAliens: function(){
        if(game.time.now - player.timeOfLastScorpionAttack > player.timeBetweenScorpionsAttacks){
            player.hitPlayer(scorpion);
            player.timeOfLastScorpionAttack = game.time.now;
        }
    },

    addExplosion: function(x, y){
        var explosion = explosions.getFirstExists(false);
        explosion.reset(x, y);
        explosion.play('kaboom', 30, false, true);
        boom_sound.play();
    },

   
    playWinAnimation: function(){
        if (game.global.level <= 5){          
            if(game.time.now - timeOfWinState < 2000){ //wait
                if(!flags['winAnimationPointA']){
                    player.body.velocity.x = 0;
                    player.animations.stop();
                    flags['winAnimationPointA'] = true;
                    this.addExplosion(door.x, door.y);
                }
            }
            else if(game.time.now - timeOfWinState < 6000){
                if(!flags['winAnimationPointB']){
                    game.physics.arcade.moveToXY(player, 800, 300, 200);
                    player.playAnimations("right");
                    player.body.collideWorldBounds = false;
                    flags['winAnimationPointB'] = true;
                }
            }
            else if(game.time.now - timeOfWinState < 8000){
                
                    
                    
                
            }
            else{
                winImage.visible = true;              
            }
        }
        else{
//         
        }
    },

    // Establecer la explosión
    setupExplosion: function(explosion) {
        
    },

    setAbility: function(player, item){
        items.takeItem();
    },

    enemyHitsPlayer: function(player, bullet) {
        

        
    },

    

    render: function() {

textb.text = game.time.fps;

text.text = boss.beaten;


    },

    restart: function() {
//        sound_backgroud.stop();

        if (player.alive){
            game.global.level++;
        }
        else{
            game.global.lives = 3;
            gui.restartScore();
            game.global.health = 100;
        }

        door.setAlive(false);
        boss.kill();

        if(items)
            items.destroy();
        items = null;

        stones.reset();
        boss.kill();
        
        winImage.visible = false;
        endImage.visible = false;
        loseImage.visible = false;

        game.global.is_playing = false;

        this.restartFlags();

        if(game.global.level <= 5)
            game.state.start('levels', false);
        else {
            player.kill();
            player.eyes.kill();
            platforms.setAlive(false);
            game.state.start('end', false);
        }

    },

    restartFlags: function(){
        flags['winAnimationPointA'] = false;
        flags['winAnimationPointB'] = false;
        flags['winState'] = false;
        flags['inDark'] = false;

        flags['playedA'] = false;
        flags['playedB'] = false;
        flags['playedC'] = false;
        flags['playedD'] = false;
        flags['playedE'] = false;
        flags['playedF'] = false;
    },




}
