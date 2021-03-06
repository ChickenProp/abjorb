function Global () {
	this.canvas = $("canvas")[0];
	this.context = this.canvas.getContext("2d");
	this.screenCentre = $V(this.canvas.width/2, this.canvas.height/2);

	this.lowGraphics = false;

	this.time = 0;

	this.images = {};
	bluecell = new Image();
	bluecell.src = 'media/cell-blue.png?'+(new Date()).getTime();
	this.images.bluecell = bluecell;
	redcell = new Image();
	redcell.src = 'media/cell-red.png?'+(new Date()).getTime();
	this.images.redcell = redcell;
	pinkcell = new Image();
	pinkcell.src = 'media/cell-green.png?'+(new Date()).getTime();
	this.images.pinkcell = pinkcell;
	orangecell = new Image();
	orangecell.src = 'media/cell-orange.png?'+(new Date()).getTime();
	this.images.orangecell = orangecell;
	purplecell = new Image();
	purplecell.src = 'media/cell-purple.png?'+(new Date()).getTime();
	this.images.purplecell = purplecell;
	world = new Image();
	world.src = 'media/background.png?'+(new Date()).getTime();
	this.images.world = world;
	button = new Image();
	button.src = 'media/button.png?'+(new Date()).getTime();	
	this.images.button = button;
	splash = new Image();
	splash.src = 'media/logo.png?'+(new Date()).getTime();	
	this.images.splash = splash;
	
	this.multiplayer = false
	this.net = new Net();
}

Global.prototype.createWorld = function () {
	this.world = new World();
	this.current = this.world;
}


Global.prototype.createTitle = function () {
	this.title = new Title(0);
	this.current = this.title;
}
