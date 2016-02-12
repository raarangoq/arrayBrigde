
// Variables para controlar la entrada por teclado
var keyboard;

var text;


loading = {
	preload: function(){

    game.load.image('velocity', 'assets/pics/items/speedItem.png');
    game.load.image('shield', 'assets/pics/items/shield.png');
    game.load.spritesheet('aura', 'assets/pics/aura.png', 64, 64);

    game.load.spritesheet('heart', 'assets/pics/GUI/heart.png', 14, 16);
    

    game.load.image('enemyBar', 'assets/pics/enemys/enemyBar.png');
    game.load.spritesheet('stone', 'assets/pics/enemys/stone.png', 50, 143);
    game.load.spritesheet('bat', 'assets/pics/enemys/bat.png', 67, 91);
    game.load.spritesheet('boss', 'assets/pics/enemys/boss.png', 174, 106);

    game.load.spritesheet('kaboom', 'assets/pics/explode.png', 128, 128);
    game.load.spritesheet('boomStone', 'assets/pics/boomStone.png', 172, 144);

    game.load.spritesheet('player', 'assets/pics/player.png', 70, 70);
    game.load.spritesheet('attack','assets/pics/attackzone.png', 30, 30);
    game.load.spritesheet('spiral','assets/pics/spiral.png', 44, 38);
    game.load.spritesheet('blood', 'assets/pics/blood.png', 83, 69);
  
    game.load.image('background', 'assets/pics/background.png');
    game.load.image('wall', 'assets/pics/levels/wall.png');
    game.load.image('bridge', 'assets/pics/levels/bridge.png');
    game.load.image('platform', 'assets/pics/levels/platform.png');
    

    game.load.spritesheet('fire', 'assets/pics/levels/fire.png', 54, 81);

    game.load.image('end', 'assets/pics/images/end.png');
    game.load.image('initmenu', 'assets/pics/images/initmenu.png');
    game.load.image('lose', 'assets/pics/images/lose.png');
    game.load.image('win', 'assets/pics/images/win.png');
    game.load.spritesheet('linkfail', 'assets/pics/videos/linkfail.png', 145, 175);

    game.load.image('blankpause', 'assets/pics/images/blankpause.png');
    game.load.image('input', 'assets/pics/images/input.png');

    game.load.image('healthBar', 'assets/pics/GUI/healthbar.png');


    game.load.image(        'video',        'assets/pics/videos/video.png');
    game.load.spritesheet(  'link',       'assets/pics/videos/link.png', 148, 150);
    game.load.spritesheet(  'linkfail',   'assets/pics/videos/linkfail.png', 145, 175);
    game.load.image(        'dialog',     'assets/pics/videos/dialog.png');

/***********************************************************/
//              Sounds

	game.load.audio('inicio', 'assets/sounds/inicio.mp3');
    game.load.audio('levelB', 'assets/sounds/levelB.mp3');
    game.load.audio('final', 'assets/sounds/final.mp3');

    game.load.audio('scorpion', 'assets/sounds/nuevo_escorpion.mp3');
    game.load.audio('rugido', 'assets/sounds/rugido.mp3');
    game.load.audio('boss', 'assets/sounds/boss.mp3');
    game.load.audio('creature', 'assets/sounds/creature.mp3');

    game.load.audio('item', 'assets/sounds/item.mp3');
    game.load.audio('bat', 'assets/sounds/bat.mp3');
    game.load.audio('arrow', 'assets/sounds/flecha.mp3');

    game.load.audio('torpedo', 'assets/sounds/torpedo.mp3');
    game.load.audio('hit', 'assets/sounds/golpes.mp3');
    game.load.audio('swordair', 'assets/sounds/espada-aire.mp3');
    game.load.audio('scream', 'assets/sounds/grito.mp3');
    game.load.audio('boom', 'assets/sounds/explosion.mp3');
    game.load.audio('stone', 'assets/sounds/stone.mp3');
    game.load.audio('door', 'assets/sounds/door.mp3');


	},

	
	create: function(){
        addKeyboard();
    },

    update: function(){
        if(game.load.onLoadComplete){
            loadingImage.destroy();
            game.state.start('initMenu');
        }
    },
}
