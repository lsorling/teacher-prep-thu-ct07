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
    scoreGroup.
}

function draw() {
    background("steelblue");

    if ( kb.presses("up") ) {
        score++;
    }
    else if ( kb.presses("down") ) {
        score--;
    }
    score = constrain(score,0,9);
    
    textSize(16);
    text("score: " + score, 20, 50);
}

function displayScore() {
    scoreSprite.img = digitImgs[score];
}

/*
week 9
sebastian tell me, teacher my codes not working again
his game over has multiple game over images, and pipes still coming

solution: add a noLoop(); statement once game over label is created and visible.
*/