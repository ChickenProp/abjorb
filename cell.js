function Cell (pos, vel, radius) {
	this.pos = pos;
	this.vel = vel;

	this.radius = radius;
	this.dead = false;
	
	// This is a ratio of current mass.
	this.minspawnmass = 0.05;
	this.spawnmassratio = 1.3;
	this.maxspawnmass = this.minspawnmass * Math.pow(this.spawnmassratio,4);
	this.spawnmass = this.minspawnmass;
	this.lastspawn = -Infinity;
}

Cell.prototype.kill = function () {
	this.dead = true;
	this.radius = 0;
}

Cell.prototype.update = function () {
	this.pos = this.pos.a(this.vel);

	if ( this.pos.x < (this.radius + 5)) {
		this.vel.x = -this.vel.x;
		this.pos.x = (this.radius + 5);
	} if ( this.pos.x > G.world.width - (this.radius + 5) ) {
		this.vel.x = -this.vel.x;
		this.pos.x = G.world.width - (this.radius + 5);
	} if ( this.pos.y < (this.radius + 5) ) {
		this.vel.y = -this.vel.y;
		this.pos.y = (this.radius + 5);
	} if ( this.pos.y > G.world.height - (this.radius + 5) ) {
		this.vel.y = -this.vel.y;
		this.pos.y = G.world.height - (this.radius + 5);
	}

	if (this.lastspawn <= G.time - 10) {
		this.spawnmass /= this.spawnmassratio;
		this.spawnmass = Math.max(this.spawnmass, this.minspawnmass);
	}
}

Cell.prototype.draw = function () {
	ctx = G.context;
	
	var posScreen = G.world.camera.worldToScreen(this.pos);
	var zoomrad = G.world.camera.zoom * this.radius;

	if (posScreen.x + zoomrad < 0
	    || posScreen.x - zoomrad > G.canvas.width
	    || posScreen.y + zoomrad < 0
	    || posScreen.y - zoomrad > G.canvas.height)
		return;

	if (G.lowGraphics) {
		ctx.fillStyle = this.colour();
		ctx.beginPath();
		ctx.arc(posScreen.x, posScreen.y, zoomrad, 0, Math.PI*2, true);
		ctx.closePath();
		ctx.fill();
	}
	else {
		// 75/57 is because the image is stupid-sized.
		var drawRadius = zoomrad * 75/57;
		ctx.drawImage(this.image(),
			      posScreen.x - drawRadius,
			      posScreen.y - drawRadius,
			      drawRadius*2,
			      drawRadius*2);
	}
}

Cell.prototype.colour = function () {
	return (G.world.player === undefined || this.radius > G.world.player.radius) ? 'red' : 'blue';
}

Cell.prototype.image = function () {
	return G.images[this.colour() + 'cell'];
}

// Distance between the closest points of two cells. 0 if they are tangent,
// negative if they are intersecting.
Cell.prototype.distance = function (other) {
	return this.pos.s(other.pos).length() - (this.radius + other.radius);
}

Cell.prototype.absorb = function (other, maxRadius) {
	if (other.dead)
		return;

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
	return Math.pow(mass, 1/3);
}
Cell.prototype.radiusToMass = function (radius) {
	return Math.pow(radius, 3);
}

Cell.prototype.clickHandler = function (loc) {
	if (G.time - this.lastspawn <= 3)
		return;

	var direction = this.pos.s(loc).normalize();

	var spawn = new Cell();

	spawn.radius = spawn.massToRadius(this.mass()*this.spawnmass);
	var spawnVelRel = direction.m(-4);

	this.radius = this.massToRadius(this.mass() - spawn.mass());
	var thisVelRel = spawnVelRel.m( - spawn.mass() / this.mass() );

	spawn.vel = this.vel.a(spawnVelRel);
	this.vel = this.vel.a(thisVelRel);

	spawn.pos = this.pos.a(direction.m(-this.radius - spawn.radius));

	G.world.addCell(spawn);

	this.spawnmass *= this.spawnmassratio;
	this.spawnmass = Math.min(this.spawnmass, this.maxspawnmass);
	this.lastspawn = G.time;
}
