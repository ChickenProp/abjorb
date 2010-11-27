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



