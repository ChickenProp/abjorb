function Net() {
}

Net.prototype.connect = function () {
	conn = new WebSocket("ws://uwcs.co.uk:8035");
	this.conn = conn;
	var netcell = {};
	conn.onopen = function(evt) {
		conn.onmessage = function(evt) {
			console.log(evt.data);
			try {
				var data = JSON.parse(evt.data);
				if (data.length > 0) {
					data.forEach(function (cell) {
						if (netcell[cell.cell] === undefined) {
							if (!cell.player) {
								netcell[cell.cellid] = new Cell($V(cell.pos[0], cell.pos[1]), $V(cell.vel[0], cell.vel[1]), cell.rad)
								G.world.addCell(netcell[cell.cellid]);
							}
						} else {
							//netcell[cell.cellid].clickHandler($V(cell.click[0],cell.click[1]));
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
		conn.send('["join"]');
	}
}

Net.prototype.go = function () {
	this.conn.send('["go"]');
}