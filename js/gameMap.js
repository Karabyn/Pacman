class GameMap {

    constructor() {
        this.width = 500;
        this.height = 500;

        this.margin = 0;

        this.tileSize = 20;

        this.BLANK = 0;
        this.WALL = 1;
        this.BLOCK = 2;
        this.FOOD = 3;
        this.COOKIE = 4;

        //25 x 25
        this.TILES = GameMap.getTiles();

        this.leftTeleportTile = {row: 11, col: 0};
        this.rightTeleportTile = {row: 11, col: 24};

        this.hasFoodElements = true;
    }

    drawMap(ctx) {
        this.hasFoodElements = false;
        for (let col = 0; col < this.TILES.length; col++) {
            for (let row = 0; row < this.TILES[0].length; row++) {
                const tileType = this.TILES[row][col];
                if (tileType === this.WALL || tileType === this.BLOCK) {
                    this.drawObstacle(ctx, row, col);
                }
                else if (tileType === this.FOOD) {
                    this.hasFoodElements = true;
                    this.drawFoodElement(ctx, row, col);
                }
                else if (tileType === this.COOKIE) {
                    this.hasFoodElements = true;
                    this.drawCookie(ctx, row, col);
                }
            }
        }
        if (!this.hasFoodElements) {
            game.setGameState(game.gameStates.GAME_WON);
        }
    }

    drawObstacle(ctx, row, col) {
        ctx.fillStyle = "blue";
        const coordinates = this.getTileCoordinates(row, col);
        const offset = 2;
        ctx.fillRect(coordinates.x + offset, coordinates.y + offset,
                    this.tileSize - offset * 2, this.tileSize - offset * 2);
    }

    drawFoodElement(ctx, row, col) {
        ctx.fillStyle = "orange";
        let coordinates = this.getTileCenter(row, col);
        ctx.fillRect(coordinates.x - 1, coordinates.y - 1, 2, 2);
    }

    drawCookie(ctx, row, col) {
        ctx.fillStyle = "orange";
        let coordinates = this.getTileCoordinates(row, col);
        ctx.beginPath();
        const radius = 4;
        ctx.arc(coordinates.x + (this.tileSize / 2),
            coordinates.y + (this.tileSize / 2),
            radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
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

    /**
     * @returns {{x: number, y: number}}
     * where x and y are coordinates of left topmost corner of the tile.
     */
    getTileCoordinates(row, col) {
        let x = this.margin + col * this.tileSize;
        let y = this.margin + row * this.tileSize;
        return {x, y};
    }

    getTileCenter(row, col) {
        let x = this.margin + col * this.tileSize + this.tileSize / 2;
        let y = this.margin + row * this.tileSize + this.tileSize / 2;
        return {x, y};
    }

    getTileRowColumn(x, y) {
        if(x < this.margin || x >= this.width + this.margin || y < this.margin || y >= this.height + this.margin) {
            return {row: -1, col: -1};
        }

        const row = Math.floor((y - this.margin) / this.tileSize);
        const col = Math.floor((x - this.margin) / this.tileSize);
        return {row, col};
    }

    canTileBeVisited(row, col) {
        if (this.isTileWithinBounds(row, col)) {
            const tile = this.TILES[row][col];
            return tile !== this.WALL && tile !== this.BLOCK;
        }
        return false;
    }

    isTileWithinBounds(row, col) {
        return row >= 0 && row < this.TILES.length && col >= 0 && col < this.TILES.length;
    }

    reset() {
        this.TILES = GameMap.getTiles();
        this.hasFoodElements = true;
    }

    static getTiles() {
        return [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
                [1, 3, 2, 2, 2, 3, 2, 2, 2, 2, 2, 3, 1, 3, 2, 2, 2, 2, 2, 3, 2, 2, 2, 3, 1],
                [1, 4, 2, 2, 2, 3, 2, 2, 2, 2, 2, 3, 1, 3, 2, 2, 2, 2, 2, 3, 2, 2, 2, 4, 1],
                [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
                [1, 3, 2, 2, 2, 3, 2, 3, 2, 2, 2, 3, 2, 3, 2, 2, 2, 3, 2, 3, 2, 2, 2, 3, 1],
                [1, 3, 3, 3, 3, 3, 2, 3, 2, 2, 2, 3, 2, 3, 2, 2, 2, 3, 2, 3, 3, 3, 3, 3, 1],
                [1, 1, 1, 1, 1, 3, 2, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 2, 3, 1, 1, 1, 1, 1],
                [0, 0, 0, 0, 1, 3, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 3, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 1, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 3, 2, 0, 2, 2, 2, 0, 0, 0, 2, 2, 2, 0, 2, 3, 1, 1, 1, 1, 1],
                [0, 0, 0, 0, 0, 3, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 3, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 3, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 3, 1, 1, 1, 1, 1],
                [0, 0, 0, 0, 1, 3, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 3, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 1, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 3, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 3, 1, 1, 1, 1, 1],
                [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
                [1, 3, 2, 2, 2, 3, 2, 2, 2, 2, 2, 3, 2, 3, 2, 2, 2, 2, 2, 3, 2, 2, 2, 3, 1],
                [1, 4, 3, 3, 2, 3, 2, 2, 2, 2, 2, 3, 2, 3, 2, 2, 2, 2, 2, 3, 2, 3, 3, 4, 1],
                [1, 1, 1, 3, 2, 3, 3, 3, 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 3, 3, 2, 3, 1, 1, 1],
                [1, 1, 1, 3, 2, 3, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 3, 2, 3, 1, 1, 1],
                [1, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 1],
                [1, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 1],
                [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];
    }

}
