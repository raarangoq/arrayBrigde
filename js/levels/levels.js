
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


    walls[0].setAlive(true);
    walls[0].restartPosition();
    walls[1].setAlive(true);
    walls[1].restartPosition();

    bridge.revive();

    

    stones.reset();
    bats.reset();

    if(game.global.level == 5){
        boss.revive();
        boss.reset();
    }

//items = addItem('shield');

    platforms.setAlive(true);

    timeOfWinState = game.time.now;

    sound_backgroud.play();
    dialog.kill();

//game.time.advancedTiming = true;

    game.global.is_playing = true;
    game.global.timeInitLevel = game.time.now;
    gui.pauseGame();

    
    },

    

    update: function() {
        gui.update();

        if(!flags['playedA'])
            game.physics.arcade.collide(player, bridge);

        if(game.time.now - game.global.timeInitLevel < 3000){
            if( keyboard.enterKey() )
                gui.pauseGame();
            return;
        }
        
        if (!flags['winState']){
            game.physics.arcade.collide(player, walls[0]);
            game.physics.arcade.collide(player, walls[1]);
            
            if (player.alive){
                
                game.physics.arcade.overlap(player, stones, this.playerHitStone, null, this);
                game.physics.arcade.overlap(player, bats, this.playerHitBat, null, this);

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
            game.physics.arcade.overlap(boss, stones, this.stoneHitBoss, null, this);
            if( keyboard.enterKey() ){
                this.restart();
            }
        }

        
        
        for(var i=0; i<10; i++){
            game.physics.arcade.overlap(player, platforms.array[i], this.playerHitPlatform, null, this);
            game.physics.arcade.overlap(stones, platforms.array[i], this.stoneHitPlatform, null, this);
        }

       
    },

    playWinAnimation: function(){
        if (game.global.level < 5){          
            if(game.time.now - timeOfWinState < 2000){ //wait
                if(!flags['winAnimationPointA']){
                    player.body.velocity.x = 0;
                    player.animations.stop();
                    flags['winAnimationPointA'] = true;
                }
            }
            else if(game.time.now - timeOfWinState < 6000){
                if(!flags['winAnimationPointB']){
                    game.physics.arcade.moveToXY(player, 800, 300, 200);
                    player.playAnimations("right");
                    player.body.collideWorldBounds = false;
                    flags['winAnimationPointB'] = true;
                    walls[1].setAlive(false);
                    this.addExplosion(walls[1].x, walls[1].y);
                    this.addExplosion(walls[1].x + 40, walls[1].y + 80);

                }
            }
            else if(game.time.now - timeOfWinState < 8000){
                //wait..   
            }
            else{
                winImage.visible = true;              
            }
        }
        else{
            if(game.time.now - timeOfWinState < 5000){
                //wait..
            }
            else if(game.time.now - timeOfWinState < 6000){
                if(!flags['winAnimationPointA']){
                    flags['winAnimationPointA'] = true;
                    stones.toBoss();
                }
            }
            else if(game.time.now - timeOfWinState < 15000){
                if(!flags['winAnimationPointB']){
                    flags['winAnimationPointB'] = true;
                    stones.toPlayerBeside();
                   // platforms.down();
                }
            }
            else{
                endImage.visible = true;
                gui.setAlive(false);
            }
        }

    },

    stoneHitBoss: function(boss, stone){
        stone.kill();
        boss.takeDamage(boss.health + 20);
        this.addExplosion(boss.x, boss.y);
        this.addExplosion(boss.x + 80, boss.y);
        this.addExplosion(boss.x + 40, boss.y + 40);
    },

    stoneHitPlatform: function(platform, stone){
        var explosion = crashStones.getFirstExists(false);
        explosion.reset(platform.x + 30, platform.y );
        explosion.play('kaboom', 30, false, true);
        boom_sound.play();

        stone.kill();

        if(flags['winState'] && game.global.level == 5){
            flags['playedA'] = true;
            platforms.goDown();
        }

    },

    playerHitBat: function(player, bat){
        player.hitPlayer(bat);
    },

    playerHitPlatform: function(player, platform){
        if(platform.fire.visible && !flags['winState']){
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
        boss.takeDamage(0);
    },

    playerHitStone: function(player, stone){
        player.hitPlayer(stone);
        stone.kill();
    },

    bossHitPlayer: function(player, boss){
        player.hitPlayer(boss);
    },

    addExplosion: function(x, y){
        var explosion = explosions.getFirstExists(false);
        explosion.reset(x, y);
        explosion.play('kaboom', 30, false, true);
        boom_sound.play();
    },

    setAbility: function(player, item){
        items.takeItem();
    },
    

    render: function() {

//textb.text =  bats.children[0].x + '\n' + bats.children[0].y;

//text.text = platforms.array[0].y;
//game.debug.body(platforms.array[0]);
//game.debug.body(bridge);
    },

    restart: function() {
//        sound_backgroud.stop();

        if (player.alive){
            game.global.level++;
            gui.addLevelScore();
        }
        else{
            game.global.lives = 3;
            gui.restartScore();
            game.global.health = 100;
        }

        boss.kill();
        walls[0].setAlive(false);

        if(items)
            items.destroy();
        items = null;

        stones.reset();
        
        winImage.visible = false;
        endImage.visible = false;
        loseImage.visible = false;

        game.global.is_playing = false;

        this.restartFlags();

        if(game.global.level == 6){
            ScormProcessSetValue("cmi.core.score.min", 0.0000);
            ScormProcessSetValue("cmi.core.score.max", 100.0000);
            ScormProcessSetValue("cmi.core.score.raw", 100);
            if( ScormProcessGetValue("cmi.comments") < gui.scoreText.score )
                ScormProcessSetValue("cmi.comments", gui.scoreText.score);

            game.global.level = 1;
        }

        game.state.start('levels', false);
        

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
