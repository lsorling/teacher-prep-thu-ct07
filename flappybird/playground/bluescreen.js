// variables
let score = 0;
let digitImgs = [];
let scoreSprite;
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

    scoreSprite = new Sprite();
    scoreSprite.w = 24;
    scoreSprite.h = 36;
    scoreSprite.collider = "none";
    scoreSprite.img = digitImgs[0];
}

function draw() {
    background("steelblue");

    if ( kb.presses("up") ) {
        score++;
    }
    else if ( kb.presses("down") ) {
        score--;
    }

    textSize(16);
    text("score: " + score, 20, 50);
}

function displayScore() {

}

/*
week 9
sebastian tell me, teacher my codes not working again
his game over has multiple game over images, and pipes still coming

solution: add a noLoop(); statement once game over label is created and visible.
*/