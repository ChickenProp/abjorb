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

	var radgrad = ctx.createRadialGradient(this.pos.x,this.pos.y,this.radius*0.5,this.pos.x,this.pos.y,this.radius);
	radgrad.addColorStop(0, '#00C9FF');
	radgrad.addColorStop(0.8, '#00B5E2');
	radgrad.addColorStop(1, 'rgba(0,201,255,0)');
	
	ctx.fillStyle = radgrad;
	
	ctx.fillRect(this.pos.x-this.radius, this.pos.y-this.radius,this.pos.x+this.radius,this.pos.y+this.radius); 
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
