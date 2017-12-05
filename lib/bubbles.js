import Util from './utils'

function Bubbles(options) {
  this.pos = options.pos;
  this.vel = options.vel; 
  this.radius = options.radius;
  this.color = options.color;
  this.game = options.game;
};

Bubbles.prototype.collideWith = function collideWith(otherObject) {
  this.vel[0] = -this.vel[0];
  this.vel[1] = -this.vel[1];
  console.log("collideWith")
  return true;
};

Bubbles.prototype.draw = function draw(ctx) {
  ctx.fillStyle = this.color;

  ctx.beginPath();
  ctx.arc(
    this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
  );
  ctx.fill();

  if (this.pos[0] - this.radius < 0 || this.pos[0] + this.radius > 800) this.vel[0] = -this.vel[0];
  if (this.pos[1] - this.radius < 0 || this.pos[1] + this.radius > 600) this.vel[1] = -this.vel[1];

};

Bubbles.prototype.isCollidedWith = function isCollidedWith(otherObject) {
  const centerDist = Util.dist(this.pos, otherObject.pos);
  // console.log("in isCollidedWith")
  // console.log(centerDist === (this.radius * 2));
  if (centerDist < (this.radius * 2)) {
    this.vel[0] = -this.vel[0];
    this.vel[1] = -this.vel[1];
  } ;
};

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;
Bubbles.prototype.move = function move(timeDelta) {

  const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
    offsetX = this.vel[0] * velocityScale,
    offsetY = this.vel[1] * velocityScale;

  this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
};



// Bubble.prototype.remove = function remove() {
//   this.game.remove(this);
// };

export default Bubbles;