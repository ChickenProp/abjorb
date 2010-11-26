function World () {
    this.width = 640;
    this.height = 480;

    this.player = new Cell($V(320, 240), $V(0, 0), 20);

    this.cells = [this.player];
}

World.prototype.update = function () {
    $.each(this.cells, function(i, c) { c.update(); });
}

World.prototype.draw = function () {
    G.context.fillStyle = "rgb(200, 200, 200)";
    G.context.fillRect(0, 0, G.canvas.width, G.canvas.height);

    $.each(this.cells, function(i, c) { c.draw(); });
}

