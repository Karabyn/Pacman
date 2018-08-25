// create canvas element
const canvas = document.createElement("canvas");
// define size
const canvasWidth = 520;
const canvasHeight = 520;
// set attributes for canvas
canvas.setAttribute("width", canvasWidth);
canvas.setAttribute("height", canvasHeight);
// add canvas element inside the body
document.getElementsByTagName("body")[0].appendChild(canvas);

// store the 2D rendering context
const ctx = canvas.getContext("2d");



const map = new GameMap();

const pacman = new Pacman();
const food = new Food();


let score = 0;
// Music
const backgroundMusic = new Sound("sound/backgroundSong.mp3");
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

// detect collision between pacman and food elements
function collisionDetection() {
    for(c = 0; c < food.columnCount; c++) {
        for(r = 0; r < food.rowCount; r++) {
            const foodElement = food.elements[c][r];
            if(foodElement.status === 1) {
                //check if the food element is fully inside the pacman circumference
                if(pacman.x + pacman.radius > foodElement.x + food.radius &&
                    pacman.x - pacman.radius < foodElement.x + food.radius  &&
                    pacman.y + pacman.radius > foodElement.y + food.radius &&
                    pacman.y - pacman.radius < foodElement.y + food.radius) {
                    foodElement.status = 0;
                    const eatingSound = new Sound("sound/eating.mp3");
                    eatingSound.play();
                    score += 10;
                }
            }
        }
    }
}


function draw() {


    ctx.clearRect(0, 0, canvas.width, canvas.height);

    map.drawMap(ctx);

    drawPacman();
    drawCoordinateGrid(ctx);

    //drawFood();
    //drawMap();
    //drawScore();

    collisionDetection();

    // movement
    if(controls.rightPressed) {
        pacman.moveRight();
    }
    else if(controls.leftPressed) {
        pacman.moveLeft();
    }
    else if(controls.upPressed) {
        pacman.moveUp();
    }
    else if(controls.downPressed) {
        pacman.moveDown();
    }

    requestAnimationFrame(draw);
}


//backgroundMusic.play();
draw();