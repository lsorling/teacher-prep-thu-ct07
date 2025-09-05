// variables
let score = 0;
let digitImgs = [];
let scoreGroup;

function setup() {
    new Canvas(400,600);
    background("steelblue");
}

function draw() {
    background("steelblue");

    if ( kb.presses("up") ) {
        
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