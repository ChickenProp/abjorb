var G;

var player;

function abjorb () {
    G = new Global();

    world = new World();

    setInterval(mainloop, 1000/60);

    $(document).click(function(e){world.player.clickHandler(e)});

	$('#sound_element').html("<embed src=media/test.wav hidden=true autostart=true loop=false>");

}

function mainloop () {
    world.update();
    world.draw();
}
