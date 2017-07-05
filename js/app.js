// Enemies our player must avoid
// in this file we have to create a render methods for player and enemies

function Enemy (speed , sprite , posX , posY , dir) {
    this.speed = speed;
    this.sprite = sprite;
    this.posX = posX;
    this.posY = posY;
    this.dir = dir;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    var width = 500;
    this.posX = this.posX + this.speed * this.dir;
    this.posX = this.posX%width;
    if(this.posX < -4){
        this.posX = this.posX + width;
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.posX, this.posY);
};

// Now write your own player class
function player (sprite , posX , posY) {
    this.sprite = sprite;
    this.posX = posX;
    this.posY = posY;
    this.xDir = 0;
    this.yDir = 0;    
}

// This class requires an update(), render() and a handleInput() method.

player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite) , this.posX , this.posY);
}

player.prototype.update = function(){
    //complete this method to update the player class
    var width = 500;
    var sp = 0.5;
    this.posX = this.posX + this.xDir*sp;
    if((this.posX < -50)&&(this.xDir == -1)){
        this.posX = this.posX + width;
    } else if((this.posX > width)&&(this.xDir == 1)){
        this.posX = this.posX%width;
    }
    this.posY = this.posY + this.yDir*sp;
    if((this.posY < -50)&&(this.yDir == -1)){
        this.posY = this.posY + width;
    } else if((this.posY > width) && (this.yDir == 1)){
        this.posY = this.posY%width;
    }
    //console.log(this.x , this.y , this.xd , this.yd)
}


player.prototype.handleInput = function(key){
//left right up down corresponds to 1 2 3 4
    if(key == 'left'){
        this.xDir = -1;
        this.yDir = 0;
    } else if(key == 'right'){
        this.xDir = 1;
        this.yDir = 0;
    } else if(key == 'up'){
        this.xDir = 0;
        this.yDir = -1;
    } else if(key == 'down'){
        this.xDir = 0;
        this.yDir = 1;
    } else {
        this.xDir = 0;
        this.yDir = 0;
    }
}

// Now instantiate your objects.
var enemy1 = new Enemy(1 , 'images/enemy-bug.png' , 0 , 60 , 1);
var enemy2 = new Enemy(0.4 , 'images/enemy-bug.png' , 0 , 150 , -1);
var enemy3 = new Enemy(0.7 , 'images/enemy-bug.png' , 0 , 230 , 1);

// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1 , enemy2 , enemy3];

// Place the player object in a variable called player
var player = new player('images/char-boy.png', 0 , 400)

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    // !- e gives the keyboard event -!    
    //create a handleInput method that depending on the key typed will respond 
    //accordingly
    player.handleInput(allowedKeys[e.keyCode]);
});


checkCollisions = function(){
    
    allEnemies.forEach(function(enemy) {
        //enemy.update(dt);
        var delX = enemy.posX - player.posX;
        var delY = enemy.posY - player.posY;

        if(delX < 0)
            delX = -delX;
        if(delY < 0)
            delY = -delY;

        if((delX < 70) && (delY < 70)){
            var time = new Date().getTime() + 2000;
            while(time > new Date().getTime() ){
                //this while loop causes a delay
            }
           //resetting the player position
           player.posX = 400;
           player.posY = 400;
           player.xDir = 0;
           player.yDir = 0;
            
        }
    });
}