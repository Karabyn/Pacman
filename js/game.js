game = function() {

    const canvasWidth = 500;
    const canvasHeight = 530;
    const canvas = createGameCanvas();
    // store the 2D rendering context
    const ctx = canvas.getContext("2d");
    // Renderer
    const renderer = new Renderer(canvas);
    // Game map
    const map = new GameMap();
    // Moving agents
    const pacman = new Pacman(map);
    const blinky = new Ghost(map, "blinky");
    const pinky = new Ghost(map, "pinky");
    const inky = new Ghost(map, "inky");
    const clyde = new Ghost(map, "clyde");
    const ghosts = [blinky, pinky, inky, clyde];
    // Game score
    let score = 0;
    // Music
    const audioPlayer = new AudioPlayer();
    // Game controls
    const controls = new Controls();

    const gameStates = {
        NEW_GAME  : 1,
        STARTING  : 2,
        RUNNING   : 3,
        PAUSED    : 4,
        GAME_WON  : 5,
        GAME_LOST : 6
    };
    let gameState = gameStates.NEW_GAME;

    let lastFrameTimestamp = 0; // last loop execution timestamp
    const fps = 60; // number of frames (mainGameLoop) executions per second.
    let tick = 0;

    function getGameState() {
        return gameState;
    }

    function setGameState(state) {
        gameState = state;
    }

    function setTick(value) {
        tick = value;
    }

    function incrementScore(n) {
        score += n;
    }

    function createGameCanvas() {
        // create canvas element
        const canvas = document.createElement("canvas");
        // set attributes for canvas
        canvas.setAttribute("width", canvasWidth);
        canvas.setAttribute("height", canvasHeight);
        // add canvas element inside the body
        document.getElementsByTagName("body")[0].appendChild(canvas);
        return canvas;
    }

    function startNewGame() {
        gameState = gameStates.STARTING;
        score = 0;
        map.reset();
        pacman.reset();
        for (let ghost of ghosts) {
            ghost.reset();
        }
    }

    function activeGameLoop() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        map.drawMap(ctx);

        renderer.drawScore(score);
        renderer.drawLives(pacman.lives);

        if (pacman.chasingMode) {
            // chasing mode lasted 5 seconds
            if (!AudioPlayer.isPlaying(audioPlayer.chasingSound)) {
                audioPlayer.chasingSound.play();
            }
            if (tick === fps * 5) {
                pacman.chasingMode = false;
                tick = 0;
                audioPlayer.chasingSound.pause();
            } else {
                tick++;
            }
        }

        // pacman next movement
        if (controls.rightPressed && !pacman.currentDir.RIGHT) {
            pacman.nextDir = Pacman.initialDir();
            pacman.nextDir.RIGHT = true;
        }
        else if (controls.leftPressed && !pacman.currentDir.LEFT) {
            pacman.nextDir = Pacman.initialDir();
            pacman.nextDir.LEFT = true;
        }
        else if (controls.upPressed && !pacman.currentDir.UP) {
            pacman.nextDir = Pacman.initialDir();
            pacman.nextDir.UP = true;
        }
        else if (controls.downPressed && !pacman.currentDir.DOWN) {
            pacman.nextDir = Pacman.initialDir();
            pacman.nextDir.DOWN = true;
        }

        pacman.move();
        for(let ghost of ghosts) {
            ghost.move();
        }

        let ghostCollision = false;
        let collidedGhost;
        renderer.drawPacman(pacman);
        for (let ghost of ghosts) {
            if (ghost.alive) {
                renderer.drawGhost(ghost, pacman.chasingMode);
                if (Collider.pacmanGhostCollision(pacman, ghost)) {
                    ghostCollision = true;
                    collidedGhost = ghost;
                }
            }
        }

        if (ghostCollision && !pacman.chasingMode) {
            audioPlayer.dieSound.play();
            pacman.die();
            for(let ghost of ghosts) {
                ghost.reset();
            }
            if (pacman.lives === 0) {
                gameState = gameStates.GAME_LOST;
            }
        }
        else if (ghostCollision && pacman.chasingMode) {
            audioPlayer.eatGhostSound.play();
            Pacman.eatGhost(collidedGhost);
        }
    }

    async function mainGameLoop(timestamp) {

        // If the expected time has not elapsed, wait for the next frame
        if (timestamp + 1 < lastFrameTimestamp + (1000 / fps)) {
            requestAnimationFrame(mainGameLoop);
            return;
        }
        lastFrameTimestamp = timestamp;

        switch (gameState) {
            case gameStates.NEW_GAME:
                renderer.showNewGameScreen();
                break;
            case gameStates.STARTING:
                audioPlayer.startGameSound.play();
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                map.drawMap(ctx);
                renderer.drawPacman(pacman);
                for(let ghost of ghosts) {
                    renderer.drawGhost(ghost, pacman.chasingMode);
                }
                await asyncSleep(1200);
                renderer.showCountDown(3);
                await asyncSleep(1000);
                renderer.showCountDown(2);
                await asyncSleep(1000);
                renderer.showCountDown(1);
                await asyncSleep(1000);
                gameState = gameStates.RUNNING;
                break;
            case gameStates.RUNNING:
                activeGameLoop();
                break;
            case gameStates.PAUSED:
                audioPlayer.stopAllSounds();
                renderer.showPausedMessage();
                break;
            case gameStates.GAME_WON:
                audioPlayer.stopAllSounds();
                await asyncSleep(2000);
                renderer.showWinScreen(score);
                break;
            case gameStates.GAME_LOST:
                audioPlayer.stopAllSounds();
                renderer.showGameOverScreen(score);
        }
        requestAnimationFrame(mainGameLoop);
    }

    return {
        map : map,
        pacman : pacman,
        audioPlayer : audioPlayer,
        gameStates : gameStates,
        fps : fps,

        getGameState : getGameState,
        setGameState : setGameState,
        setTick : setTick,
        incrementScore : incrementScore,
        startNewGame : startNewGame,
        mainGameLoop : mainGameLoop
    }
    
}();

game.mainGameLoop();