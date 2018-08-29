const canvasWidth = 500;
const canvasHeight = 530;
const canvas = createGameCanvas();
// store the 2D rendering context
const ctx = canvas.getContext("2d");
// Game map
const map = new GameMap();
// Moving agents
const pacman = new Pacman(map);
const blinky = new Ghost(map, "blinky");
const pinky = new Ghost(map, "pinky");
const inky = new Ghost(map, "inky");
const clyde = new Ghost(map, "clyde");
const ghosts = [blinky, pinky, inky, clyde];
// Game score
let score = 0;
// Music
const audioPlayer = new AudioPlayer();
// Game controls
const controls = new Controls();

const gameStates = {
    NEW_GAME  : 1,
    STARTING  : 2,
    RUNNING   : 3,
    GAME_WON  : 4,
    GAME_LOST : 5
};

let gameState = gameStates.NEW_GAME;

// add event listeners for arrow keys
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function createGameCanvas() {
    // create canvas element
    const canvas = document.createElement("canvas");
    // set attributes for canvas
    canvas.setAttribute("width", canvasWidth);
    canvas.setAttribute("height", canvasHeight);
    // add canvas element inside the body
    document.getElementsByTagName("body")[0].appendChild(canvas);
    return canvas;
}

function startNewGame() {
    gameState = gameStates.STARTING;
    score = 0;
    map.reset();
    pacman.reset();
    for (let ghost of ghosts) {
        ghost.reset();
    }
}

function activeGameLoop() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    map.drawMap(ctx);

    drawScore();
    drawLives();

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

    drawPacman();
    for(let ghost of ghosts) {
        drawGhost(ghost);
    }

    if (Collider.pacmanGhostCollision(pacman, ghosts)) {
        audioPlayer.dieSound.play();
        sleep(2000);
        pacman.die();
        for(let ghost of ghosts) {
            ghost.reset();
        }
    }
}

async function mainGameLoop() {
    if (gameState === gameStates.NEW_GAME) {
        showNewGameScreen();
    }
    else if (gameState === gameStates.STARTING) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        map.drawMap(ctx);
        drawPacman();
        for(let ghost of ghosts) {
            drawGhost(ghost);
        }
        showCountDown(3);
        await asyncSleep(1000);

        showCountDown(2);
        await asyncSleep(1000);
        showCountDown(1);
        await asyncSleep(1000);
        gameState = gameStates.RUNNING;
    }
    else if (!map.hasFoodElements) {
        sleep(2000);
        gameState = gameStates.GAME_WON;
        showWinScreen();
    }
    else if (pacman.lives < 0) {
        gameState = gameStates.GAME_LOST;
        showGameOverScreen();
    } else {
        gameState = gameStates.RUNNING;
        activeGameLoop();
    }
    requestAnimationFrame(mainGameLoop);
}

mainGameLoop();