let ball;
let floor;
let score = 0;

function preload() {

}

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
  burgerImg = loadImage("assets/burger-icon.avif"); // my own learning
  let abc = new Sprite();
  abc.image = burgerImg;
  abc.image.scale = 0.5;

   // Create a bouncing ball sprite
   // write your codes here
  ball = new Sprite();
  ball.x = 50;
  ball.y = 50;
  // ball.vel.x = 7; // start with vel.x = 1
  // ball.vel.y = 7; // start with vel.y = 1
  ball.diameter = 50;

  floor = new Sprite();
  floor.w = 200;
  floor.h = 25;
  floor.x = 200;
  floor.y = 300;
  floor.collider = "static";
}

function draw() {
  // what happen when you forget this line?
  background(250); //background color

  textSize(16);
  text("Score: " + score, 150, 150);

  if (ball.x > width) {
    ball.vel.x = ball.vel.x * -1;
    score = score + 1;
  }
  if (ball.x < 0) {
    ball.vel.x = ball.vel.x * -1;
    score = score + 1;
  }

  // let students do y themselves
  if (ball.y > width) ball.vel.y = ball.vel.y * -1;
  if (ball.y < 0) ball.vel.y = ball.vel.y * -1;

  // write your codes here
  floor.x = mouse.x;
  // if still have time
  floor.y = mouse.y;

  // challenge: how to not let the ball go half-body into the wall
  // then bounce
  // immediately touch circumference, must bounce le
}