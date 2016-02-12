
var stone;

///////////////////////////////
//////// a single stone
///////////////////////////////

function createStone(){
    var stone = game.add.sprite(0, 0, 'stone');
    game.physics.enable(stone, Phaser.Physics.ARCADE);
    stone.anchor.setTo(0.5, 0.5);
    stone.body.setSize(28, 23, 0, 56);
    stone.outOfBoundsKill = true;
    stone.checkWorldBounds = true;

    stone.animations.add('fly', [0, 1, 2, 3, 4, 5, 6, 7, 8], 8, true);
    stone.play('fly');

    return stone;
}

///////////////////////////////////
//// Group of stones
///////////////////////////////////

function addStones(){
	stones = game.add.group();

    for(var i=0; i<9; i++)
        stones.add(createStone());

    stones.damage = 25;
    stones.speed = 300;

    stones.sound = game.add.audio("stone", 0.2);

    stones.dropStone = dropStone;
    stones.dropSingleStone = dropSingleStone;
    stones.update = updateStone;
    stones.reset = resetStones;
    stones.toBoss = stoneToBoss;
    stones.toPlayerBeside = stoneToPlayerBeside;
}

function dropStone(){
    for(var i=0; i<10; i++){
        if(i != gui.equation.answer)
            this.dropSingleStone(platforms.array[i].x + platforms.array[i].width / 2);
    }
    this.sound.play();
}

function updateStone(){


}

function resetStones(){
    this.callAll('kill');
}

function stoneToBoss(){
    this.dropSingleStone(boss.body.x + 50);
}

function stoneToPlayerBeside(){
    this.dropSingleStone(player.body.x - 80);
    this.dropSingleStone(player.body.x + 80);
}

function dropSingleStone(x){
    stone = this.getFirstExists(false);
    if (stone)
    {
        stone.reset(x, 0);
        stone.body.velocity.y = this.speed;
    }
}

