var http = require('http');

var server = http.createServer(function () {});
server.listen(8035);

console.log(server);

var lastFrame = 0;

var players = {};
var countPlayers = function () {
	i = 0;
	for (x in players) {
		i++;
	}
	return i;
};
var allReady = function () {
	ready = true;
	for (x in players) {
		if (!players[x].ready)
			ready = false;
	}
	return (ready && countPlayers() > 1);
}
var framePlayers = 0;
var sendQueue = [];
var inGame = false;
var frameTimeout;
require('./spacesocket/lib/spacesocket').attach(server, function(conn) {
	conn.socket.setNoDelay(true);
	conn.socket.setTimeout(0);
	conn.on('data', function (msg) {
		try {
			var data = JSON.parse(msg);
		} catch (e) {
			console.log("Error");
			return;
		}
		if (data[0] == 'lose') {
			delete players[conn.playerId];
			conn.end();
			if (countPlayers() < 2) {
				console.log("END");
				for (player in players) {
					try {
						players[player].write('["win"]');
						players[player].end()
//						setTimeout(function () { players[player].end() }, 100);
					} catch (e) {}
				}
				setTimeout(function () { 
					players = {};
					framePlayers = 0;
					sendQueue = [];
					inGame = false;
				}, 100);
			}
		} else if (data[0] == 'join') {
			if (!inGame) {
				console.log("Join: "+data[1]);
				conn.playerId = Math.floor(Math.random()*100000);
				conn.name = data[1];
				players[conn.playerId] = conn;
				conn.write('["joined"]');
				var sendPlayers = [];
				for (player in players) {
					sendPlayers.push([players[player].name, (players[player].ready == true)]);
				}
				for (player in players) {
					try {
						players[player].write(JSON.stringify(["players", sendPlayers]));
					} catch (e) {}
				}
			} else {
				conn.write('["wait"]');
			}
		} else if (data[0] == 'click') {
			sendQueue.push({
				cell: 'p'+conn.playerId,
				click: [data[1], data[2]]
			});
		} else if (data[0] == 'ready') {
			players[conn.playerId].ready = true;
			var sendPlayers = [];
			for (player in players) {
				sendPlayers.push([players[player].name, (players[player].ready == true)]);
			}
			for (player in players) {
				try {
					players[player].write(JSON.stringify(["players", sendPlayers]));
				} catch (e) {}
			}
			if (allReady()) {
				cells = [];
				inGame = true;
				// Random cells
				for (i = 0; i < 500; i++) {
					cells.push({
						'cell': 'c'+cells.length,
						'pos': [(Math.random()*960-40)+20,(Math.random()*720-40)+20],
						'vel': [0.1*(Math.random()-0.5), 0.1*(Math.random()-0.5)],
						'rad': 4.5*Math.random()+0.5
					});
				}
				for (i = 0; i < 50; i++) {
					cells.push({
						'cell': 'c'+cells.length,
						'pos': [(Math.random()*960-40)+20,(Math.random()*720-40)+20],
						'vel': [0.1*(Math.random()-0.5), 0.1*(Math.random()-0.5)],
						'rad': 10*Math.random()+10
					});
				}
				var playerCells = {}
						for (player in players) {
							playerCells['p'+player] = {
								'cell': 'p'+player,
								'pos': [(Math.random()*800-40)+20,(Math.random()*630-40)+20],
								'vel': [0.1*(Math.random()-0.5), 0.1*(Math.random()-0.5)],
								'rad': 5,
								'name': players[player].name
							};
						}
				for (player in players) {
					try {
						var cell;
						for (curPlayer in players) {
							cell = playerCells['p'+curPlayer];
							if (curPlayer == player)
								cell.player = true;
	
							cells.push(cell);
						}
	
       	                 		players[player].write(JSON.stringify(['cell', cells]));
						for (curPlayer in players) {
							cell = cells.pop();
							delete cell.player;
						}
	
       	                 	} catch (e) { console.log(e) }
				}
			}
		} else if (data[0] == 'drawn') {
			framePlayers++;
			if (framePlayers == countPlayers()) {

				framePlayers = 0;
				var time = (new Date()).getTime();
				var delay = Math.max(0, 33 - (time - lastFrame));

				if (delay === 0) {
					for (player in players) {
						try {
							players[player].write(JSON.stringify(['cell', sendQueue]));
						} catch (e) { console.log(e) }
					}
					sendQueue = [];
					lastFrame = time;
				} else {
					if (frameTimeout)
						clearTimeout(frameTimeout);

					frameTimeout = setTimeout(function () {
						lastFrame = (new Date()).getTime();
						for (player in players) {
							try {
								players[player].write(JSON.stringify(['cell', sendQueue]));
							} catch (e) { console.log(e) }
						}
						sendQueue = [];
					}, delay)
				}
			}
		}
	});
	conn.on('close', function () {
		if (conn.playerId !== undefined) {
			console.log("Leave: "+conn.name);
			delete players[conn.playerId];
			if (inGame && countPlayers() < 2) {
				for (player in players) {
					try {
						players[player].write('["win"]');
						players[player].end();
					} catch (e) {}
				}
				setTimeout(function () { 
					players = {};
					framePlayers = 0;
					sendQueue = [];
					inGame = false;
				}, 0);
			} else if (countPlayers() < 1) {
				players = {};
				framePlayers = 0;
				sendQueue = [];
				inGame = false;
			} else {
				var sendPlayers = [];
				for (player in players) {
					sendPlayers.push([players[player].name, (players[player].ready == true)]);
				}
				for (player in players) {
					try {
						players[player].write(JSON.stringify(["players", sendPlayers]));
					} catch (e) {}
				}
			}
		}
	});
});
