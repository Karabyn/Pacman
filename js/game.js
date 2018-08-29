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
const blinky = new Ghost(map, "blinky");
const pinky = new Ghost(map, "pinky");
const inky = new Ghost(map, "inky");
const clyde = new Ghost(map, "clyde");
const ghosts = [blinky, pinky, inky, clyde];

const food = new Food();

let score = 0;
// Music
const audioPlayer = new AudioPlayer();

// GAME CONTROLS
const controls = new Controls();

// add event listeners for arrow keys
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


async function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    map.drawMap(ctx);

    drawScore();
    drawLives();

    drawPacman();
    for(let ghost of ghosts) {
        drawGhost(ghost);
    }

    // pacman next movement
    if (controls.rightPressed && !pacman.currentDir.RIGHT) {
        pacman.nextDir = Pacman.initialDir();
        pacman.nextDir.RIGHT = true;
    }
    else if (controls.leftPressed && !pacman.currentDir.LEFT) {
        pacman.nextDir = Pacman.initialDir();
        pacman.nextDir.LEFT = true;
    }
    else if (controls.upPressed && !pacman.currentDir.UP) {
        pacman.nextDir = Pacman.initialDir();
        pacman.nextDir.UP = true;
    }
    else if (controls.downPressed && !pacman.currentDir.DOWN) {
        pacman.nextDir = Pacman.initialDir();
        pacman.nextDir.DOWN = true;
    }

    pacman.move();
    for(let ghost of ghosts) {
        ghost.move();
    }

    if (Collider.pacmanGhostCollision(pacman, ghosts)) {
        audioPlayer.dieSound.play();
        await sleep(2000);
        pacman.die();
        for(let ghost of ghosts) {
            ghost.goHome();
        }
    }

    requestAnimationFrame(draw);

}

draw();