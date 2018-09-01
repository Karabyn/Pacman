class Pacman extends MovingAgent {

    constructor(map) {
        super(map);

        // pacman starting coordinates
        const startCoords = this.getStartingCoodinates();
        this.x = startCoords.x;
        this.y = startCoords.y;

        this.lives = 3;
        this.color = "yellow";

        this.chasingMode = false;
    }

    move() {
        super.move();

        // eat food
        this.eatFood();
        this.eatCookie();
    }

    eatFood() {
        const currentTile = this.map.getTileRowColumn(this.x, this.y);
        if (this.map.isTileWithinBounds(currentTile.row, currentTile.col) &&
            this.map.TILES[currentTile.row][currentTile.col] === this.map.FOOD) {
            game.incrementScore(10);
            this.map.TILES[currentTile.row][currentTile.col] = this.map.EMPTY;
        }
    }

    eatCookie() {
        const currentTile = this.map.getTileRowColumn(this.x, this.y);
        if (this.map.isTileWithinBounds(currentTile.row, currentTile.col) &&
            this.map.TILES[currentTile.row][currentTile.col] === this.map.COOKIE) {
            game.audioPlayer.eatCookieSound.play();
            game.setTick(0);
            this.chasingMode = true;
            game.incrementScore(50);
            this.map.TILES[currentTile.row][currentTile.col] = this.map.EMPTY;
        }
    }

    async die() {
        this.lives -= 1;
        await sleep(2000);
        this.resetPosition();
    }

    reset() {
        this.lives = 3;
        this.chasingMode = false;
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

    static eatGhost(ghost) {
        game.incrementScore(100);
        ghost.die();
    }

}