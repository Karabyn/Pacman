class AudioPlayer {
    constructor() {
        this.eatingSound = AudioPlayer.loadEatingSound();
        this.dieSound = AudioPlayer.loadDieSound();
    }

    static loadEatingSound() {
        const sound = AudioPlayer.loadSound('sound/eatFood.mp3');
        sound.volume = 0.3;
        return sound;
    }

    static loadDieSound() {
        return AudioPlayer.loadSound('sound/die.mp3')
    }

    static loadSound(src) {
        const sound = document.createElement("audio");
        sound.src = src;
        sound.preload = "true";
        document.body.appendChild(sound);
        return sound;
    }

}