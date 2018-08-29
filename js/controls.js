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
        this.restartKey = 82;
        this.startKey = 83;
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
            e.keyCode === controls.restartKey) {
        startNewGame();
    }
    else if(gameState === gameStates.NEW_GAME && e.keyCode === controls.startKey) {
        gameState = gameStates.STARTING;
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