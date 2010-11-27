function Global () {
    this.canvas = $("canvas")[0];
    this.context = this.canvas.getContext("2d");

	this.images = [];
	cell = new Image();
	cell.src = 'media/blob.png?'+(new Date()).getTime();
	this.images.cell = cell;
	world = new Image();
	world.src = 'media/bg.png?'+(new Date()).getTime();
	this.images.world = world;
}

Global.prototype.createWorld = function () {
   this.world = new World();
}
