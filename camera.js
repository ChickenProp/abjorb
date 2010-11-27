function Camera (pos) {
	this.pos = pos.copy();
	this.zoom = 2;
}

Camera.prototype.screenToWorld = function (v) {
	var offset = v.s(G.screenCentre);
	return this.pos.a(offset.d(this.zoom));
}

Camera.prototype.worldToScreen = function (v) {
	var offset = G.screenCentre.s(this.pos.m(this.zoom));
	return v.m(this.zoom).a(offset);
}

Camera.prototype.update = function () {
	if (G.world.player.dead)
		return;

	var ppos = G.world.player.pos.copy();

	var rel = ppos.s(this.pos);

	var margin = 1/4; // relative to screen size
	var comargin = 1/2 - margin; // relative distance from centre to margin

	var wzoom = G.canvas.width / this.zoom;
	var hzoom = G.canvas.height / this.zoom;

	var mw = G.canvas.width * margin;
	var cw = G.canvas.width * comargin;
	var mh = G.canvas.height * margin;
	var ch = G.canvas.height * comargin;

	if (rel.x > wzoom * comargin)
		this.pos.x = ppos.x - wzoom * margin;
	else if (rel.x < - wzoom * comargin)
		this.pos.x = ppos.x + wzoom * margin;

	if (rel.y > hzoom * comargin)
		this.pos.y = ppos.y - hzoom * margin;
	else if (rel.y < - hzoom * comargin)
		this.pos.y = ppos.y + hzoom * margin;

	this.pos.x = Math.max(wzoom / 2, this.pos.x);
	this.pos.x = Math.min(G.world.width - wzoom / 2, this.pos.x);

	this.pos.y = Math.max(hzoom / 2, this.pos.y);
	this.pos.y = Math.min(G.world.height - hzoom / 2, this.pos.y);
}

Camera.prototype.scrollHandler = function (e) {
	if (e.wheelDelta > 0)
		this.zoom += 0.1;
	else if (e.wheelDelta < 0)
		this.zoom -= 0.1;
}
