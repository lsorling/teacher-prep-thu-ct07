// the final game

// the global variables section
let bird, floor;
let flapMidImg, bg, base;

// preload game assets like media and images
function preload() {
    // bird image, background image, and the floor
    flapMidImg = loadImage('assets/yellowbird-midflap.png');
    bg = loadImage('assets/background-day.png');
    base = loadImage('assets/base.png');
}

// run once like the "when green flag clicked"
function setup() {
    new Canvas(400,600);

    // 4.1
    // bird sprite
    bird = new Sprite();
    bird.x = width / 2;
    bird.y = 200;
    bird.width = 30;
    bird.height = 30;
    bird.img = flapMidImg;

    // 4.2
    // game physics and world gravity
    bird.collider = "dynamic";
    bird.mass = 2;
    bird.drag = 0.02; // air resistance
    bird.bounciness = 0.5; // how much it bounce when hitting the floor

    world.gravity.y = 10;

    // 4.3
    floor = new Sprite();
    floor.x = 200;
    floor.y = height - 20;
    floor.width = 400; // same size as canvas
    floor.height = 125;
    fl
    // background("steelblue");
}

// forever block
// must have this empty function if you have any new Sprite() code 
// in the setup()
function draw() {
    // draw the background image
    image(bg, 0, 0, width, height);
}