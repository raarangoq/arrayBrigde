
var stone;

function createStone(){
    var stone = game.add.sprite(0, 0, 'stone');
    game.physics.enable(stone, Phaser.Physics.ARCADE);
    stone.anchor.setTo(0.5, 0.5);
    stone.outOfBoundsKill = true;
    stone.checkWorldBounds = true;

    stone.animations.add('fly', [0, 1, 2, 3, 4, 5, 6, 7, 8], 8, true);
    stone.play('fly');

    return stone;
}

function addStones(){
	stones = game.add.group();

    for(var i=0; i<9; i++)
        stones.add(createStone());

    stones.damage = 25;
    stones.speed = 300;

    stones.sound = game.add.audio("stone", 0.2);

    stones.dropStone = dropStone;
    stones.update = updateStone;
    stones.reset = resetStones;
}

function dropStone(){
    for(var i=0; i<10; i++){

    	stone = this.getFirstExists(false);
        if(i == gui.equation.answer)
            i++;
        if (stone)
        {
            stone.reset(platforms.array[i].x + platforms.array[i].width / 2, 0);
            stone.body.velocity.y = this.speed;
        }
    }
    this.sound.play();
}

function updateStone(){


}

function resetStones(){
    this.callAll('kill');
}

