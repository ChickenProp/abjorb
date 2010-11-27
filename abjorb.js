var G;

var player;

function abjorb () {
	G = new Global();
	G.createWorld();

	setInterval(mainloop, 1000/60);

	$(G.canvas).click(function (e) {
		var screenLoc = $V(e.pageX - G.canvas.offsetLeft,
			   e.pageY - G.canvas.offsetTop);
		G.world.camera.screenToWorld(screenLoc)
		G.world.player.clickHandler(screenLoc)
	});
	$(G.canvas).bind('mousewheel', function (e) {
		G.world.camera.scrollHandler(e);
	});

	$(G.canvas).css('cursor','crosshair');
	
	//$('#sound_element').html("<embed src=media/test.wav hidden=true autostart=true loop=false>");
}

function mainloop () {
	G.time++;

	G.world.update();
	G.world.draw();
	
	stats.update();
}
