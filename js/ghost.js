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
            this.nextDir = MovingAgent.initialDir();
            game.pacman.chasingMode ? this.setNextRandomDir() : this.chasePacman();
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

    setNextRandomDir() {
        if (this.canMove(this.currentDir)) {
            this.nextDir = this.currentDir;
        }
        else {
            this.nextDir = MovingAgent.initialDir();
            let nextDir = Math.floor((Math.random() * 4) + 1);
            while (Ghost.isOpposite(this.currentDir, nextDir)) {
                nextDir = Math.floor((Math.random() * 4) + 1);
            }
            switch (nextDir) {
                case 1:
                    this.nextDir.UP = true;
                    break;
                case 2:
                    this.nextDir.RIGHT = true;
                    break;
                case 3:
                    this.nextDir.DOWN = true;
                    break;
                case 4:
                    this.nextDir.LEFT = true;
            }
        }
    }

    chasePacman() {
        let distanceUp, distanceRight, distanceDown, distanceLeft;
        distanceUp = distanceRight = distanceDown = distanceLeft = Number.MAX_VALUE;

        if (this.canMoveUp() && !Ghost.isOpposite(this.currentDir, MovingAgent.getDirUp()))
            distanceUp = Ghost.getDistance(this.x, this.y - this.dy, game.pacman.x, game.pacman.y);
        if (this.canMoveRight() && !Ghost.isOpposite(this.currentDir, MovingAgent.getDirRight()))
            distanceRight = Ghost.getDistance(this.x + this.dx, this.y, game.pacman.x, game.pacman.y);
        if (this.canMoveDown() && !Ghost.isOpposite(this.currentDir, MovingAgent.getDirDown()))
            distanceDown = Ghost.getDistance(this.x, this.y + this.dy, game.pacman.x, game.pacman.y);
        if (this.canMoveLeft() && !Ghost.isOpposite(this.currentDir, MovingAgent.getDirLeft()))
            distanceLeft = Ghost.getDistance(this.x - this.dx, this.y, game.pacman.x, game.pacman.y);

        const minDist = Math.min(distanceUp, distanceRight, distanceDown, distanceLeft);
        if (minDist === distanceUp) this.nextDir.UP = true;
        else if (minDist === distanceRight) this.nextDir.RIGHT = true;
        else if (minDist === distanceDown) this.nextDir.DOWN = true;
        else if (minDist === distanceLeft) this.nextDir.LEFT = true;
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
            case "blinky" : return {row: 1, col: 5};
            case "pinky"  : return {row: 1, col: 19};
            case "inky"   : return {row: 23, col: 5};
            case "clyde"  : return {row: 23, col: 19};
        }
    }

    static hasNoDir(dir) {
        return !dir.UP && !dir.RIGHT && !dir.DOWN && !dir.LEFT;
    }

    static isOpposite(dir1, dir2) {
        return (dir1.UP && dir2.DOWN) || (dir1.RIGHT && dir2.LEFT) ||
            (dir1.DOWN && dir2.UP) || (dir1.LEFT && dir2.RIGHT);
    }

    static getDistance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

}
