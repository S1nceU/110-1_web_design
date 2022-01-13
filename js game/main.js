var puzzle;
var imgCb;

function preload() {
  imgCb = loadImage("2Q.jpg"); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  var x0 = windowWidth/2 - imgCb.width/2;
  var y0 = windowHeight/2 - imgCb.height/2;
  puzzle = new Puzzle(x0, y0, imgCb, 3);
}

function draw() {
  clear();
  puzzle.draw();
}

function mousePressed() {
  puzzle.mousePressed(mouseX, mouseY);
}

function mouseDragged() {
  puzzle.mouseDragged(mouseX, mouseY);
}

function mouseReleased() {
  puzzle.mouseReleased();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}