function Title () {
}

Title.prototype.update = function () {
}


Title.prototype.draw = function () {
	G.context.drawImage(G.images.title, 0,0);
}


Title.prototype.clickHandler = function (e){
	G.createWorld();
}

Title.prototype.scrollHandler = function (e){
}

function Lose () {
}

Lose.prototype.update = function () {
}


Lose.prototype.draw = function () {
	G.context.drawImage(G.images.lose, 0,0);
}


Lose.prototype.clickHandler = function (e){
	G.current = new Title();
}

Lose.prototype.scrollHandler = function (e){
}



