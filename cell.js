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
	if ( this.pos.x > G.world.width - this.radius )
		this.vel.x = -this.vel.x;
	if ( this.pos.y <  this.radius )
		this.vel.y = -this.vel.y;
	if ( this.pos.y > G.world.height - this.radius )
		this.vel.y = -this.vel.y;

    this.vel = this.vel.m(this.friction);
}

Cell.prototype.draw = function () {
    ctx = G.context;

	ctx.drawImage(G.images.cell, this.pos.x-this.radius-G.world.camera.x, this.pos.y-this.radius-G.world.camera.y, this.radius*2, this.radius*2);
}

Cell.prototype.mass = function () {
    return this.radius * this.radius;
}

Cell.prototype.massToRadius = function (mass) {
    return Math.sqrt(mass);
}

Cell.prototype.clickHandler = function (e) {
    var loc = $V(e.pageX - G.canvas.offsetLeft + G.world.camera.x,
		 e.pageY - G.canvas.offsetTop + G.world.camera.y);

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
