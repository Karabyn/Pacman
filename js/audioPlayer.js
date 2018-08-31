class AudioPlayer {

    constructor() {
        this._startGameSound = AudioPlayer.loadStartGameSound();
        this._eatingSound = AudioPlayer.loadEatingSound();
        this._dieSound = AudioPlayer.loadDieSound();
        this._eatCookieSound = AudioPlayer.loadEatCookieSound();
        this._chasingSound = AudioPlayer.loadChasingSound();
        this._eatGhostSound = AudioPlayer.loadEatGhostSound();
        this._ghostDeadSound = AudioPlayer.loadGhostDeadSound();

        this._allSounds = [this._startGameSound, this._eatingSound, this._dieSound, this._eatCookieSound,
                            this._chasingSound, this._eatGhostSound, this._ghostDeadSound];
    }

    get startGameSound() {
        return this._startGameSound;
    }

    get eatingSound() {
        return this._eatingSound;
    }

    get dieSound() {
        return this._dieSound;
    }

    get eatCookieSound() {
        return this._eatCookieSound;
    }

    get chasingSound() {
        return this._chasingSound;
    }

    get eatGhostSound() {
        return this._eatGhostSound;
    }

    get ghostDeadSound() {
        return this._ghostDeadSound;
    }

    stopAllSounds() {
        for (let sound of this._allSounds) {
            sound.pause();
        }
    }

    static isPlaying(sound) {
        return sound.seeking;
    }

    static loadStartGameSound() {
        return AudioPlayer.loadSound("sound/startGame.mp3");
    }

    static loadEatingSound() {
        const sound = AudioPlayer.loadSound("sound/eatFood.mp3");
        sound.volume = 0.3;
        return sound;
    }

    static loadDieSound() {
        return AudioPlayer.loadSound("sound/die.mp3");
    }

    static loadEatCookieSound() {
        return AudioPlayer.loadSound("sound/eatCookie.mp3");
    }

    static loadChasingSound() {
        const sound = AudioPlayer.loadSound("sound/chasing.mp3");
        sound.loop = true;
        return sound;
    }

    static loadEatGhostSound() {
        return AudioPlayer.loadSound("sound/eatGhost.mp3");
    }

    static loadGhostDeadSound() {
        const sound = AudioPlayer.loadSound("sound/ghostDead.mp3");
        sound.loop = true;
        return sound;
    }

    static loadSound(src) {
        const sound = document.createElement("audio");
        sound.src = src;
        sound.preload = "true";
        document.body.appendChild(sound);
        return sound;
    }

}