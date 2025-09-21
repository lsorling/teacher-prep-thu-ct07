// playground file

let soundFX;
let bgm;

function preload() {
//    soundFX = loadSound("assets/fruit-ninja-combo.mp3");
    soundFX = createAudio("assets/fruit-ninja-combo.mp3");
}

function setup() {
    new Canvas(600,400);
    background("pink");
}

function draw() {
    if (kb.presses("1")) {
        soundFX.play();
    }
}