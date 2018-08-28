class Pacman extends MovingAgent {

    constructor(map) {
        super(map);

        // pacman starting coordinates
        const startCoords = map.getTileCoordinates(map.startTile.row, map.startTile.col);
        this.x = startCoords.x + this.fullRadius;
        this.y = startCoords.y + this.fullRadius;

        this.color = "yellow";
    }

    move() {
        super.move();

        // eat food
        const currentTile = map.getTileRowColumn(this.x, this.y);
        if (map.isTileWithinBounds(currentTile.row, currentTile.col) &&
            map.TILES[currentTile.row][currentTile.col] === map.FOOD) {
            score += 10;
            map.TILES[currentTile.row][currentTile.col] = map.EMPTY;
        }
    }

}