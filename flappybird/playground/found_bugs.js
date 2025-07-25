// write your codes here
/*
changelog:

///////////////////////////////////////////////////////////////////////////////

algo1:
to change background from day to night, then to day
introduce another boolean variable: useNight

    // draw the background image
    if (frameCount % 1200 == 0) {
        useNight = !useNight;
    }
    
    if (useNight) {
        image(bgNight, 0, 0, width, height);
    }
    else {
        image(bg, 0, 0, width, height);
    }

vs original code:

        image(bg, 0, 0, width, height);

///////////////////////////////////////////////////////////////////////////////

bug1:
the loop to remove pipes that are out of the view is wrong
cos camera is locked on moving bird sprite
so pipe.x is static

add debugging on screen to check:
        text('pipeGroup count: ' + pipeGroup.length, 10, 80);

wrong:
for (let pipe of pipeGroup) {
            if (pipe.x < 0) {
                pipe.remove();
            }
        }
correct:
for (let pipe of pipeGroup) {
            if ((camera.x-pipe.x) > 500) { // fixed the bug
                pipe.remove();
            }
        }

*/
// the global variables section
let bird, floor;
let flapMidImg, bg, base;

// let them think of algo to switch day/night cycle
let bgNight;
let useNight = false;

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

// sound assets
let flapSound;
let dieSound;

// preload game assets like media and images
function preload() {
    // bird image, background image, and the floor
    flapMidImg = loadImage('assets/yellowbird-midflap.png');

    flapUpImg = loadImage('assets/yellowbird-upflap.png');
    flapDownImg = loadImage('assets/yellowbird-downflap.png');

    bg = loadImage('assets/background-day.png');
    bgNight = loadImage('assets/background-night.png');

    base = loadImage('assets/base.png');

    pipe = loadImage('assets/pipe-green.png');

    // 6.2
    gameoverImg = loadImage('assets/gameover.png');

    // 6.3 start screen
    startScreenImg = loadImage('assets/message.png');

    flapSound = createAudio('assets/sfx_wing.mp3');
    dieSound = createAudio('assets/sfx_die.mp3');
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
    bird.collider = "static"; // stop the bird from falling due to gravity
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

    // 6.3 start screen
    startScreenLabel = new Sprite(width/2, height/2, 50, 50, 'none');
    startScreenLabel.img = startScreenImg;
}

// forever block
// must have this empty function if you have any new Sprite() code 
// in the setup()
function draw() {
    // draw the background image
    if (frameCount % 1200 == 0) {
        useNight = !useNight;
    }
    
    if (useNight) {
        image(bgNight, 0, 0, width, height);
    }
    else {
        image(bg, 0, 0, width, height);
    }

    if (startGame) {
        // 4.4 keyboard and mouse inputs
        // teach OR condition, using || 2 pipe symbols
        //
        if (kb.presses('space') || mouse.presses()) {
            bird.vel.y = -5;
            bird.sleeping = false; // wake up if fallen asleep
            flapSound.play();
        }

        // if (mouse.presses()) {
        //     let abc = new Sprite(mouse.x, 200, 30, 30, 'dynamic'); // create a new sprite
        //     abc.bounciness = 1; // to better understand physics, so fun to watch
        // }

        // 4.5 debug info on screen
        fill("blue");
        textSize(14);
        text('vel.y: ' + bird.vel.y.toFixed(2), 10, 20);
        text('frameCount: ' + frameCount, 10, 40);
        text('is sleeping: ' + bird.sleeping, 10, 60);
        text('pipeGroup count: ' + pipeGroup.length, 10, 80);

        // 5.2 bird animation using if conditions
        // the bird is so cute now
        if (bird.vel.y < -1) {
            bird.img = flapUpImg;
            bird.rotation = -20;
        }
        else if (bird.vel.y > 1) {
            bird.img = flapDownImg;
            bird.rotation = 20;
        }
        else {
            bird.img = flapMidImg;
            bird.rotation = 0;
        }

        // 5.3 pipes group
        // frameCount is provided by p5play library
        // frameCount === 1 i.e. first frame
        // observation: the frameCount happens too fast, cannot see 1st set of pipes
        // after added 6.1 codes
        // but this set of codes has it purpose
        // to test if your first set of pipes show or not
        // before scrolling the bird forward to the right
        if (frameCount === 0) {
            spawnPipePair(); // break up the codes into chunks
        }
            
        // 6.1 camera
        bird.x += 3; // make the bird move forward (to the right)
        camera.x = bird.x; // lock the camera on the bird's pos
        floor.x = bird.x; // lock the floor to the bird's pos

        if (frameCount % 120 === 0) {
            // every 1.5 second
            spawnPipePair();
        }
        // cleanup
        for (let pipe of pipeGroup) {
            if ((camera.x-pipe.x) > 500) { // fixed the bug
                pipe.remove();
            }
        }

        // 6.2 detect collision
        if (bird.collides(pipeGroup) || bird.collides(floor)) {
            gameoverLabel = new Sprite(width/2, height/2, 192, 42);
            gameoverLabel.img = gameoverImg;
            gameoverLabel.layer = 100; // come to front most layer
            gameoverLabel.rotation = 0;
            gameoverLabel.x = camera.x;

            dieSound.play();
            noLoop(); // stop draw() function // slide got error noloop() is written
        }
    }
    else {
        // if game has not started,
        // wait for space key press or mouse clicked event
        //
        if (kb.presses('space') || mouse.presses()) {
            startScreenLabel.visible = false;
            startGame = true;
            bird.collider = "dynamic";
            bird.y = 200;
        }
    }
}

// 5.3 pipes group
function spawnPipePair() {
    // this is the code for creating pipe sprites
    let gap = 70;
    // take note of the code changes here, initially is height/2 then changed to height -250
    let midY = random(170, height -250); // random(min, max)

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
