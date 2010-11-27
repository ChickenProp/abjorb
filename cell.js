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

Cell.prototype.mass = function () {
    return this.radius * this.radius;
}

Cell.prototype.massToRadius = function (mass) {
    return Math.sqrt(mass);
}

Cell.prototype.clickHandler = function (e) {
    var loc = $V(e.pageX - G.canvas.offsetLeft,
		 e.pageY - G.canvas.offsetTop);

    var direction = this.pos.s(loc).normalize();

    var spawn = new Cell();

    spawn.radius = 3;
    var spawnVelRel = direction.m(-3);

    this.radius = this.massToRadius(this.mass() - spawn.mass());
    var thisVelRel = spawnVelRel.m( - spawn.mass() / this.mass() );

    spawn.vel = this.vel.a(spawnVelRel);
    this.vel = this.vel.a(thisVelRel);

    spawn.pos = this.pos;

    G.world.addCell(spawn);
}
