// i am redoing from lesson 04 with sprite
// with keyboard

// the global variables section
let bird, floor;
let bg, base;
let flapMidImg, flapUpImg, flapDownImg;

let pipeImg, bottomPipe, topPipe;
let pipeGroup;

// preload game assets like media and images
function preload() {
    // bird image, background image, and the floor
    bg = loadImage('assets/background-day.png');
    base = loadImage('assets/base.png');

    flapUpImg = loadImage('assets/yellowbird-upflap.png');
    flapMidImg = loadImage('assets/yellowbird-midflap.png');
    flapDownImg = loadImage('assets/yellowbird-downflap.png');

    pipeImg = loadImage('assets/');
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
    floor.collider = 'static';
    floor.img = base;

    // for organising and managing pipes (obstacles)
    pipeGroup = new Group();
}

// forever block
// must have this empty function if you have any new Sprite() code 
// in the setup()
function draw() {
    // draw the background image
    image(bg, 0, 0, width, height);

    // 4.4 keyboard and mouse inputs
    if (kb.presses('space') || mouse.presses()) {
        bird.vel.y = -5;
        bird.sleeping = false; // wake up if fallen asleep
    }

    if (bird.vel.y < -1) {
        bird.img = flapUpImg;
        bird.rotation = -30;
    }
    else if (bird.vel.y > 1) {
        bird.img = flapDownImg;
        bird.rotation = 30;
    }
    else {
        bird.img = flapMidImg;
        bird.rotation = 0;
    }

    if (frameCount === 1) {
        spawnPipePair();
    }

    // if (mouse.presses()) {
    //     let abc = new Sprite(mouse.x, 200, 30, 30, 'dynamic'); // create a new sprite
    //     abc.bounciness = 1; // to better understand physics, so fun to watch
    // }

    // 4.5 debug info on screen
    fill("blue");
    textSize(14);
    text('vel.y: ' + bird.vel.y.toFixed(2), 10, 20);
    text('moving: ' + bird.isMoving, 10, 40);
    text('is sleeping: ' + bird.sleeping, 10, 60);
}

// custom function
function spawnPipePair() {

}