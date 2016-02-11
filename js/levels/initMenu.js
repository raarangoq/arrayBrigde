var image;

var background;
var player;

var flags = [];

var walls = [];
var platforms = [];
var bridge;
var door;
var stones;
var crashStones;
var bats;
var boss;


var explosions;

var gui;
var score;

var sky;

var winImage;
var loseImage;
var endImage;

var medusa;
var medusa_sound;
var linkfail;

var texta;

initMenu = {
	create: function(){

		image = game.add.sprite(0, 0, 'initmenu');
		game.global.is_playing = false;

		this.addFlags();
		
		sky = game.add.sprite(0, 0, 'video');
		sky.kill();

		// GameObjects ever in game
		background = game.add.tileSprite(0, 0, 800, 600, 'background');
		background.kill();
	    //game.stage.backgroundColor = '#aaaaaa';

	    

	    bridge = game.add.sprite(0, 270, 'bridge');
	    game.physics.enable(bridge, Phaser.Physics.ARCADE);
	    bridge.body.setSize(800, 320, 0, 35);
		bridge.body.immovable = true;
	    bridge.kill();

	   	addPlatforms();
	   	platforms.setAlive(false);
	  
	   	walls[0] = addWall(75);
	   	walls[1] = addWall(665);
	    walls[0].setAlive(false);
	    walls[1].setAlive(false);

	    addPlayer();
	    player.kill();

	    addStones();
	    stones.callAll('kill');

	    crashStones = game.add.group();
	    crashStones.createMultiple(9, 'boomStone');
	    crashStones.forEach(this.setupExplosion, this);

	    addBats();
	    bats.callAll('kill');

	    addBoss();
	    boss.kill();


	    //  An explosion pool
	    explosions = game.add.group();
	    explosions.createMultiple(15, 'kaboom');
	    explosions.forEach(this.setupExplosion, this);

//text = game.add.text(20, 540, 'Cargando...', { fontSize: '16px', fill: '#ffffff'});
//textb = game.add.text(20, 200, 'Cargando...', { fontSize: '16px', fill: '#ffffff'});

	    sound_backgroud = game.add.audio('levelB', 0.5, true);
	    boom_sound = game.add.audio('boom', 0.5);

	    dialog = game.add.sprite(230, 300, 'dialog');
	    dialog.scale.setTo(1.2, 1.2);
	    dialog.kill();

	    texta = game.add.text(dialog.x + dialog.width / 2, dialog.y + dialog.height / 2, '', 
			{ font: "12pt ferney", fill: '#fff', stroke:  '#000000', strokeThickness: 3,
			wordWrap: true, wordWrapWidth: dialog.width, align: "center"});
	    texta.anchor.set(0.5);
	    texta.kill();

	    this.addLink();

	    gui = new GUI();
	    gui.setAlive(false);	

	},

	addFlags: function(){
		flags['winAnimationPointA'] = false;
		flags['winAnimationPointB'] = false;
		flags['timeOut'] = false;
        flags['playedA'] = false;
        flags['playedB'] = false;
        flags['playedC'] = false;
        flags['playedD'] = false;
        flags['playedE'] = false;
        flags['playedF'] = false;

	},
	
	// Establecer la explosión
    setupExplosion: function(explosion) {
        explosion.anchor.x = 0.5;
        explosion.anchor.y = 0.5;
        explosion.animations.add('kaboom', null, 5);
    },

	update: function(){
		if(keyboard.enterKey()){
			image.destroy();
			
			//game.state.start('levels', false);
			game.state.start('introVideo', false);
		}
	},

	addLink: function(){
		link = game.add.sprite(1000, 600, 'link');
		link.scale.setTo(1.5, 1.5);
		link.animations.add('go', [0, 1, 2, 3], 10, true);
		link.kill();

		linkfail = game.add.sprite(550, 350, 'linkfail');
		linkfail.animations.add('fly', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);
		game.physics.enable(linkfail, Phaser.Physics.ARCADE);
		linkfail.scale.setTo(0.2, 0.2);
		linkfail.hit_sound = game.add.audio('hit');
		linkfail.scream_sound = game.add.audio('scream', true);
		linkfail.kill();

	    winImage = game.add.sprite(0, 0, 'win');
	    winImage.visible = false;

	    loseImage = game.add.sprite(0, 0, 'lose');
	    loseImage.visible = false;

	    endImage = game.add.sprite(0, 0, 'end');
	    endImage.visible = false;
	    var text = game.add.text(400, 200, 'GANASTE!!!!\nHaz resuelto todas las ecuaciones, lástima que no lograras escapar a tiempo.',
		{ font: "24pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3,
			wordWrap: true, wordWrapWidth: 600, align: 'center'});
		text.anchor.setTo(0.5, 0.5);
		endImage.addChild(text);
	    text = game.add.text(400, 500, 'Presiona ENTER para volver a jugar.',
		{ font: "16pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3,
			wordWrap: true, wordWrapWidth: 600, align: 'center'});
		text.anchor.setTo(0.5, 0.5);
		endImage.addChild(text);
	},
}