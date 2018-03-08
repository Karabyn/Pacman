// create canvas element
var canvas = document.createElement("canvas");
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

var dx = 2;
var dy = 2;

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


function drawPacman() {
    ctx.beginPath();
    // bottom middle
    ctx.arc(x, y, pacmanRadius, 0, Math.PI * 2, false);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

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

    drawPacman();

    requestAnimationFrame(draw);
}

draw();