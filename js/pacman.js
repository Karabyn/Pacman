class Pacman extends MovingAgent {

    constructor(map) {
        super(map);

        // pacman starting coordinates
        const startCoords = this.getStartingCoodinates();
        this.x = startCoords.x;
        this.y = startCoords.y;

        this.lives = 2;

        this.color = "yellow";
    }

    move() {
        super.move();

        // eat food
        this.eatFood();
    }

    eatFood() {
        const currentTile = this.map.getTileRowColumn(this.x, this.y);
        if (this.map.isTileWithinBounds(currentTile.row, currentTile.col) &&
            this.map.TILES[currentTile.row][currentTile.col] === map.FOOD) {
            score += 10;
            this.map.TILES[currentTile.row][currentTile.col] = map.EMPTY;
        }
    }

    die() {
        this.lives -= 1;
        this.resetPosition();

    }

    reset() {
        this.lives = 3;
        this.resetPosition();
    }

    resetPosition() {
        const startCoords = this.getStartingCoodinates();
        this.x = startCoords.x;
        this.y = startCoords.y;
        this.resetDirs();
    }

    getStartingCoodinates() {
        return this.map.getTileCenter(19, 12);
    }

}