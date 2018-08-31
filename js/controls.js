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

        document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
        document.addEventListener("keyup", this.keyUpHandler.bind(this), false);
    }

    keyDownHandler(e) {
        if(e.keyCode === this.leftKey) {
            this.leftPressed = true;
        }
        else if(e.keyCode === this.upKey) {
            this.upPressed = true;
        }
        else if(e.keyCode === this.rightKey) {
            this.rightPressed = true;
        }
        else if(e.keyCode === this.downKey) {
            this.downPressed = true;
        }
        else if((gameState === gameStates.GAME_WON || gameState === gameStates.GAME_LOST) &&
            e.keyCode === this.restartResumeKey) {
            startNewGame();
        }
        else if(gameState === gameStates.NEW_GAME && e.keyCode === this.startKey) {
            gameState = gameStates.STARTING;
        }
        else if(gameState === gameStates.RUNNING && e.keyCode === this.pauseKey) {
            gameState = gameStates.PAUSED;
        }
        else if(gameState === gameStates.PAUSED && e.keyCode === this.restartResumeKey) {
            gameState = gameStates.RUNNING;
        }
    }

    keyUpHandler(e) {
        if(e.keyCode === this.leftKey) {
            this.leftPressed = false;
        }
        else if(e.keyCode === this.upKey) {
            this.upPressed = false;
        }
        else if(e.keyCode === this.rightKey) {
            this.rightPressed = false;
        }
        else if(e.keyCode === this.downKey) {
            this.downPressed = false;
        }
    }

}