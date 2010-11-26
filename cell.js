function Cell (pos, vel, radius) {
    this.pos = pos;
    this.vel = vel;

    this.radius = radius;
}

Cell.prototype.update = function () {
    this.pos = this.pos.add(this.vel);
}

Cell.prototype.draw = function () {
    ctx = G.context;

    ctx.fillStyle = "rgb(200, 0, 0)";
    ctx.beginPath();
    ctx.arc(this.pos.e(1), this.pos.e(2), this.radius, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
}

Cell.prototype.clickHandler = function (e) {
    var loc = $V([e.clientX - G.canvas.offsetLeft,
		  e.clientY - G.canvas.offsetTop]);

    var offset = this.pos.subtract(loc);

    this.vel = this.vel.add(offset.toUnitVector().x(1/2));
}
