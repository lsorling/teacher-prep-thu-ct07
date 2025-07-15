// write your codes here
// the final game

// the global variables section
let bird, floor;
let flapMidImg, bg, base;

// lesson 5
let flapUpImg, flapDownImg;

let pipeGroup; // using group for pipes/obstacles
let pipe; // img for pipe (but didnt follow naming convention)
let topPipe, bottomPipe;

// 6.2 detect collision
let gameoverImg;
let gameoverLabel;

// 6.3 game start screen
let startScreenImg;
let startScreenLabel;

let startGame = false;

// preload game assets like media and images
function preload() {
    // bird image, background image, and the floor
    flapMidImg = loadImage('assets/yellowbird-midflap.png');

    flapUpImg = loadImage('assets/yellowbird-upflap.png');
    flapDownImg = loadImage('assets/yellowbird-downflap.png');

    bg = loadImage('assets/background-day.png');
    base = loadImage('assets/base.png');

    pipe = loadImage('assets/pipe-green.png');

    // 6.2
    gameoverImg = loadImage('assets/gameover.png');

    // 6.3 start screen
    startScreenImg = loadImage('assets/message.png');

    startScreenLabel = new Sprite(width/2, height/2, 50, 50, 'none');
    startScreenLabel.img = startScreenImg;
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

    // 5.3 pipes group
    pipeGroup = new Group();

}

// forever block
// must have this empty function if you have any new Sprite() code 
// in the setup()
function draw() {
    // draw the background image
    image(bg, 0, 0, width, height);

}

// 5.3 pipes group
function spawnPipePair() {
    // this is the code for creating pipe sprites
    let gap = 50;
    let midY = random(170, height / 2); // random(min, max)

    // create the bottom pipe sprite
    bottomPipe = new Sprite(bird.x + 400, midY + gap/2 +200, 52, 320, 'static');
    bottomPipe.img = pipe;

    // now the top pipe sprite
    topPipe = new Sprite(bird.x + 400, midY - gap/2 -200, 52, 320, 'static');
    topPipe.img = pipe;
    topPipe.rotation = 180; // upside down

    pipeGroup.add(bottomPipe);
    pipeGroup.layer = 0; // go behind other sprites but on top of background image
}