function Net() {
}

Net.prototype.connect = function () {
	try {
		conn = new WebSocket("ws://uwcs.co.uk:8035");
		this.conn = conn;
	} catch (e) {
		net.reset = true;
		net.message = "Connection failed.";
		return;
	}
	var netcell = {};
	var net = this;
	net.running = false;
	net.connected = setTimeout(function () {
		net.reset = true;
		net.message = "Connection failed.";
	}, 3000);
	net.message = "Connecting";
	G.current = net;
	G.multiplayer = true;
	conn.onopen = function(evt) {
		clearTimeout(net.connected);
		net.name = prompt("Enter a name:");
		if (net.name.length < 1)
			net.name = "Player";
		conn.send('["join", "'+net.name+'"]');
		conn.onmessage = function(evt) {
			try {
				var data = JSON.parse(evt.data);
			} catch (e) {
				return;
			}
			if (data[0] == 'wait') {
				net.message = "Waiting for game to finish.";
				net.message2 = "Click to exit.";
				net.waiting = true;
				setTimeout(function () {
					conn.send('["join", "'+net.name+'"]');
				}, 1000)
			} else if (data[0] == 'joined') {
				net.waiting = false;
				net.joined = true;
				net.joinScreen = true;
				net.ready = false;
				net.players = [];
			} else if (data[0] == 'win') {
				net.running = false;
				G.net = new Net();
				G.current = new Win();
				G.mainloop = setInterval(G.mainloopfn, 1000/60);
			} else if (data[0] == 'players') {
				net.players = data[1];
			} else if (data[0] == 'cell') {
				net.joinScreen = false;
				clearInterval(G.mainloop);
				net.running = true;
				data = data[1];
				if (data.length > 0) {
					data.forEach(function (cell) {
						if (netcell[cell.cell] == undefined) {
							if (cell.player !== true) {
								netcell[cell.cell] = new Cell($V(cell.pos[0], cell.pos[1]), $V(cell.vel[0], cell.vel[1]), cell.rad);
								if (cell.name) {
									netcell[cell.cell].name = cell.name;
								}
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
			}
		}
	}
}

Net.prototype.readyUp = function () {
	this.conn.send('["ready"]');
	this.ready = true;
}

Net.prototype.go = function () {
	this.conn.send('["go"]');
}

Net.prototype.lose = function () {
	this.conn.send('["lose"]');
	this.running = false;
	G.net = new Net();
	G.current = new Lose();
	G.mainloop = setInterval(G.mainloopfn, 1000/60);
}

Net.prototype.clickHandler = function (e) {
	if (this.reset) {
		G.net = new Net();
		G.current = new Title(0);
	} else if (this.joined && !this.running) {
		this.readyUp();
	} else if (this.waiting) {
		G.net = new Net();
		G.current = new Title();
	} else {
		var screenLoc = $V(e.offsetX, e.offsetY);
		var loc = G.world.camera.screenToWorld(screenLoc)

		if (this.running) 
			this.conn.send('["click",'+loc.x+','+loc.y+']');
	}
}

Net.prototype.update = function () {
	if (this.running)
		G.world.update()
}

Net.prototype.draw = function () {
	if (this.running) {
		G.world.draw()
	} else {
		G.context.fillStyle = "rgb(255, 255, 255)";
		G.context.fillRect(0, 0, G.canvas.width, G.canvas.height);

		if (!G.lowGraphics) {
			G.context.drawImage(G.images.world, -50, -50,
						G.images.world.width,
						G.images.world.height);
		}
		if (this.joinScreen) {
			G.context.fillStyle = "rgb(255, 255, 255)";
			G.context.font = '30px sans-serif';
			G.context.textAlign = 'center';
			G.context.fillText("Game joined", G.canvas.width/2, G.canvas.height/8*1);
			if (!this.ready) {
				G.context.fillStyle = "rgb(255, 255, 255)";
				G.context.font = '20px sans-serif';
				G.context.textAlign = 'center';
				G.context.fillText("Click to ready.", G.canvas.width/2, G.canvas.height/8*7);
			}
			var offset = G.canvas.height/8*2;
			this.players.forEach(function (player) {
				G.context.fillStyle = "rgb(255, 255, 255)";
				G.context.font = '15px sans-serif';
				G.context.textAlign = 'center';
				var text = player[0];
				if (player[1]) {
					text += ' - Ready';
				}
				G.context.fillText(text, G.canvas.width/2, offset);
				offset += 20;
			});
		} else {
			if (this.message) {
				G.context.fillStyle = "rgb(255, 255, 255)";
				G.context.font = '30px sans-serif';
				G.context.textAlign = 'center';
				G.context.fillText(this.message, G.canvas.width/2, G.canvas.height/2);
			}
			if (this.message2) {
				G.context.fillStyle = "rgb(255, 255, 255)";
				G.context.font = '20px sans-serif';
				G.context.textAlign = 'center';
				G.context.fillText(this.message2, G.canvas.width/2, G.canvas.height/4*3);
			}
		}
	}
}

Net.prototype.scrollHandler = function (e) {
	if (this.running)
		G.world.scrollHandler(e);
}