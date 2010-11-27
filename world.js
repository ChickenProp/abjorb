function World () {
	this.width = 800;
	this.height = 640;

	this.cells = [];
	
	this.camera = new Camera(G.screenCentre);
	//this.camera = new Camera($V(0,0));
}

World.prototype.addPlayer = function () {
	this.player = this.addCell(new Cell($V(320, 240), $V(0, 0), 4));
	this.player.colour = function () { return "pink"; };
}

World.prototype.level = function () {
	for (i = 0; i < 100; i++) {
		this.addCell(new Cell($V((Math.random()*this.width-40)+20,
					 (Math.random()*this.height-40)+20),
				      $V(0.1*(Math.random()-0.5), 0.1*(Math.random()-0.5)),
				      6*Math.random()+6));
	}
	for (i = 0; i < 1000; i++) {
		this.addCell(new Cell($V((Math.random()*this.width-40)+20,
					 (Math.random()*this.height-40)+20),
				      $V(0.1*(Math.random()-0.5), 0.1*(Math.random()-0.5)),
				      4*Math.random()));
	}
}

World.prototype.update = function () {
	$.each(this.cells, function(i, c) { c.update(); });

	this.handleCollisions(this.checkCollisions());

	this.garbageCollect();

	this.camera.update();
}

World.prototype.draw = function () {
	G.context.fillStyle = "rgb(255, 255, 255)";
	G.context.fillRect(0, 0, G.canvas.width, G.canvas.height);

	if (!G.lowGraphics) {
		var topleft = this.camera.worldToScreen($V(0, 0));
		G.context.drawImage(G.images.world, topleft.x, topleft.y,
				    G.images.world.width * this.camera.zoom,
				    G.images.world.height * this.camera.zoom);
	}

	for (var i = 0; i < this.cells.length; i++) {
		this.cells[i].draw();
	}
}

World.prototype.addCell = function (cell) {
	this.cells.push(cell);
	return cell;
}

World.prototype.garbageCollect = function () {
	var newCells = [];
	$.each(this.cells, function (i, c) {
		if (!c.dead)
			newCells.push(c);
	});
	this.cells = newCells;
}

World.prototype.checkCollisions = function () {
	var collisions = [];

	// Sort the cells by their leftmost point. When looking at cell i, if we
	// find a cell whose leftmost point is right of cell i's rightmost
	// point, we don't have to compare any others against cell i.
	var cells = this.cells.sort(function(cell1, cell2) {
		var l1 = cell1.pos.x - cell1.radius;
		var l2 = cell2.pos.x - cell2.radius;

		if (l1 < l2)
			return -1;
		else if (l1 > l2)
			return 1;
		else
			return 0;
	});

	for (var i = 0; i < cells.length; i++) {
		var right = cells[i].pos.x + cells[i].radius;

		for (var j = i+1;
		     j < cells.length && cells[j].pos.x-cells[j].radius < right;
		     j++)
		{

			var d = cells[i].distance(cells[j]);
			if (d < 0) {
				collisions.push({
					pair: [cells[i], cells[j]],
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

World.prototype.clickHandler = function (e){
	var screenLoc = $V(e.pageX - G.canvas.offsetLeft,
		   e.pageY - G.canvas.offsetTop);
	this.camera.screenToWorld(screenLoc)
	this.player.clickHandler(screenLoc)
}

World.prototype.scrollHandler = function (e){
	this.camera.scrollHandler(e);

}




