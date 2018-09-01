class Ghost extends MovingAgent {

    constructor(map, name) {
        super(map);

        this.name = name;
        this.color = Ghost.getColor(name);
        const startingTile = Ghost.getStartingTile(name);
        const startCoords = map.getTileCenter(startingTile.row, startingTile.col);

        this.x = startCoords.x;
        this.y = startCoords.y;

        this.alive = true;
        this.deadTick = 0;
    }

    move() {
        if (this.alive) {
            if(this.name === "pinky" || this.name === "clyde") {
                this.nextDir = game.pacman.chasingMode ? this.randomDir() : this.chasePacmanDir();
            }
            else {
                this.nextDir = this.randomDir();
            }

            super.move();
        }
        else if (!this.alive && this.deadPeriodElapsed()) {
            this.alive = true;
            this.deadTick = 0;
            game.audioPlayer.ghostDeadSound.pause();
        }
        else if (!this.alive && !this.deadPeriodElapsed()) {
            if (!AudioPlayer.isPlaying(game.audioPlayer.ghostDeadSound)) {
                game.audioPlayer.ghostDeadSound.play();
            }
            this.deadTick++;
        }
    }

    randomDir() {
        const possibleDirs = [false, false, false, false]; // up, right, down, left;

        if (this.canMoveUp()) possibleDirs[0] = true;
        if (this.canMoveRight()) possibleDirs[1] = true;
        if (this.canMoveDown()) possibleDirs[2] = true;
        if (this.canMoveLeft()) possibleDirs[3] = true;

        // there should always be at least two possible options
        let numOfOptions = 0;
        for (let possibleDir of possibleDirs) {
            if(possibleDir) numOfOptions++;
        }
        // when the only options are to move back or continue -> continue
        // most of the time the ghost is able to continue moving in the current
        // direction, so having this check early saves a lot of unnecessary computation
        if (numOfOptions === 2 && this.canMove(this.currentDir)) {
            return this.currentDir;
        }
        // when reached an obstacle in current dir and two options are
        // move back or move in new direction -> choose new direction.
        else if (numOfOptions === 2 && !this.canMove(this.currentDir)) {
            for (let i = 0; i < possibleDirs.length; i++) {
                if (possibleDirs[i] === true) {
                    const dir = Ghost.getDirByNumericValue(i);
                    if (!Ghost.isOpposite(this.currentDir, dir)) return dir;
                }
            }
        }
        // when 3 or more options available - choose randomly one of them, except opposite.
        return this.chooseRandomDir();
    }

    chooseRandomDir() {
        const randomChoice = Math.floor((Math.random() * 4) + 1);
        const nextDir = Ghost.getDirByNumericValue(randomChoice - 1);

        if((!this.canMove(nextDir) && !this.canTeleportLeftToRight() && !this.canTeleportRightToLeft())
                || Ghost.isOpposite(this.currentDir, nextDir)) {
            return this.chooseRandomDir();
        }
        return nextDir;
    }

    /**
     * Chooses a new random dir only when reached an obstacle following
     * current dir till the end.
     * Behavior looks similar to bouncing balls at random directions.
     */
    bounceRandomDir() {
        if (this.canMove(this.currentDir)) {
            return this.currentDir;
        }
        else {
            let nextDir = Math.floor((Math.random() * 4) + 1);
            switch (nextDir) {
                case 1: return MovingAgent.getDirUp();
                case 2: return MovingAgent.getDirRight();
                case 3: return MovingAgent.getDirDown();
                case 4: return MovingAgent.getDirLeft();
            }
        }
    }

    /**
     * Calculates a direction that will minimize the distance to pacman
     */
    chasePacmanDir() {
        let distanceUp, distanceRight, distanceDown, distanceLeft;
        distanceUp = distanceRight = distanceDown = distanceLeft = Number.MAX_VALUE;

        const dirUp = MovingAgent.getDirUp(),
            dirRight = MovingAgent.getDirRight(),
            dirDown = MovingAgent.getDirDown(),
            dirLeft = MovingAgent.getDirLeft();

        if (this.canMoveUp() && !Ghost.isOpposite(this.currentDir, dirUp))
            distanceUp = Ghost.getDistance(this.x, this.y - this.dy, game.pacman.x, game.pacman.y);
        if (this.canMoveRight() && !Ghost.isOpposite(this.currentDir, dirRight))
            distanceRight = Ghost.getDistance(this.x + this.dx, this.y, game.pacman.x, game.pacman.y);
        if (this.canMoveDown() && !Ghost.isOpposite(this.currentDir, dirDown))
            distanceDown = Ghost.getDistance(this.x, this.y + this.dy, game.pacman.x, game.pacman.y);
        if (this.canMoveLeft() && !Ghost.isOpposite(this.currentDir, dirLeft))
            distanceLeft = Ghost.getDistance(this.x - this.dx, this.y, game.pacman.x, game.pacman.y);

        const minDist = Math.min(distanceUp, distanceRight, distanceDown, distanceLeft);
        if (minDist === distanceUp) return dirUp;
        else if (minDist === distanceRight) return dirRight;
        else if (minDist === distanceDown) return dirDown;
        else if (minDist === distanceLeft) return dirLeft;
    }

    die() {
        this.alive = false;
        this.reset();
    }

    deadPeriodElapsed() {
        return this.deadTick === game.fps * 3;
    }

    reset() {
        const startingTile = Ghost.getStartingTile(this.name);
        const startCoords = game.map.getTileCenter(startingTile.row, startingTile.col);

        this.x = startCoords.x;
        this.y = startCoords.y;
        this.resetDirs();
    }

    static getColor(name) {
        switch (name) {
            case "blinky" : return "red";
            case "pinky"  : return "pink";
            case "inky"   : return "cyan";
            case "clyde"  : return "orange";
        }
    }

    static getStartingTile(name) {
        switch (name) {
            case "blinky" : return {row: 1, col: 5}; // return {row: 11, col: 12};
            case "pinky"  : return {row: 1, col: 19}; // return {row: 11, col: 13};
            case "inky"   : return {row: 23, col: 5}; //  return {row: 12, col: 12};
            case "clyde"  : return {row: 23, col: 19}; // return {row: 12, col: 13};
        }
    }

    static hasNoDir(dir) {
        return !dir.UP && !dir.RIGHT && !dir.DOWN && !dir.LEFT;
    }

    static isOpposite(dir1, dir2) {
        return (dir1.UP && dir2.DOWN) || (dir1.RIGHT && dir2.LEFT) ||
            (dir1.DOWN && dir2.UP) || (dir1.LEFT && dir2.RIGHT);
    }

    /**
     * Return a numeric representation of direction object.
     * UP - 0, RIGHT - 1, DOWN - 2, LEFT - 3.
     * @param dir object
     */
    static getNumericDir(dir) {
        if (dir.UP) return 0;
        else if (dir.RIGHT) return 1;
        else if (dir.DOWN) return 2;
        else if (dir.LEFT) return 3;
        else return -1;
    }

    static getDirByNumericValue(value) {
        switch (value) {
            case 0 : return MovingAgent.getDirUp();
            case 1 : return MovingAgent.getDirRight();
            case 2 : return MovingAgent.getDirDown();
            case 3 : return MovingAgent.getDirLeft();
        }
    }

    static getDistance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

}
