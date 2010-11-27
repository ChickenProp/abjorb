var G;

var player;

function abjorb () {
	G = new Global();
	G.createWorld();

	setInterval(mainloop, 1000/60);

	$(document).click(function(e){G.world.player.clickHandler(e)});
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
