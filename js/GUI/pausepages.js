function addPausePage0(){
	var page = game.add.text(400, 150, 'Level ' + game.global.level,
		{ font: "24pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 4,
		wordWrap: true, wordWrapWidth: 600, align: 'center'});
	page.anchor.setTo(0.5, 0.5);

	var text = game.add.text(0, 50, 'Ecuación 1 de 2',
		{ font: "18pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3,
		wordWrap: true, wordWrapWidth: 600, align: 'center'});
	text.anchor.setTo(0.5, 0.5);
	page.addChild(text);

	text = game.add.text(0, 150, 'F(X){\nseguro = 3 * 4 % 10; \nF(seguro); \n }',
		{ font: "18pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3,
		wordWrap: true, wordWrapWidth: 600});
	text.anchor.setTo(0.5, 0.5);
	page.addChild(text);

	text = game.add.text (0, 300, 
		'Resuelve la ecuación antes de que se agote el tiempo para saber donde pararte y evitar la lluvia de fuego.',
		{ font: "16pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3,
		wordWrap: true, wordWrapWidth: 600, align: 'center'});
	text.anchor.setTo(0.5, 0.5);
	page.addChild(text);

	page.setAlive = setPageAlive;
	return page;
}


function addPausePage1(){
	var page = game.add.sprite(0, 0, 'input');


	page.setAlive = setPageAlive;

	return page;
}

function addPausePage2(){
	var page = game.add.sprite(100, 100, 'bat');
	page.animations.add('fly', [0, 1, 2, 3, 4, 5, 6, 7], 15, true);
    page.play('fly');
	var text = game.add.text(100, 30, 
		'Murcielago: pequeño bicho volador que inflinge daño leve, pero te incapacita con su golpe.', 
		{ font: "16pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3,
		wordWrap: true, wordWrapWidth: 500});
	page.addChild(text);

	var image = game.add.sprite(0, 100, 'stone');
	image.animations.add('fly', [0, 1, 2, 3, 4, 5, 6, 7, 8], 8, true);
    image.play('fly');
	page.addChild(image);
	text = game.add.text(80, 150, 
		'Roca: Una roca de lava que cae del cielo, te matará con solo tocarte.', 
		{ font: "16pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3, 
		wordWrap: true, wordWrapWidth: 500});
	page.addChild(text);

	image = game.add.sprite(0, 250, 'fire');
	image.animations.add('burn', [0, 1, 2], 8, true);
    image.play('burn');
	page.addChild(image);
	text = game.add.text(80, 280, 
		'Fuego: Infringe daño leve.', 
		{ font: "16pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3,
		wordWrap: true, wordWrapWidth: 500});
	page.addChild(text);

	page.setAlive = setPageAlive;
	return page;
}

function setPageAlive(value){
	if(value){
		this.revive();
	}
	else
		this.kill();
}

function addPausePage3(){
	var page = game.add.sprite(100, 130, 'velocity');
	var text = game.add.text(50, 0, 
		'Velocidad: Te permite moverte mas rápido mientras está activo.', 
		{ font: "16pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3,
		wordWrap: true, wordWrapWidth: 600});
	page.addChild(text);

	var image = game.add.sprite(0, 100, 'shield');
	page.addChild(image);
	text = game.add.text(50, 100, 
		'Escudo: Te proteje de los escorpiones.', 
		{ font: "16pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3, 
		wordWrap: true, wordWrapWidth: 600});
	page.addChild(text);

	image = game.add.sprite(0, 200, 'heart');
	page.addChild(image);
	text = game.add.text(50, 200, 
		'Vida: Dispones de tres vidas, cuando las pierdes, mueres.', 
		{ font: "16pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3,
		wordWrap: true, wordWrapWidth: 600});
	page.addChild(text);

	page.setAlive = setPageAlive;
	return page;
}

function addPausePage4(){
	var page = game.add.sprite(60, 250, 'boss');
	page.animations.add('fly', [0, 1, 2, 3, 4, 5], 8, true);
	page.play('fly');
	var text = game.add.text(200, -50, 
		'Gran calavera: Enorme bestia que infringe daño moderado, muy rápido y elimina cualquier protección que tengas. \nPuedes golpearlo para desviar su ataque.', 
		{ font: "16pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3,
		wordWrap: true, wordWrapWidth: 450});
	page.addChild(text);

	page.setAlive = setPageAlive;
	return page;
}