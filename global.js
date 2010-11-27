function Global () {
    this.canvas = $("canvas")[0];
    this.context = this.canvas.getContext("2d");

	this.images = [];
	cell = new Image();
	cell.src = 'media/blob.png';
	this.images.cell = cell;
}

Global.prototype.createWorld = function () {
   this.world = new World();
}
