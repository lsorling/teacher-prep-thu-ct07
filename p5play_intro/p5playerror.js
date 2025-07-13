// global variables
let ball;

// run once like when green flag clicked
function setup() {
    new Canvas(400, 600);
    // background(255); // if omitted, canvas is black color
    textSize(16);
    text("Hello", 100, 100);

    ball = new Sprite();
}

// forever
// called 60 times per 1 second
function draw() {
    // must have this IF you uses new Sprite() in setup()
    // otherwise its okay de
}
