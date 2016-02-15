// Se especifica el tamaño de ventana de 800x600
var game = new Phaser.Game(800, 600, Phaser.AUTO, '');

game.global = {
	level : 2,
	is_playing : false,
	timeInitLevel: 3000,
	lives : 3,
	health : 100
}

game.state.add('boot', boot, true);
game.state.add('loading', loading);

//game.state.add('lose', lose);
//game.state.add('win', win);

game.state.add('initMenu', initMenu);
game.state.add('introVideo', intro_video);

game.state.add('levels', levels);

