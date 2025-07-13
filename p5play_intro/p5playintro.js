let ball;
let floor;

function setup() {
  // Set up the canvas
  new Canvas(400, 400);
  background(250); //background color

  // Basic shape testing
  // write your codes here
  // fill("skyblue");
  // stroke("pink");
  // strokeWeight(10);

  // circle(30,30,50);
  // rect(50,50,100,200);

  // End Basic shape testing

   // Create a bouncing ball sprite
   // write your codes here
  ball = new Sprite();
  ball.diameter = 50;

  floor = new Sprite();
  floor.w = 200;
  floor.h = 25;
  floor.x = 200;
  floor.y = 300;
}

function draw() {
  // write your codes here
  floor.y = mousey;
}