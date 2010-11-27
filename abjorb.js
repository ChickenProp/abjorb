var G;

var player;

function abjorb () {
    G = new Global();

    setInterval(mainloop, 1000/60);

    $(document).click(function(e){G.world.player.clickHandler(e)});
}

function mainloop () {
    G.world.update();
    G.world.draw();
}
