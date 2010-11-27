function Cell (pos, vel, radius) {
	this.pos = pos;
	this.vel = vel;

	this.radius = radius;
	this.dead = false;
}

Cell.prototype.kill = function () {
	this.dead = true;
	this.radius = 0;
}

Cell.prototype.update = function () {
	this.pos = this.pos.a(this.vel);

	if ( this.pos.x < (this.radius + 5))
		this.vel.x = -this.vel.x;
	if ( this.pos.x > G.world.width - (this.radius + 5) )
		this.vel.x = -this.vel.x;
	if ( this.pos.y < (this.radius + 5) )
		this.vel.y = -this.vel.y;
	if ( this.pos.y > G.world.height - (this.radius + 5) )
		this.vel.y = -this.vel.y;
}

Cell.prototype.draw = function () {
	ctx = G.context;
	
	ctx.drawImage(G.images.cell, this.pos.x-this.radius-G.world.camera.x, this.pos.y-this.radius-G.world.camera.y, this.radius*2, this.radius*2);
}

// Distance between the closest points of two cells. 0 if they are tangent,
// negative if they are intersecting.
Cell.prototype.distance = function (other) {
	return this.pos.s(other.pos).length() - (this.radius + other.radius);
}

Cell.prototype.absorb = function (other, maxRadius) {
	var amount = other.radiusToMass(maxRadius);

	var momentum;

	if (other.mass() <= amount) {
		momentum = other.vel.m(other.mass());
		this.incMass(other.mass());
		other.kill();
	}
	else {
		momentum = other.vel.m(amount);
		this.incMass(amount);
		other.incMass(-amount);
	}

	this.vel = this.vel.a(momentum.d(this.mass()));
}

Cell.prototype.mass = function () {
	return this.radiusToMass(this.radius);
}

Cell.prototype.setMass = function (m) {
	this.radius = this.massToRadius(m);
}
Cell.prototype.incMass = function (m) {
	this.setMass(this.mass() + m);
}

Cell.prototype.massToRadius = function (mass) {
	return Math.sqrt(mass);
}
Cell.prototype.radiusToMass = function (radius) {
	return radius * radius;
}

Cell.prototype.clickHandler = function (e) {
	var loc = $V(e.pageX - G.canvas.offsetLeft + G.world.camera.x,
		     e.pageY - G.canvas.offsetTop + G.world.camera.y);

	var direction = this.pos.s(loc).normalize();

	var spawn = new Cell();

	spawn.radius = spawn.massToRadius(this.mass()*0.05);
	var spawnVelRel = direction.m(-3);

	this.radius = this.massToRadius(this.mass() - spawn.mass());
	var thisVelRel = spawnVelRel.m( - spawn.mass() / this.mass() );

	spawn.vel = this.vel.a(spawnVelRel);
	this.vel = this.vel.a(thisVelRel);

	spawn.pos = this.pos.a(direction.m(-this.radius - spawn.radius));

	G.world.addCell(spawn);
}
