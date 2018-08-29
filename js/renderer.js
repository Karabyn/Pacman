function drawPacman() {
    ctx.beginPath();
    ctx.arc(pacman.x, pacman.y, pacman.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = pacman.color;
    ctx.fill();
    ctx.closePath();
}

function drawGhost(ghost) {
    ctx.beginPath();
    ctx.arc(ghost.x, ghost.y, ghost.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = ghost.color;
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score, 10, 525);
}

function drawLives() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Lives: " + pacman.lives, 125, 525);
}

function showGameOverScreen() {
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign="center";
    ctx.fillStyle = "yellow";
    ctx.font = "26px Helvetica";
    ctx.fillText("GAME OVER!", map.width / 2, map.height / 2);
    ctx.font = "16px Helvetica";
    const topMargin = 25;
    ctx.fillText("Your score: " + score, map.width / 2, map.height / 2 + topMargin);
    ctx.fillText("Press 'R' to play again", map.width / 2, map.height / 2 + topMargin * 2);
    ctx.restore();
}

function showWinScreen() {
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign="center";
    ctx.fillStyle = "yellow";
    ctx.font = "26px Helvetica";
    ctx.fillText("YOU WIN!", map.width / 2, map.height / 2);
    ctx.font = "16px Helvetica";
    const topMargin = 25;
    ctx.fillText("Your score: " + score, map.width / 2, map.height / 2 + topMargin);
    ctx.fillText("Press 'R' to play again", map.width / 2, map.height / 2 + topMargin * 2);
    ctx.restore();
}

function showNewGameScreen() {
    ctx.save();
    ctx.textAlign="center";
    ctx.fillStyle = "yellow";
    ctx.font = "26px Helvetica";
    ctx.fillText("Press 's' to start a game", map.width / 2, map.height / 2);
    ctx.restore();
}

function showCountDown(n) {
    ctx.save();
    ctx.clearRect(0, canvasHeight - 30, canvasWidth, canvasHeight);
    ctx.textAlign = "center";
    ctx.fillStyle = "yellow";
    ctx.font = "20px Helvetica";
    ctx.fillText("Game starts in " + n, canvasWidth / 2, canvasHeight - 5);
    ctx.restore();
}