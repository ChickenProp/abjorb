var G;

var player;

function abjorb () {
    G = new Global();

    world = new World();

    setInterval(mainloop, 1000/60);

    $(document).click(function(e){world.player.clickHandler(e)});
}

function mainloop () {
    world.update();
    world.draw();
}
