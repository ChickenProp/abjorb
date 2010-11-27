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

	if ( this.pos.x < this.radius )
		this.vel.x = -this.vel.x;
	if ( this.pos.x > 640 - this.radius )
		this.vel.x = -this.vel.x;
	if ( this.pos.y <  this.radius )
		this.vel.y = -this.vel.y;
	if ( this.pos.y > 480 - this.radius )
		this.vel.y = -this.vel.y;
}

Cell.prototype.draw = function () {
	ctx = G.context;
	
	ctx.drawImage(G.images.cell, this.pos.x-this.radius,
		      this.pos.y-this.radius, this.radius*2, this.radius*2);
}

// Distance between the closest points of two cells. 0 if they are tangent,
// negative if they are intersecting.
Cell.prototype.distance = function (other) {
	return this.pos.s(other.pos).length() - (this.radius + other.radius);
}

Cell.prototype.absorb = function (other, maxRadius) {
	var amount = Math.min(other.radiusToMass(maxRadius), 3);
	if (other.mass() <= amount) {
		this.incMass(other.mass());
		other.kill();
	}
	else { 
		this.incMass(amount);
		other.incMass(-amount);
	}
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
	var loc = $V(e.pageX - G.canvas.offsetLeft,
		     e.pageY - G.canvas.offsetTop);
	
	var direction = this.pos.s(loc).normalize();

	var spawn = new Cell();

	spawn.radius = spawn.massToRadius(this.mass()*0.05);
	var spawnVelRel = direction.m(-3);

	this.radius = this.massToRadius(this.mass() - spawn.mass());
	var thisVelRel = spawnVelRel.m( - spawn.mass() / this.mass() );

	spawn.vel = this.vel.a(spawnVelRel);
	this.vel = this.vel.a(thisVelRel);

	spawn.pos = this.pos;

	G.world.addCell(spawn);
}
