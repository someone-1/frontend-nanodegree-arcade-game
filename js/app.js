// Enemies our player must avoid
// in this file we have to create a render methods for player and enemies

var Enemy = class {
    constructor(speed , sprite , x , y){
        this.speed = speed;
        this.sprite = sprite;
        this.x = x;
        this.y = y;
    }
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    this.x = this.x + this.speed;
    this.x = this.x%500;
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var player = class {
    constructor(sprite , x , y){
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.xd = 0;
        this.yd = 0;
    }
}

// This class requires an update(), render() and a handleInput() method.

player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite) , this.x , this.y);
}

player.prototype.update = function(){
    //complete this method to update the player class
    //console.log('player update')
    var sp = 0.5;
    this.x = this.x + this.xd*sp;
    if((this.x < -50)&&(this.xd == -1)){
        this.x = this.x + 500;
    } else if((this.x > 500)&&(this.xd == 1)){
        this.x = this.x%500;
    }

    this.y = this.y + this.yd*sp;
    if((this.y < -50)&&(this.yd == -1)){
        this.y = this.y + 500;
    } else if((this.y > 500) && (this.yd == 1)){
        this.y = this.y%500;
    }
    //console.log(this.x , this.y , this.xd , this.yd)
}


player.prototype.handleInput = function(key){
//left right up down corresponds to 1 2 3 4
    if(key == 'left'){
        this.xd = -1;
        this.yd = 0;
    } else if(key == 'right'){
        this.xd = 1;
        this.yd = 0;
    } else if(key == 'up'){
        this.xd = 0;
        this.yd = -1;
    } else if(key == 'down'){
        this.xd = 0;
        this.yd = 1;
    } else {
        this.xd = 0;
        this.yd = 0;
    }
}

// Now instantiate your objects.
var enemy1 = new Enemy(1 , 'images/enemy-bug.png' , 0 , 60);
var enemy2 = new Enemy(0.4 , 'images/enemy-bug.png' , 0 , 150);
var enemy3 = new Enemy(0.7 , 'images/enemy-bug.png' , 0 , 230);

// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1 , enemy2 , enemy3];

// Place the player object in a variable called player
var player = new player('images/char-boy.png', 400 , 400)

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    console.log(allowedKeys[e.keyCode] , 'sdfa')
    // !- e gives the keyboard event -!    
    //create a handleInput method that depending on the key typed will respond 
    //accordingly
    player.handleInput(allowedKeys[e.keyCode]);
});


checkCollisions = function(){
    allEnemies.forEach(function(enemy) {
        //enemy.update(dt);

        if((enemy.x < player.x + 70) && (enemy.x > player.x - 70)){
            if((enemy.y < player.y + 70) && (enemy.y > player.y - 70)){
               console.log('collission');
               //resetting the player position
               player.x = 400;
               player.y = 400;
            }
        }
    });
    console.log('checking for collisions')
}