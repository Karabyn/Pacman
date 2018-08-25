class GameMap {

    constructor() {
        this.width = 500;
        this.height = 500;

        this.margin = 10;
        this.wallWidth = 5;

        this.tileSize = 20;

        this.BLANK = 0;
        this.WALL = 1;
        this.BLOCK = 2;
        this.FOOD = 3;
        this.COOKIE = 4;

        //25 x 25
        this.TILES = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
            [1, 3, 2, 2, 2, 3, 2, 2, 2, 2, 2, 3, 1, 3, 2, 2, 2, 2, 2, 3, 2, 2, 2, 3, 1],
            [1, 3, 2, 2, 2, 3, 2, 2, 2, 2, 2, 3, 1, 3, 2, 2, 2, 2, 2, 3, 2, 2, 2, 3, 1],
            [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
            [1, 3, 2, 2, 2, 3, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 3, 2, 2, 2, 3, 1],
            [1, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 1],
            [1, 1, 1, 1, 1, 3, 2, 2, 2, 2, 2, 3, 2, 3, 2, 2, 2, 2, 2, 3, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 1, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 3, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 3, 1, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 3, 2, 3, 2, 0, 0, 0, 0, 0, 0, 0, 2, 3, 2, 3, 1, 1, 1, 1, 1],
            [3, 3, 3, 3, 3, 3, 3, 3, 2, 0, 0, 0, 0, 0, 0, 0, 2, 3, 3, 3, 3, 3, 3, 3, 3],
            [1, 1, 1, 1, 1, 3, 2, 3, 2, 0, 0, 0, 0, 0, 0, 0, 2, 3, 2, 3, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 1, 3, 2, 3, 2, 0, 0, 0, 0, 0, 0, 0, 2, 3, 2, 3, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 3, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 3, 1, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 1, 1, 1, 1, 1],
            [1, 3, 3, 3, 3, 3, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 3, 3, 3, 3, 3, 1],
            [1, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 3, 1],
            [1, 3, 3, 3, 2, 3, 2, 2, 2, 2, 2, 3, 2, 3, 2, 2, 2, 2, 2, 3, 2, 3, 3, 3, 1],
            [1, 1, 1, 3, 2, 3, 3, 3, 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 3, 3, 2, 3, 1, 1, 1],
            [1, 1, 1, 3, 2, 3, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 3, 2, 3, 1, 1, 1],
            [1, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 1],
            [1, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 1],
            [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];
    }

    drawMap(ctx) {
        this.drawWalls(ctx);
        this.drawBlocks(ctx);
        this.drawFood(ctx);
    }

    drawWalls(ctx) {
        ctx.fillStyle = "blue";
        for (let col = 0; col < this.TILES.length; col++) {
            for (let row = 0; row < this.TILES[0].length; row++) {
                if(this.TILES[row][col] === 1) {
                    let coordinates = this.getTileCoordinates(row, col);
                    ctx.fillRect(coordinates.x, coordinates.y, this.tileSize, this.tileSize);
                }
            }
        }
    }

    drawBlocks(ctx) {
        ctx.fillStyle = 'blue';
        for (let col = 0; col < this.TILES.length; col++) {
            for (let row = 0; row < this.TILES[0].length; row++) {
                if(this.TILES[row][col] === 2) {
                    let coordinates = this.getTileCoordinates(row, col);
                    ctx.fillRect(coordinates.x, coordinates.y, this.tileSize, this.tileSize);
                }
            }
        }
    }

    drawFood(ctx) {
        ctx.fillStyle = 'blue';
        for (let col = 0; col < this.TILES.length; col++) {
            for (let row = 0; row < this.TILES[0].length; row++) {
                if(this.TILES[row][col] === 3) {
                    let coordinates = this.getTileCoordinates(row, col);
                    ctx.beginPath();
                    const foodRadius = 2;
                    ctx.fillStyle = "yellow";
                    ctx.arc(coordinates.x + (this.tileSize / 2),
                            coordinates.y + (this.tileSize / 2),
                            foodRadius, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }



    drawGameSpace(ctx) {
        const startingXCoor = this.margin;
        const startingYCoor = this.margin;
        ctx.fillStyle = 'blue';
        for (let col = 0; col < this.TILES.length; col++) {
            for (let row = 0; row < this.TILES[0].length; row++) {
                let coordinates = this.getTileCoordinates(row, col);
                ctx.fillRect(coordinates.x, coordinates.y, this.tileSize, this.tileSize);
            }
        }
    }

    debugDraw(ctx) {
        const startingXCoor = this.margin;
        const startingYCoor = this.margin;

        const tileSize = 20;

        ctx.save();

        ctx.strokeStyle = "blue";
        ctx.lineWidth = 2;

        ctx.beginPath();

        let x = startingXCoor;
        let y = startingYCoor;

        ctx.moveTo(startingXCoor, startingYCoor);

        x = x + tileSize;
        ctx.lineTo(x, y);
        x = x + tileSize;
        ctx.lineTo(x, y);
        x = x + tileSize;
        ctx.lineTo(x, y);
        x = x + tileSize;
        ctx.lineTo(x, y);
        x = x + tileSize;
        ctx.lineTo(x, y);
        x = x + tileSize;
        ctx.lineTo(x, y);
        x = x + tileSize;
        ctx.lineTo(x, y);
        x = x + tileSize;
        ctx.lineTo(x, y);
        x = x + tileSize;
        ctx.lineTo(x, y);
        x = x + tileSize;
        ctx.lineTo(x, y);
        x = x + tileSize;
        ctx.lineTo(x, y);
        x = x + tileSize;
        ctx.lineTo(x, y);
        x = x + tileSize;
        ctx.lineTo(x, y);
        x = x + tileSize;
        ctx.lineTo(x, y);
        x = x + tileSize;
        ctx.lineTo(x, y);
        x = x + tileSize;
        ctx.lineTo(x, y);
        x = x + tileSize;
        ctx.lineTo(x, y);
        x = x + tileSize;
        ctx.lineTo(x, y);
        x = x + tileSize;
        ctx.lineTo(x, y);
        x = x + tileSize;
        ctx.lineTo(x, y);
        x = x + tileSize;
        ctx.lineTo(x, y);
        x = x + tileSize;
        ctx.lineTo(x, y);
        x = x + tileSize;
        ctx.lineTo(x, y);
        x = x + tileSize;
        ctx.lineTo(x, y);

        //top right corner outer wall
        x = x + tileSize / 2;
        ctx.lineTo(x, y);
        x = x + tileSize / 2;
        y = y + tileSize / 2;
        ctx.arcTo(x, y - tileSize / 2, x, y, tileSize / 2);
        y = y + tileSize / 2;
        ctx.lineTo(x, y);

        y = tileSize * 24;
        ctx.lineTo(x, y);

        //ctx.moveTo(startingXCoor, 100);
        //ctx.lineTo(startingXCoor, 120);




        ctx.stroke();

        ctx.restore();

    }

    isCornerWall(row, col) {
        return (row === 0 && col === 0)
            || (row === 0 && col === this.TILES[0].length - 1)
            || (row === this.TILES.length - 1 && col === 0)
            || (row === this.TILES.length - 1 && col === this.TILES[0].length - 1)
    }

    getTileCoordinates(row, col) {
        let x = this.margin + col * this.tileSize;
        let y = this.margin + row * this.tileSize;
        return {x, y};
    }



}
