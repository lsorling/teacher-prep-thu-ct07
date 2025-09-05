// write your codes here
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
let pointSound;

// 7.2 display score using digits
let score = 0;
let digitImgs = [];
let scoreGroup;


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

    // 7.1 start screen
    startScreenImg = loadImage('assets/message.png');

    flapSound = createAudio('assets/sfx_wing.mp3');
    dieSound = createAudio('assets/sfx_die.mp3');
    pointSound = createAudio('assets/sfx_die.mp3');

    let prefix = "assets/";
    let postfix = ".png";
    let filename = "";

    for (let count =0; count<10; count++) {
        filename = prefix + count + postfix;
        digitImgs[count] = filename;
    }
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

    bird.visible = false;

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

    // 7.1 start screen
    startScreenLabel = new Sprite(width/2, height/2, 50, 50, 'none');
    startScreenLabel.img = startScreenImg;

    // 7.2 display score
    scoreGroup = new Group();
    scoreGroup.collider = "none"; // non-interacting with other sprites like player or pipes
    scoreGroup.layer = 1000; // frontmost layer
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

    // if game has not started,
    // wait for space key press or mouse clicked event
    //
    if (kb.presses('space') || mouse.presses()) {
        startScreenLabel.visible = false;
        startGame = true;
    }

    if (startGame) {
        bird.collider = "dynamic";
        bird.visible = true;

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
        bird.x += 2; // make the bird move forward (to the right)
        camera.x = bird.x; // lock the camera on the bird's pos
        floor.x = bird.x; // lock the floor to the bird's pos

        if (frameCount % 150 === 0) {
            // every 2.5 second
            spawnPipePair();
        }

        // cleanup for performance
        for (let pipe of pipeGroup) {
            // why 200+25?
            if ((camera.x-pipe.x) > 200+25) { // fixed the bug
                pipe.remove();
            }
        }

        // 6.2 detect collision
        if (bird.collides(pipeGroup) || bird.collides(floor)) {
            gameoverLabel = new Sprite(width/2, height/2, 192, 42);
            gameoverLabel.img = gameoverImg;
            gameoverLabel.layer = 100; // come to front most layer
            gameoverLabel.x = camera.x;

            dieSound.play();
            noLoop(); // stop draw() function // slide got error noloop() is written
        }

        // 7.2 increase score
        for (let pipe of pipeGroup) {
            let leftEdgeBird = bird.x - bird.w/2;
            let rightEdgePipe = pipe.x - pipe.w/2;

            if ( pipe.passed === false && leftEdgeBird > rightEdgePipe ) {
                pipe.passed = true; // dont count again
                score++;
            }
        }
        // draw score and keep it in the center
        displayScore();
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
    
    pipeGroup.add(bottomPipe);

    // now the top pipe sprite
    topPipe = new Sprite(bird.x + 400, midY - gap/2 -200, 52, 320, 'static');
    topPipe.img = pipe;
    topPipe.rotation = 180; // upside down
    topPipe.passed = false;

    pipeGroup.add(topPipe);

    pipeGroup.layer = 0; // go behind other sprites but on top of background image
}

// 7.2 display score
function displayScore() {
    scoreGroup.removeAll();

    let scoreString = str(score);
    let scoreArray = scoreString.split("");

    //let offset = 0;
    let offset = 0 - (scoreArray.length-1)*25/2;

    // let middle = width/2;
    let middle = camera.x;

    text("array: "+ scoreArray, 10, 100);
    for (let one of scoreArray) {
        let onedigit = new scoreGroup.Sprite(middle+offset, 35, 24, 36);
        onedigit.img = digitImgs[one];
        offset = offset + 25;
    }
}