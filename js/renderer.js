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