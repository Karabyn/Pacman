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