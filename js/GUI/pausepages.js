function addPausePage0(){
	var page = game.add.text(400, 150, 'Level ' + game.global.level,
		{ font: "24pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 4,
		wordWrap: true, wordWrapWidth: 600, align: 'center'});
	page.anchor.setTo(0.5, 0.5);

	var text = game.add.text(0, 100, 'Ecuación 1 de 2',
		{ font: "18pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3,
		wordWrap: true, wordWrapWidth: 600, align: 'center'});
	text.anchor.setTo(0.5, 0.5);
	page.addChild(text);

	text = game.add.text (-0, 200, 
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
	var page = game.add.sprite(100, 130, 'bat');
	var text = game.add.text(50, 0, 
		'Murcielago: pequeño bicho volador que inflinge daño leve, pero te incapacita con su golpe.', 
		{ font: "16pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3,
		wordWrap: true, wordWrapWidth: 600});
	page.addChild(text);

	var image = game.add.sprite(0, 50, 'stone');
	image.animations.add('fly', [0, 1, 2, 3, 4, 5, 6, 7, 8], 8, true);
    image.play('fly');
	page.addChild(image);
	text = game.add.text(50, 100, 
		'Roca: Una roca de lava que cae del cielo, te matará con solo tocarte.', 
		{ font: "16pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3, 
		wordWrap: true, wordWrapWidth: 600});
	page.addChild(text);

	image = game.add.sprite(0, 200, 'fire');
	image.animations.add('burn', [0, 1, 2], 8, true);
    image.play('burn');
	page.addChild(image);
	text = game.add.text(50, 230, 
		'Fuego: Infringe daño leve.', 
		{ font: "16pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3,
		wordWrap: true, wordWrapWidth: 600});
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