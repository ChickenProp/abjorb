function Global () {
	this.canvas = $("canvas")[0];
	this.context = this.canvas.getContext("2d");
	this.screenCentre = $V(this.canvas.width/2, this.canvas.height/2);

	this.lowGraphics = false;

	this.time = 0;

	this.images = [];
	bluecell = new Image();
	bluecell.src = 'media/blobsarah2.png?'+(new Date()).getTime();
	this.images.bluecell = bluecell;
	redcell = new Image();
	redcell.src = 'media/redblob2.png?'+(new Date()).getTime();
	this.images.redcell = redcell;
	pinkcell = new Image();
	pinkcell.src = 'media/player.png?'+(new Date()).getTime();
	this.images.pinkcell = pinkcell;
	world = new Image();
	world.src = 'media/bg3.png?'+(new Date()).getTime();
	this.images.world = world;
	title = new Image();
	title.src = 'media/title.png?'+(new Date()).getTime();	
	this.images.title = title;
	
	this.current = new Title();
	
	this.net = new Net();
}

Global.prototype.createWorld = function () {
	this.world = new World();
	this.current = this.world;
}
