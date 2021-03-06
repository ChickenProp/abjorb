function World () {
	this.width = 960;
	this.height = 720;
	this.cells = [];
	
	this.camera = new Camera(G.screenCentre);
	this.likely = true;
}

World.prototype.addPlayer = function (flag) {
	if (flag == 1)
		this.player = this.addCell(new Cell($V(320, 240), $V(0, 0), 8),false);
	else
		this.player = this.addCell(new Cell($V(320, 240), $V(0, 0), 4),false);
	this.player.colour = function () { return "pink"; };
	this.fake = false;
}
World.prototype.addFakePlayer = function (flag) {

	if (flag == 0)
		this.player = new Cell($V(320, 240), $V(0, 0), 4 );
	else if (flag == 1)	
		this.player = new Cell($V(1000, 240), $V(0, 0), 100 );
	else if (flag == 2)	
		this.player = new Cell($V(1000, 240), $V(0, 0), 0 );
	this.player.colour = function () { return "pink"; };
	this.fake = true;
}

World.prototype.staticlevel = function (flag) {
	for (j = 3 ; j >=0 ; j--){

		for (i = 0; i < 100 + flag * 50; i++) {
			var rand = Math.random()*3;
			if (rand < 2 ){ 
				var x = Math.random()*this.width-40+20;
				var y = Math.random()*this.height-40+20;
				var r = (8*Math.random()+4)*(j);
				if(!this.collisions(new Cell($V(x,y),$V(0,0),r,false ))){
					if ( this.player && ( x + r < (this.player.pos.x - this.player.radius) || x - r > (	this.player.pos.x + this.player.radius) &&
											 y + r < (this.player.pos.y - this.player.radius) || y - r > (	this.player.pos.y + this.player.radius)  )){
						this.addCell(new Cell($V(x,y),
									  $V(0,0),
									  r,false));
					}
				}
			} else {
				var x = Math.random()*this.width-40+20;
				var y = Math.random()*this.height-40+20;
				var r = (8*Math.random()+4)*(j);
				if(!this.collisions(new Cell($V(x,y),$V(0,0),r,false ))){
					if ( this.player && ( x + r < (this.player.pos.x - this.player.radius) || x - r > (	this.player.pos.x + this.player.radius) &&
											 y + r < (this.player.pos.y - this.player.radius) || y - r > (	this.player.pos.y + this.player.radius)  )){
						this.addCell(new Cell($V(x,y),
									  $V(0,0),
									  r,true));
					}
				}
			}
		}

	}
	for (i = 0; i < 1000 -(flag*200); i++) {

		var x =Math.random()*this.width-40+20;
		var y = Math.random()*this.height-40+20;
		var r =  3+10*Math.random();
		if(!this.collisions(new Cell($V(x,y),$V(0,0),r ,false))){
			if ( this.player && ( x + r < (this.player.pos.x - this.player.radius) || x - r > (	this.player.pos.x + this.player.radius) &&
									 y + r < (this.player.pos.y - this.player.radius) || y - r > (	this.player.pos.y + this.player.radius)  )){
				this.addCell(new Cell($V(x,y),
								  $V(0,0),
								  r,false));
			}
		}

	}
}

