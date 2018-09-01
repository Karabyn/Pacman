class Renderer {

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
    }

    drawPacman(pacman) {
        this.ctx.beginPath();
        this.ctx.arc(pacman.x, pacman.y, pacman.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = pacman.color;
        this.ctx.fill();
        this.ctx.closePath();
    }

    drawGhost(ghost, chasingMode) {
        this.ctx.beginPath();
        this.ctx.arc(ghost.x, ghost.y, ghost.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = chasingMode ? "LightBlue" : ghost.color;
        this.ctx.fill();
        this.ctx.closePath();
    }

    drawScore(score) {
        this.ctx.font = "20px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("Score: " + score, 10, 525);
    }

    drawLives(lives) {
        this.ctx.font = "20px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("Lives: " + lives, 125, 525);
    }

    showGameOverScreen(score) {
        this.ctx.save();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.textAlign="center";
        this.ctx.fillStyle = "yellow";
        this.ctx.font = "26px Helvetica";
        const gameWidth = this.canvas.width;
        const gameHeight = this.canvas.height - 30;
        this.ctx.fillText("GAME OVER!", gameWidth / 2, gameHeight / 2);
        this.ctx.font = "16px Helvetica";
        const topMargin = 25;
        this.ctx.fillText("Your score: " + score, gameWidth / 2, gameHeight / 2 + topMargin);
        this.ctx.fillText("Press 'R' to play again", gameWidth / 2, gameHeight / 2 + topMargin * 2);
        this.ctx.restore();
    }

    showWinScreen(score) {
        this.ctx.save();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.textAlign="center";
        this.ctx.fillStyle = "yellow";
        this.ctx.font = "26px Helvetica";
        const gameWidth = this.canvas.width;
        const gameHeight = this.canvas.height - 30;
        this.ctx.fillText("YOU WIN!", gameWidth / 2, gameHeight / 2);
        this.ctx.font = "16px Helvetica";
        const topMargin = 25;
        this.ctx.fillText("Your score: " + score, gameWidth / 2, gameHeight / 2 + topMargin);
        this.ctx.fillText("Press 'R' to play again", gameWidth / 2, gameHeight / 2 + topMargin * 2);
        this.ctx.restore();
    }

    showNewGameScreen() {
        this.ctx.save();
        this.ctx.textAlign="center";
        this.ctx.fillStyle = "yellow";
        this.ctx.font = "26px Helvetica";
        const gameWidth = this.canvas.width;
        const gameHeight = this.canvas.height - 30;
        this.ctx.fillText("Press 's' to start a game", gameWidth / 2, gameHeight / 2);
        this.ctx.restore();
    }

    showCountDown(n) {
        this.ctx.save();
        this.ctx.clearRect(0, this.canvas.height - 30, this.canvas.width, this.canvas.height);
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = "yellow";
        this.ctx.font = "20px Helvetica";
        this.ctx.fillText("Game starts in " + n, this.canvas.width / 2, this.canvas.height - 5);
        this.ctx.restore();
    }

    showPausedMessage() {
        this.ctx.save();
        this.ctx.clearRect(0, this.canvas.height - 30, this.canvas.width, this.canvas.height);
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = "yellow";
        this.ctx.font = "20px Helvetica";
        this.ctx.fillText("Press 'r' to resume", this.canvas.width / 2, this.canvas.height - 5);
        this.ctx.restore();
    }

}