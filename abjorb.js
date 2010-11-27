var G;

var player;

function abjorb () {
	G = new Global();
//	G.createWorld();
	G.current;
	setInterval(mainloop, 1000/60);

	$(document).click(function (e) {
		G.current.clickHandler(e)
	});
	$(G.canvas).bind('mousewheel', function (e) {
		G.current.scrollHandler(e);
	});

	$(G.canvas).css('cursor','crosshair');
	
	//$('#sound_element').html("<embed src=media/test.wav hidden=true autostart=true loop=false>");
}

function mainloop () {
	G.time++;

	G.current.update();
	G.current.draw();
	
	stats.update();
}
