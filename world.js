function World () {
    this.width = 640;
    this.height = 480;

    this.cells = [];

    this.player = this.addCell(new Cell($V(320, 240), $V(0, 0), 20));
}

World.prototype.update = function () {
	$.each(this.cells, function(i, c) { c.update(); });

	this.handleCollisions(this.checkCollisions());
}

World.prototype.draw = function () {
    G.context.fillStyle = "rgb(200, 200, 200)";
    G.context.fillRect(0, 0, G.canvas.width, G.canvas.height);

    $.each(this.cells, function(i, c) { c.draw(); });
}

World.prototype.addCell = function (cell) {
    this.cells.push(cell);
    return cell;
}

World.prototype.checkCollisions = function () {
	var collisions = [];

	for (var i = 0; i < this.cells.length; i++) {
		for (var j = i+1; j < this.cells.length; j++) {
			var d = this.cells[i].distance(this.cells[j]);
			if (d < 0) {
				collisions.push({
					pair: [this.cells[i], this.cells[j]],
					intersection: -d
				});
			}
		}
	}
    
	return collisions;
}

World.prototype.handleCollisions = function (collisions) {
    $.each(collisions, function(i, coll) {
	if (coll.pair[0].mass() >= coll.pair[1].mass())
	    coll.pair[0].absorb(coll.pair[1], coll.intersection);
	else
	    coll.pair[1].absorb(coll.pair[0], coll.intersection);
    });
}

