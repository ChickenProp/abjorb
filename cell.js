function Cell (pos, vel, radius) {
    this.pos = pos;
    this.vel = vel;

    this.radius = radius;
    this.friction = 99/100;
}

Cell.prototype.update = function () {
    this.pos = this.pos.a(this.vel);

	if ( this.pos.x < this.radius )
		this.vel.x = -this.vel.x;
	if ( this.pos.x > 640 - this.radius )
		this.vel.x = -this.vel.x;
	if ( this.pos.y <  this.radius )
		this.vel.y = -this.vel.y;
	if ( this.pos.y > 480 - this.radius )
		this.vel.y = -this.vel.y;

    this.vel = this.vel.m(this.friction);
}

Cell.prototype.draw = function () {
    ctx = G.context;

    ctx.fillStyle = "rgb(200, 0, 0)";
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
}

Cell.prototype.clickHandler = function (e) {
    var loc = $V(e.pageX - G.canvas.offsetLeft,
		 e.pageY - G.canvas.offsetTop);

    var offset = this.pos.s(loc);

    this.vel = this.vel.a(offset.normalize().d(2));
}
