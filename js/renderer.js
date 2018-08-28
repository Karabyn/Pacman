function drawPacman() {
    ctx.beginPath();
    // bottom middle
    ctx.arc(pacman.x, pacman.y, pacman.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = pacman.color;
    ctx.fill();
    ctx.closePath();
}

function drawBlinky() {
    ctx.beginPath();
    ctx.arc(blinky.x, blinky.y, blinky.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function drawPinky() {
    ctx.beginPath();
    ctx.arc(pinky.x, pinky.y, pinky.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = "pink";
    ctx.fill();
    ctx.closePath();
}

function drawInky() {
    ctx.beginPath();
    ctx.arc(inky.x, inky.y, inky.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = "cyan";
    ctx.fill();
    ctx.closePath();
}

function drawClyde() {
    ctx.beginPath();
    ctx.arc(clyde.x, clyde.y, clyde.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = "orange";
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score, 10, 525);
}