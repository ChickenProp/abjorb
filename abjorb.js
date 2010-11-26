var G;

var player;

function abjorb () {
    G = new Global();

    player = new Cell(10, 50, 20);

    setInterval(mainloop, 1000/60);
}

function mainloop () {
    G.context.clearRect(0, 0, G.canvas.width, G.canvas.height);

    player.update();
    player.draw();
}

function Cell (x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
}

Cell.prototype.update = function () {
    this.x += 10;
}

Cell.prototype.draw = function () {
    ctx = G.context;

    ctx.fillStyle = "rgb(200, 0, 0)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
}
