

function addEquation(){
	var equation = game.add.text(500, 50, '5', 
		{ font: '34px ferney', fill: '#fff', align: "center" });
	equation.anchor.set(0.5);
	equation.position.setTo(400, 50);

	equation.answer = 5;
	equation.numberOfEquations = 2;


	equation.reset = resetEquation;
	equation.setAlive = equationSetAlive;

	return equation;
}


function resetEquation(){
	this.numberOfEquations = 1 + game.global.level;
}

function equationSetAlive(value){
	if(value){
		this.revive();
    	this.reset();
	}
	else{
		this.kill();
	}
}
