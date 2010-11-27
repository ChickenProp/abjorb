function Net() {
}

Net.prototype.connect = function () {
	conn = new WebSocket("ws://uwcs.co.uk:8035");
	this.conn = conn;
	var netcell = {};
	var net = this;
	conn.onopen = function(evt) {
		conn.onmessage = function(evt) {
			try {
				var data = JSON.parse(evt.data);
				if (data.length > 0) {
					data.forEach(function (cell) {
						if (netcell[cell.cell] === undefined) {
							if (!cell.player) {
								netcell[cell.cell] = new Cell($V(cell.pos[0], cell.pos[1]), $V(cell.vel[0], cell.vel[1]), cell.rad);
								G.world.addCell(netcell[cell.cell]);
							} else {
								netcell[cell.cell] = new Cell($V(cell.pos[0], cell.pos[1]), $V(cell.vel[0], cell.vel[1]), cell.rad)
								G.world.player = G.world.addCell(netcell[cell.cell]);
								G.world.player.colour = function () { return "pink"; };
							}
						} else {
							
							netcell[cell.cell].clickHandler($V(cell.click[0],cell.click[1]));
						}
					});
				}
				G.mainloopfn()
				G.mainloopfn()
				conn.send('["drawn"]');
			} catch (e) {
			
			}
		}
		clearInterval(G.mainloop);
		G.current = net;
		conn.send('["join"]');
	}
}

Net.prototype.go = function () {
	this.conn.send('["go"]');
}

Net.prototype.clickHandler = function (e) {
	var screenLoc = $V(e.offsetX, e.offsetY);
	var loc = G.world.camera.screenToWorld(screenLoc)

	this.conn.send('["click",'+loc.x+','+loc.y+']');
	//G.world.clickHander(e);

}

Net.prototype.update = function () {
	G.world.update()
}

Net.prototype.draw = function () {
	G.world.draw()
}

Net.prototype.scrollHandler = function (e) {
	G.world.scrollHandler(e);
}