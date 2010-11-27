function World () {
    this.width = 800;
    this.height = 640;

    this.cells = [];
	
	this.camera = {
		x: Math.floor(this.width/2)-G.canvas.width/2,
		y: Math.floor(this.height/2)-G.canvas.height/2
	}

    this.player = this.addCell(new Cell($V(320, 240), $V(0, 0), 20));
}

World.prototype.update = function () {
	world = this;
    $.each(this.cells, function(i, c) { c.update(); });
	if (this.camera.x-this.player.pos.x+G.canvas.width/2 > 50) {
		this.camera.x = this.player.pos.x-G.canvas.width/2 + 50;
	} else if (this.camera.x-this.player.pos.x+G.canvas.width/2 < -50) {
		this.camera.x = this.player.pos.x-G.canvas.width/2 - 50;
	}
	if (this.camera.y-this.player.pos.y+G.canvas.height/2 > 50) {
		this.camera.y = this.player.pos.y-G.canvas.height/2 + 50;
	} else if (this.camera.y-this.player.pos.y+G.canvas.height/2 < -50) {
		this.camera.y = this.player.pos.y-G.canvas.height/2 - 50;
	}
	if (this.camera.x < 0) {
		this.camera.x = 0;
	} else if (this.camera.x > (this.width - G.canvas.width)) {
		this.camera.x = this.width - G.canvas.width;
	}
	if (this.camera.y < 0) {
		this.camera.y = 0;
	} else if (this.camera.y > (this.height - G.canvas.height)) {
		this.camera.y = this.height - G.canvas.height;
	}
}

World.prototype.draw = function () {
    G.context.fillStyle = "rgb(200, 200, 200)";
    G.context.fillRect(0, 0, G.canvas.width, G.canvas.height);

	camera = this.camera;
	
	G.context.fillStyle = "rgb(150, 150, 150)";
    G.context.fillRect((this.width/2 - 10) - camera.x, (this.height/2 - 10) - camera.y, 20, 20);	

    $.each(this.cells, function(i, c) { c.draw(); });
}

World.prototype.addCell = function (cell) {
    this.cells.push(cell);
    return cell;
}

