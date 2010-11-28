function Title () {
}

Title.prototype.update = function () {
}


Title.prototype.draw = function () {
	G.context.drawImage(G.images.title, 0,0);
}


Title.prototype.clickHandler = function (e){
	if (e.offsetX < 320)
		G.current = new Singletitle();
	else 
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


function Win () {
}

Win.prototype.update = function () {
}


Win.prototype.draw = function () {
	G.context.drawImage(G.images.lose, 0,0);
}


Win.prototype.clickHandler = function (e){
	G.current = new Title();
}

Win.prototype.scrollHandler = function (e){
}

function Singletitle () {
}

Singletitle.prototype.update = function () {
}


Singletitle.prototype.draw = function () {
	G.context.drawImage(G.images.singletitle, 0,0);
}


Singletitle.prototype.clickHandler = function (e){
		G.createWorld();
}

Singletitle.prototype.scrollHandler = function (e){
}


