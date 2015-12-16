
var stone;

function addStones(){
	stones = game.add.group();
    stones.enableBody = true;
    stones.physicsBodyType = Phaser.Physics.ARCADE;
    stones.createMultiple(9, 'stone');
    stones.setAll('anchor.x', 0.5);
    stones.setAll('anchor.y', 0.5);
    stones.setAll('outOfBoundsKill', true);
    stones.setAll('checkWorldBounds', true);


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
        if(i == gui.equation.answer - 1)
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

