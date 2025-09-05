// variables
let score = 0;
let digitImgs = [];
let scoreGroup;

function preload() {
    let prefix = "assets/";
    let postfix = ".png";
    let filename = "";

    for (let count =0; count<10; count++) {
        filename = prefix + count + postfix;
        digitImgs[count] = filename;
    }
}

function setup() {
    new Canvas(400,600);
    background("steelblue");

    scoreGroup = new Group();
    scoreGroup.collider = "none"; // non-interacting with other sprites like player or pipes
    scoreGroup.layer = 1000; // frontmost layer
}

function draw() {
    background("steelblue");

    if ( kb.presses("up") ) {
        score++;
    }
    else if ( kb.presses("down") ) {
        score--;
    }
    else if ( kb.presses("3") ) {
        score = 888;
    }
    score = constrain(score,0,999);
    displayScore();
    
    textSize(16);
    text("score: " + score, 20, 50);
}

function displayScore() {
    scoreGroup.removeAll();

    let scoreString = str(score);
    let scoreArray = scoreString.split("");

    let offset = 0;
    let offset = 0 - (scoreArray.length-1)*25/2;
    let middle = width/2;

    text("array: "+ scoreArray, 20, 70);
    for (let one of scoreArray) {
        let onedigit = new scoreGroup.Sprite(middle+offset, height/2, 24, 36);
        onedigit.img = digitImgs[one];
        offset = offset + 25;
    }
}

/*
week 9
sebastian tell me, teacher my codes not working again
his game over has multiple game over images, and pipes still coming

solution: add a noLoop(); statement once game over label is created and visible.
*/