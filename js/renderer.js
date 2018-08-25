function drawPacman() {
    ctx.beginPath();
    // bottom middle
    ctx.arc(pacman.x, pacman.y, pacman.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = pacman.color;
    ctx.fill();
    ctx.closePath();
}

//TODO: remove
function drawFood() {
    for(let c = 0; c < food.columnCount; c++) {
        for(let r=0; r < food.rowCount; r++) {
            if(food.elements[c][r].status === 1) {
                var foodX = (c * (food.radius + food.padding)) + food.offsetLeft;
                var foodY = (r * (food.radius + food.padding)) + food.offsetTop;
                food.elements[c][r].x = foodX;
                food.elements[c][r].y = foodY;
                ctx.beginPath();
                ctx.arc(foodX, foodY, food.radius, 0, Math.PI * 2, false);
                ctx.fillStyle = food.color;
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function drawScore() {
    ctx.font = "18px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score, 8, 20);
}