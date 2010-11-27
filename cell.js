function Cell (pos, vel, radius) {
	this.pos = pos;
	this.vel = vel;

	this.radius = radius;
	this.dead = false;
	
	this.colour = 'blue';
}

Cell.prototype.kill = function () {
	this.dead = true;
	this.radius = 0;
}

Cell.prototype.update = function () {
	if (isNaN(this.pos.x)
	    || isNaN(this.vel.x))
		console.log("a cell is NaN");

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
		ctx.fillStyle = this.colour;
		ctx.beginPath();
		ctx.arc(posScreen.x, posScreen.y, zoomrad, 0, Math.PI*2, true);
		ctx.closePath();
		ctx.fill();
	}
	else {
		// 75/57 is because the image is stupid-sized.
		var drawRadius = zoomrad * 75/57;
		ctx.drawImage(G.images[this.colour+'cell'],
			      posScreen.x - drawRadius,
			      posScreen.y - drawRadius,
			      drawRadius*2,
			      drawRadius*2);
	}
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

	if (isNaN(this.vel.x) || isNaN(other.vel.x))
		console.log("a new cell is NaN");
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
	var screenLoc = $V(e.pageX - G.canvas.offsetLeft,
			   e.pageY - G.canvas.offsetTop);
	var loc = G.world.camera.screenToWorld(screenLoc);

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

Cell.prototype.setColour = function (colour) {
	this.colour = colour;
}