World.prototype.level = function (flag) {
	if (flag == 0 ){
		for (i = 0; i < 50; i++) {
			var x =Math.random()*this.width-40+20;
			var y = Math.random()*this.height-40+20;
			var r =  6*Math.random()+6;
			if ( this.player && ( x + r < (this.player.pos.x - this.player.radius) || x - r > (	this.player.pos.x + this.player.radius) &&
									 y + r < (this.player.pos.y - this.player.radius) || y - r > (	this.player.pos.y + this.player.radius)  )){
				this.addCell(new Cell($V(x,y),
						  $V(0.1*(Math.random()-0.5), 0.1*(Math.random()-0.5)),
						 r,false));
			}
		}
		for (i = 0; i < 1000; i++) {	
			var x =Math.random()*this.width-40+20;
			var y = Math.random()*this.height-40+20;
			var r =  1+3*Math.random();
			if ( this.player && ( x + r < (this.player.pos.x - this.player.radius) || x - r > (	this.player.pos.x + this.player.radius) &&
									 y + r < (this.player.pos.y - this.player.radius) || y - r > (	this.player.pos.y + this.player.radius)  )){

				this.addCell(new Cell($V(x, y),
							  $V(0.1*(Math.random()-0.5), 0.1*(Math.random()-0.5)),
							  r,false));
			}
		}
	} else 	if (flag == 1 ){
		for (i = 0; i < 100; i++) {
			var x = Math.random()*this.width-40+20;
			var y = Math.random()*this.height-40+20;
			var r =  6*Math.random()+6;
			if ( this.player && ( x + r < (this.player.pos.x - this.player.radius) || x - r > (	this.player.pos.x + this.player.radius) &&
									 y + r < (this.player.pos.y - this.player.radius) || y - r > (	this.player.pos.y + this.player.radius)  )){
				this.addCell(new Cell($V(x,y),
							  $V(0.1*(Math.random()-0.5), 0.1*(Math.random()-0.5)),
							 r,false));
			}
		}
		for (i = 0; i < 1000; i++) {
			var x =Math.random()*this.width-40+20;
			var y = Math.random()*this.height-40+20;
			var r =  1+3*Math.random();
			if ( this.player && ( x + r < (this.player.pos.x - this.player.radius) || x - r > (	this.player.pos.x + this.player.radius) &&
									 y + r < (this.player.pos.y - this.player.radius) || y - r > (	this.player.pos.y + this.player.radius)  )){
				this.addCell(new Cell($V(x,y),
							  $V(0.1*(Math.random()-0.5), 0.1*(Math.random()-0.5)),
							 r,false));
			}
		}
	}else if (flag == 2){
		for (i = 0; i < 300; i++) {
			var x = Math.random()*this.width-40+20;
			var y = Math.random()*this.height-40+20;
			var r = 8*Math.random()+4;
			if ( this.player && ( x + r < (this.player.pos.x - this.player.radius) || x - r > (	this.player.pos.x + this.player.radius) &&
									 y + r < (this.player.pos.y - this.player.radius) || y - r > (	this.player.pos.y + this.player.radius)  )){
				this.addCell(new Cell($V(x,y),
							  $V(0.1*(Math.random()-0.5), 0.1*(Math.random()-0.5)),
							  r,false));
			}
		}
		for (i = 0; i < 600; i++) {
			var x =Math.random()*this.width-40+20;
			var y = Math.random()*this.height-40+20;
			var r =  1+3*Math.random();
			if ( this.player && ( x + r < (this.player.pos.x - this.player.radius) || x - r > (	this.player.pos.x + this.player.radius) &&
									 y + r < (this.player.pos.y - this.player.radius) || y - r > (	this.player.pos.y + this.player.radius)  )){
				this.addCell(new Cell($V(x,y),
								  $V(0.1*(Math.random()-0.5), 0.1*(Math.random()-0.5)),
								  r,false));
			}
		}
	}
}

World.prototype.update = function () {
	$.each(this.cells, function(i, c) { c.update(); });

	this.handleCollisions(this.checkCollisions());

	this.garbageCollect();

	this.camera.update();

	var cells = this.cells.sort(function(cell1, cell2) {
		var l1 = cell1.radius;
		var l2 = cell2.radius;

		if (l1 < l2)
			return -1;
		else if (l1 > l2)
			return 1;
		else
			return 0;
	});

	if (cells.length > 0)
	var smallest = (cells[ Math.floor(cells.length /4 )]).radius;
	if (this.player && !this.fake){
		if (smallest > this.player.radius)
				this.likely = false;
				
		if (this.player.radius ==0 ) {
			if (G.multiplayer) {
				G.net.lose();
			} else {
				G.current = new Lose(2);
			}
		}


		if ( ((cells[cells.length-1]).radius == this.player.radius) && !G.multiplayer)
			G.current = new Lose(1);
	}

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
	if (this.likely == false) {
		G.context.fillStyle = "rgb(255, 255, 255)";
		G.context.font = '30px sans-serif';
		G.context.textAlign = 'center';
		G.context.fillText("DOESN'T LOOK LIKELY", G.canvas.width/2, G.canvas.height/5*4);
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
	var screenLoc = $V(e.offsetX,
		   e.offsetY);

	if (this.player)
		this.player.clickHandler(this.camera.screenToWorld(screenLoc))
}

World.prototype.scrollHandler = function (e){
	this.camera.scrollHandler(e);

}

World.prototype.collisions = function (cell) {
	for (i = 0; i < this.cells.length ; i++){
		if ( Math.abs(cell.pos.s(this.cells[i].pos) < (cell.radius +this.cells[i].radius)*(cell.radius +this.cells[i].radius)))
			return true;
	}
	return false;
}




