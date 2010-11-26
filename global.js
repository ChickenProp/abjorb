function Global () {
    this.canvas = $("canvas")[0];
    this.context = this.canvas.getContext("2d");
}

G = new Global;
