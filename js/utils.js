function drawCoordinateGrid(ctx) {
    const minor = 10;
    const major = minor * 5;
    const stroke = "#00FF00";
    const fill = "#009900";
    ctx.save();
    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;
    for(let x = 0; x < ctx.canvas.width; x += minor) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, ctx.canvas.height);
        ctx.lineWidth = (x % major === 0) ? 0.5 : 0.25;
        ctx.stroke();
        if(x % major === 0 ) {ctx.fillText(x, x, 10);}
    }
    for(let y = 0; y < ctx.canvas.height; y += minor) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(ctx.canvas.width, y);
        ctx.lineWidth = (y % major === 0) ? 0.5 : 0.25;
        ctx.stroke();
        if(y % major === 0 ) {ctx.fillText(y, 0, y + 10);}
    }
    ctx.restore();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function busySleep(ms) {
    const start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > ms){
            break;
        }
    }
}