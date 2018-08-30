class Controls {
    constructor() {
        // declare keys
        this.leftPressed = false;
        this.upPressed = false;
        this.rightPressed = false;
        this.downPressed = false;

        // key codes
        this.leftKey = 37;
        this.upKey = 38;
        this.rightKey = 39;
        this.downKey = 40;
        this.pauseKey = 80;         // p
        this.restartResumeKey = 82; // r
        this.startKey = 83;         // s
    }
}

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
    else if((gameState === gameStates.GAME_WON || gameState === gameStates.GAME_LOST) &&
            e.keyCode === controls.restartResumeKey) {
        startNewGame();
    }
    else if(gameState === gameStates.NEW_GAME && e.keyCode === controls.startKey) {
        gameState = gameStates.STARTING;
    }
    else if(gameState === gameStates.RUNNING && e.keyCode === controls.pauseKey) {
        gameState = gameStates.PAUSED;
    }
    else if(gameState === gameStates.PAUSED && e.keyCode === controls.restartResumeKey) {
        gameState = gameStates.RUNNING;
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