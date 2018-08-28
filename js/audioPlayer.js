class AudioPlayer {
    constructor() {
        this.eatingSound = AudioPlayer.loadEatingSound();
    }

    static loadEatingSound() {
        const sound = document.createElement("audio");
        sound.src = 'sound/eatFood.mp3';
        sound.volume = 0.3;
        sound.preload = "true";
        document.body.appendChild(sound);
        return sound;
    }

}