var G;

var player;

function abjorb () {
    G = new Global();

    player = new Cell($V(320, 240), $V(0,0), 20);

    setInterval(mainloop, 1000/60);

    $(document).click(function(e){player.clickHandler(e)});

	$('#sound_element').html("<embed src=media/test.wav hidden=true autostart=true loop=false>");
}

function mainloop () {
    G.context.clearRect(0, 0, G.canvas.width, G.canvas.height);

    player.update();
    G.context.fillStyle = "rgb(200, 200, 200)";
    G.context.fillRect(0, 0, G.canvas.width, G.canvas.height);
    player.draw();
}
