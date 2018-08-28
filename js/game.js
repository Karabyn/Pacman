// create canvas element
const canvas = document.createElement("canvas");
// define size
const canvasWidth = 500;
const canvasHeight = 530;
// set attributes for canvas
canvas.setAttribute("width", canvasWidth);
canvas.setAttribute("height", canvasHeight);
// add canvas element inside the body
document.getElementsByTagName("body")[0].appendChild(canvas);

// store the 2D rendering context
const ctx = canvas.getContext("2d");

const map = new GameMap();

const pacman = new Pacman(map);
const blinky = new Ghost(map);
const pinky = new Ghost(map);
const inky = new Ghost(map);
const clyde = new Ghost(map);

const food = new Food();


let score = 0;
// Music
const audioPlayer = new AudioPlayer();
// GAME CONTROLS
const controls = new Controls();

// add event listeners for arrow keys
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.keyCode === controls.leftKey) {
        controls.leftPressed = true;
    }
    else if(e.keyCode === controls.upKey) {
        controls.upPressed = true;
    }
    else if(e.keyCode === controls.rightKey) {
        controls.rightPressed = true;
    }
    else if(e.keyCode === controls.downKey) {
        controls.downPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode === controls.leftKey) {
        controls.leftPressed = false;
    }
    else if(e.keyCode === controls.upKey) {
        controls.upPressed = false;
    }
    else if(e.keyCode === controls.rightKey) {
        controls.rightPressed = false;
    }
    else if(e.keyCode === controls.downKey) {
        controls.downPressed = false;
    }
}

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    map.drawMap(ctx);
    //drawCoordinateGrid(ctx);

    //drawFood();
    //drawMap();
    drawScore();

    //collisionDetection();

    // pacman next movement
    if(controls.rightPressed && !pacman.currentDir.RIGHT) {
        pacman.nextDir = Pacman.initialDir();
        pacman.nextDir.RIGHT = true;
    }
    else if(controls.leftPressed && !pacman.currentDir.LEFT) {
        pacman.nextDir = Pacman.initialDir();
        pacman.nextDir.LEFT = true;
    }
    else if(controls.upPressed && !pacman.currentDir.UP) {
        pacman.nextDir = Pacman.initialDir();
        pacman.nextDir.UP = true;
    }
    else if(controls.downPressed && !pacman.currentDir.DOWN) {
        pacman.nextDir = Pacman.initialDir();
        pacman.nextDir.DOWN = true;
    }

    pacman.move();
    blinky.move();
    pinky.move();
    inky.move();
    clyde.move();

    drawPacman();
    drawBlinky();
    drawPinky();
    drawInky();
    drawClyde();

    requestAnimationFrame(draw);

}

draw();