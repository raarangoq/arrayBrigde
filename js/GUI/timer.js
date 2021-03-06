
function addTimer(){

    var timer = game.add.text(400, 10, 'Tiempo restante: ', { font: '34px ferney', fill: '#fff' });
    timer.stroke = '#000000';
    timer.strokeThickness = 6;
    timer.timerString = 'Tiempo restante: ';
    timer.initLevelTime = game.time.now;
    timer.levelTime = 15000;

    timer.timeLastEquation = game.time.now;

    timer.counter = 0;

    timer.sound = game.add.audio('warning', 1, true);

    timer.setDrawOrder = timerSetDrawOrder;
    timer.setAlive = timerSetAlive;
    timer.restart = restartTimer;
    timer.update = updateTimer;

    return timer;
}


function updateTimer(){
    if(game.physics.arcade.isPaused || 
        game.global.lives <= 0 ||
        game.global.level > 5 || 
        flags['winState'] || 
        !game.global.is_playing)
    return;

    if(this.counter >= gui.equation.numberOfEquations){
        if(this.alive){
            this.setAlive(false);
        }
        if(game.time.now - this.timeLastEquation >= 4000 ){
            player.setWinState();
            this.restart();
        }
    }


    this.text = this.timerString;

    var time = Math.floor((this.levelTime - (game.time.now - this.initLevelTime)) / 1000);
    if(time <= 3 && !this.sound.isPlaying){
        this.sound.play();
        this.fill = '#FF0000';
    }

    if(time > 0){
    	this.text += time;
    }
    else{
    	this.text += '0';
        this.counter++;
        stones.dropStone();
        if(this.counter >= gui.equation.numberOfEquations)
            this.timeLastEquation = game.time.now;
        else{
            gui.equation.nextAnswer();
            
        }
        this.fill = '#FFFFFF';
    	this.sound.stop();

        this.initLevelTime = game.time.now;
    }
}

function timerSetDrawOrder(){
	this.bringToTop();
}

function timerSetAlive(value){
    if (value){
        this.revive();
        this.restart();
    }
    else {
        this.kill();
    }
}

function restartTimer(){
    this.initLevelTime = game.time.now;
    this.counter = 0;
    gui.equation.firstAnswer();
}