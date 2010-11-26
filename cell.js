function Cell (pos, vel, radius) {
    this.pos = pos;
    this.vel = vel;

    this.radius = radius;
}

Cell.prototype.update = function () {
    this.pos = this.pos.a(this.vel);
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
