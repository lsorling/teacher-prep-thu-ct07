/*
missing sound effects
and increasing difficult as time passes
*/

let bg;
let gameState = "start"; // start-play-gameover (3 states)
// why use state machine, vs using boolean (startGame true or false)

let score = 3;
let missed = 0;
let timer = 60; // he finished coding timer to decrease every 1 second
                // once hit 0, its game over for now

let fcStart; // this part, he accepted thou he keep saying Teacher my code is working what!

let fruitGroup; // use Group to manage all the fruits
let fruitHalves; // use Group for all sliced fruits

let peach;
let watermelon;

let fruitTypes;

let lemon;
let bomb;

function preload() {
    bg = loadImage("assets/dojobackground.png");

    // javascript object with properties
    // we used it before, topPipe.passed = false, in flappybird game
    peach = {
        type: "peach",
    };

    peach.half = loadImage("assets/peachhalf.png");
    peach.whole = loadImage("assets/peachwhole.png");

    watermelon = { 
        type: "watermelon", 
    };

    watermelon.half = loadImage("assets/watermelonhalf.png");
    watermelon.whole = loadImage("assets/watermelonwhole.png");

    lemon = {
        type: "lemon",
    };

    lemon.half = loadImage("assets/cut_lemon.png");
    lemon.whole = loadImage("assets/lemon.png");

    bomb = {
        type: "bomb",
    }

    bomb.half = loadImage("assets/watermelonsplash.png");
    bomb.whole = loadImage("assets/fruitbomb.png");

    fruitTypes = [peach, watermelon, lemon, bomb];
}

function setup() {
    new Canvas(800,600);
    background("skyblue");

    world.gravity.y = 10; // must remember this

    fruitGroup = new Group();
    fruitHalves = new Group(); // from slides deck 2 after fruit disappeared!
}

function draw() {
    clear(); // why use this
    image(bg,0,0,width,height);

    if (gameState === "start") {
        showStartScreen();

        // 1.extra (test him)
        // add space key or mouse click to start the game
        if ( kb.presses("space") || mouse.presses() ) {
            gameState = "play";

            fcStart = frameCount; // remember this moment
            return;
        }
    }
    else if (gameState === "play") {
        showGameStats();

        // timer to start counting down
        if ( (frameCount-fcStart+1) %60===0 ) {
            timer--;
        }

        // checking for game over
        if (timer === 0) {
            gameState = "gameover";
            return;
        }

        // wait for user event
        // if ( kb.presses("space") || mouse.presses() ) {

        // }

        //
        // slice fruit animation using mouse pressed and drag movement
        //
        // this mouse.pressing() is new for this lesson
        //
        if (mouse.pressing()) {
            // mouse pressed and hold
            let slicing = new Sprite(mouseX, mouseY, 7);
            slicing.collider = "none"; // ask him what is valid values for collider? what is default value?
            slicing.stroke = "red"; // i found out about this via online search
            slicing.color = "red";
            slicing.life = 10; // 10 frames

            sliceFruit(); // fruit becomes half after slicing. fly in both direction: left and right
        }

        // spawn fruit every 1 second instead of user event
        if ( (frameCount-fcStart+2) %90 ===0 ) {
            spawnFruit();
        } 

        // 2.extra - challenge him to show length of children in fruitGroup
        // debugging to see how many in fruitGroup
        fill("white");
        textSize(18);
        textAlign(LEFT, CENTER);
        text("fruitGroup.length: " + fruitGroup.length, 20,70);

        // 3.extra - challenge him to remove when y position is outside the height of canvas
        for (let one of fruitGroup) {
            if (one.y > height+50) {
                const whatIsIt = one.data;
                one.remove();

                // dont count those "bombs"
                if (whatIsIt.type != "bomb") {
                    missed++; // already not visible, count as missed
                }
            }
        }

        // 4.extra - how to do "missed" variable?
    }
    else if (gameState === "gameover") {
        fruitGroup.removeAll();
        fruitHalves.removeAll();

        showGameOver();

        // wait for user events
        if ( kb.presses("space") || mouse.presses() ) {
            gameState = "play";

            // erase everything
            score = 0;
            missed = 0;
            timer = 60;
            fcStart = frameCount; // remember this moment

            return;
        }
    }
}

// slide deck 2
// take note of all the properties
// explain function that takes in parameters
//
function splitFruit(xpos, ypos, fruitObject) {
    // i do for left half of fruit
    let left = new fruitHalves.Sprite(xpos-10, ypos, 40);
    left.img = fruitObject.half;
    left.vel.x = -3; // veer left
    left.vel.y = random(-5, -2);
    left.rotationSpeed = -5; // rotate left
    left.life = 30; // half a second

    // let him do right half of fruit
    let right = new fruitHalves.Sprite(xpos+10, ypos, 40);
    right.img = fruitObject.half;
    right.vel.x = 3; // veer right
    right.vel.y = random(-5, -2);
    right.rotationSpeed = 5; // rotate right
    right.life = 30; // half a second
}

function sliceFruit() {
    // loop thru all fruits still on screen
    for (let fruit of fruitGroup) {
        if (fruit.sliced) {
            continue; // move on to the next fruit in the group
        }

        // if fruit is still whole
        // calculate the dist
        let d = dist(mouseX, mouseY, fruit.x, fruit.y);
        // since using fruit.d (ie the diameter)
        // check spawnFruit() carefully
        if (d < (fruit.d/2)+5) {
            fruit.sliced = true;

            const fx = fruit.x;
            const fy = fruit.y;
            const whatIsIt = fruit.data; // see line 208 in spawnFruit()

            fruit.remove();
            // explain how to pass parameters to a custom function
            splitFruit(fx, fy, whatIsIt);

            if (whatIsIt.type === "bomb") {
                gameState = "gameover";
            } 
            else {
                score++
            }

            break; // slice only 1 fruit at each time
        }
    }
}

function spawnFruit() {
    let abc = new fruitGroup.Sprite();
    abc.x = random(300,500);
    abc.y = height-50;
    abc.diameter = 40; // random(20,35);

    // random choose a fruit to throw
    let selected = random(fruitTypes);
    abc.img = selected.whole;
    abc.data = selected; // save the whole thing

    // take note of this line
    abc.friction = 0; // no friction

    abc.vel.x = random(-2,2); // either left or right
    abc.vel.y = random(-10, -13); // one question from student: can random generate negative numbers?
}

function showStartScreen() {
    fill("red");
    textSize(48);
    textAlign(CENTER, CENTER);
    text("Fruit Ninja", width/2, height/2);
    fill("white");
    textSize(24);
    text("Press SPACE key to play the game", width/2, height/2+50);
}

function showGameStats() {
    fill("white");
    textSize(24);
    // on top bar
    // use 3 sections
    // left
    textAlign(LEFT, CENTER);
    text("Score: "+ score, 20, 25);

    // middle    
    textAlign(CENTER, CENTER);
    text("Missed: "+ missed, width/2, 25);
    // right
    textAlign(RIGHT, CENTER);
    text("Time: "+ timer, width-20, 25);

}

function showGameOver() {
    fill("red");
    textSize(48);
    textAlign(CENTER, CENTER);
    text("GAME OVER", width/2, height/2);
    fill("white");
    textSize(24);
    text("Score: "+ score, width/2, height/2+50);
    text("Missed Fruits: "+missed, width/2, height/2+85);
    text("Press SPACE key to play the game again", width/2, height/2+120);
}