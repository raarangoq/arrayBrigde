

function addEquation(){
	var equation = game.add.text(500, 50, '5', 
		{ font: '34px ferney', fill: '#fff', align: "center", stroke: '#000000', strokeThickness: 3 });
	equation.anchor.set(0.5);
	equation.position.setTo(400, 50);

	equation.answers = [];
	equation.answers[1] = [2, 6];
	equation.answers[2] = [8, 6, 2];
	equation.answers[3] = [1, 7, 9, 3];
	equation.answers[4] = [4, 2, 6, 8, 4];
	equation.answers[5] = [8, 6, 2, 4, 8, 6];
	equation.ai = [3, 2, 7, 8, 2];
	equation.x0 = [4, 9, 3, 3, 9];

	equation.answer = 5;
	equation.numberOfEquations = 2;
	equation.index = 0;

	equation.nextAnswer = nextAnswer;
	equation.firstAnswer = firstAnswer;

	equation.setAlive = equationSetAlive;

	return equation;
}

function firstAnswer(){
	this.answer = this.answers[game.global.level][0];
	this.index = 0;
	this.text = this.answer;
	gui.pause_menu.setPrincipalPage();
}

function nextAnswer(){
	this.index++;
	this.answer = this.answers[game.global.level][this.index];
	this.text = this.answer;
	gui.pause_menu.setPrincipalPage();
}

function equationSetAlive(value){
	if(value){
		this.revive();
		this.numberOfEquations = 1 + game.global.level;
		this.index = 0;
		gui.pause_menu.setPrincipalPage();
	}
	else{
		this.kill();
	}
}
