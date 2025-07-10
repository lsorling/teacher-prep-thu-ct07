// once
function setup() {
    new Canvas(300, 300);
    background(250);
}

// forever; 60 times in one second
function draw() {
    fill("orange");
    ellipse(150,150,50,50);
}