import p5 from 'p5';
import * as utils from '../utils';

function setup() {  
  let c = createCanvas(400, 400);
  c.parent('canvas-parent');
  reset();
}

function reset() {
  fill(random(55) + 100);
}

function draw() {
  rect(0, 0, width, height);
}

utils.attach({
  setup,
  draw,
  mouseReleased: utils.standardMouseReleasedFactory(reset),
  keyPressed: utils.standardKeyPressed
});
