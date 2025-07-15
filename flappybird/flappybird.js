// the final game

// the global variables section
let bird, floor;
let flapMidImg, bg, base;

// preload game assets like media and images
function preload() {
    // bird image, background image, and the floor
    flapMidImg = loadImage('assets/yellowbird-midflap.png');
    bg = loadImage('assets/background-day.png');
    base = loadImage('assets/')
}

// run once like the "when green flag clicked"
function setup() {
    new Canvas(400,600);
    background("steelblue");
}

// forever block
// must have this empty function if you have any new Sprite() code 
// in the setup()
function draw() {

}