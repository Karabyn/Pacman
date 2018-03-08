// create canvas element
var canvas = document.createElement("canvas");
// define size
canvasWidth = 620;
canvasHeight = 620;
// set attributes for canvas
canvas.setAttribute("width", canvasWidth);
canvas.setAttribute("height", canvasHeight);
// add canvas element inside the body
document.getElementsByTagName("body")[0].appendChild(canvas);

// store the 2D rendering context
var ctx = canvas.getContext("2d");

pacmanRadius = 20;
// define pacman starting coordinates
var x = canvasWidth/2;
var y = canvasHeight - pacmanRadius;
// numerical coordinate values for pacman movement on x and y axis
var dx = 2;
var dy = 2;

// food definitions
var foodRowCount = 14;
var foodColumnCount = 14;
var foodRadius = 4;
var foodPadding = 35;
var foodOffsetTop = 50;
var foodOffsetLeft = 50;

// generate food elements
var foodElements = [];
for(c=0; c<foodColumnCount; c++) {
    foodElements[c] = [];
    for(r=0; r<foodRowCount; r++) {
        foodElements[c][r] = { x: 0, y: 0, status: 1 };
    }
}

var score = 0;

// Music
var backgroundMusic = new sound("music/backgroundSong.mp3");

// GAME CONTROLS

// declare keys
var leftPressed = false;
var upPressed = false;
var rightPressed = false;
var downPressed = false;

// key codes
var leftKey = 37;
var upKey = 38;
var rightKey = 39;
var downKey = 40;

// add event listeners for arrow keys
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == leftKey) {
        leftPressed = true;
    }
    else if(e.keyCode == upKey) {
        upPressed = true;
    }
    else if(e.keyCode == rightKey) {
        rightPressed = true;
    }
    else if(e.keyCode == downKey) {
        downPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == leftKey) {
        leftPressed = false;
    }
    else if(e.keyCode == upKey) {
        upPressed = false;
    }
    else if(e.keyCode == rightKey) {
        rightPressed = false;
    }
    else if(e.keyCode == downKey) {
        downPressed = false;
    }
}

// detect collision between pacman and food elements
function collisionDetection() {
    for(c=0; c<foodColumnCount; c++) {
        for(r=0; r<foodRowCount; r++) {
            var foodElement = foodElements[c][r];
            if(foodElement.status == 1) {
                //check if the food element is fully inside the pacman circumference
                if(x + pacmanRadius > foodElement.x + foodRadius && x - pacmanRadius < foodElement.x + foodRadius  &&
                    y + pacmanRadius > foodElement.y + foodRadius && y - pacmanRadius < foodElement.y + foodRadius) {
                    foodElement.status = 0;
                    var eatingSound = new sound("music/eating.mp3");
                    eatingSound.play();
                    score += 10;
                }
            }
        }
    }
}

function drawPacman() {
    ctx.beginPath();
    // bottom middle
    ctx.arc(x, y, pacmanRadius, 0, Math.PI * 2, false);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
}

function drawFood() {
    for(c=0; c<foodColumnCount; c++) {
        for(r=0; r<foodRowCount; r++) {
            if(foodElements[c][r].status == 1) {
                var foodX = (c*(foodRadius+foodPadding))+foodOffsetLeft;
                var foodY = (r*(foodRadius+foodPadding))+foodOffsetTop;
                foodElements[c][r].x = foodX;
                foodElements[c][r].y = foodY;
                ctx.beginPath();
                ctx.arc(foodX, foodY, foodRadius, 0, Math.PI * 2, false);
                ctx.fillStyle = "orange";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function drawScore() {
    ctx.font = "18px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Score: "+ score, 8, 20);
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPacman();
    drawFood();
    drawScore();

    collisionDetection();

    // movement
    if(rightPressed) {
        x += dx;
    }
    else if(leftPressed) {
        x -= dx;
    }
    else if(upPressed) {
        y -= dy;
    }
    else if(downPressed) {
        y += dy;
    }

    requestAnimationFrame(draw);
}

backgroundMusic.play();
draw();