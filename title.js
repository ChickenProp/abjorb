function Title (mode) {
	this.mode = mode;
	G.world = new World();
	G.world.addFakePlayer(0);
	G.world.level(0);
}

Title.prototype.update = function () {
	G.world.update();
}


Title.prototype.draw = function () {
	G.world.draw();
	if (this.mode == 0){
		G.context.drawImage(G.images.button,G.canvas.width/2 -150 ,200);
		G.context.drawImage(G.images.button,G.canvas.width/2 -150 ,300);
		G.context.fillStyle = "yellow";
		G.context.font = '150px sans-serif';
		G.context.textAlign = 'center';
		G.context.fillText("ABJORB", G.canvas.width/2,150);
		G.context.fillStyle = "rgb(0, 0, 0)";
		G.context.font = '30px sans-serif';
		G.context.textAlign = 'center';
		G.context.fillText("SINGLE PLAYER", G.canvas.width/2,250);
		G.context.fillText("MULTI PLAYER", G.canvas.width/2,350);
	} else if (this.mode ==1) {
		G.context.drawImage(G.images.button,G.canvas.width/2-275 ,250,150,50);
		G.context.drawImage(G.images.button,G.canvas.width/2-75 ,250,150,50);
		G.context.drawImage(G.images.button,G.canvas.width/2+125 ,250,150,50);
		G.context.drawImage(G.images.button,G.canvas.width/2-275 ,375,150,50);
		G.context.drawImage(G.images.button,G.canvas.width/2-75 ,375,150,50);
		G.context.drawImage(G.images.button,G.canvas.width/2+125 ,375,150,50);
		G.context.drawImage(G.images.button,25,20,100,35);
		G.context.fillStyle = "yellow";
		G.context.font = '60px sans-serif';
		G.context.textAlign = 'center';
		G.context.fillText("SINGLE PLAYER", G.canvas.width/2,150);
		G.context.font = '30px sans-serif';
		G.context.textAlign = 'center';
		G.context.fillText("SPARSE MODE", G.canvas.width/2,225);
		G.context.fillText("DENSE MODE", G.canvas.width/2,350);	
		G.context.fillStyle = "rgb(0, 0, 0)";
		G.context.fillText("EASY", G.canvas.width/2-200,285);
		G.context.fillText("EASY", G.canvas.width/2-200,410);
		G.context.fillText("MEDIUM", G.canvas.width/2,285);
		G.context.fillText("MEDIUM", G.canvas.width/2,410);
		G.context.fillText("HARD", G.canvas.width/2+200,285);
		G.context.fillText("HARD", G.canvas.width/2+200,410);
		G.context.font = '20px sans-serif';
		G.context.textAlign = 'center';
		G.context.fillText("MENU", 75,43);
	}
	G.context.drawImage(G.images.splash,G.canvas.width - 96  ,G.canvas.height - 96 );
}


Title.prototype.clickHandler = function (e){
	if (this.mode == 0) {
		if ((e.offsetX < G.canvas.width/2 + 150)  && 
				(e.offsetX > G.canvas.width/2 - 150) &&
					(e.offsetY > 200) &&
						(e.offsetY < 275)  ) {
			G.current = new Title(1);
		} else if ((e.offsetX < G.canvas.width/2 + 150)  && 
				(e.offsetX > G.canvas.width/2 - 150) &&
					(e.offsetY > 300) &&
						(e.offsetY < 375)  ) {
			G.createWorld();
			G.net.connect();
		}
	} else if (this.mode ==1){
		if ((e.offsetX > G.canvas.width/2-275)  &&             //EASY SPARSE
				(e.offsetX < G.canvas.width/2 - 125) &&
					(e.offsetY > 250) &&
						(e.offsetY < 300)  ) {
			G.createWorld();
			G.world.addPlayer(0);
			G.world.level(0);
		} else if ((e.offsetX > G.canvas.width/2-75)  && //MEDIUM SPARSE
				(e.offsetX < G.canvas.width/2 + 75) &&
					(e.offsetY > 250) &&
						(e.offsetY < 300)  ) {
			G.createWorld();
			G.world.addPlayer(0);
			G.world.level(1);
		} else if ((e.offsetX > G.canvas.width/2+125)  && //HARD SPARSE
				(e.offsetX < G.canvas.width/2 + 275) &&
					(e.offsetY > 250) &&
						(e.offsetY < 300)  ) {
			G.createWorld();
			G.world.addPlayer(0);
			G.world.level(2);
		}else if ((e.offsetX > G.canvas.width/2-275)  &&  //EASY DENSE
				(e.offsetX < G.canvas.width/2 - 125) &&
					(e.offsetY > 375) &&
						(e.offsetY < 425)  ) {
			G.createWorld();
			G.world.addPlayer(1);
			G.world.staticlevel(0);
		}else if ((e.offsetX > G.canvas.width/2-75)  && //MEDIUM DENSE
				(e.offsetX < G.canvas.width/2 + 75) &&
					(e.offsetY > 375) &&
						(e.offsetY < 425)  ) {
			G.createWorld();
			G.world.addPlayer(1);
			G.world.staticlevel(1);
		}else if ((e.offsetX > G.canvas.width/2+ 125)  && //HARD DENSE
				(e.offsetX < G.canvas.width/2 +275) &&
					(e.offsetY > 375) &&
						(e.offsetY < 425)  ) {
			G.createWorld();
			G.world.addPlayer(1);
			G.world.staticlevel(2);
		}else if ((e.offsetX > 25)  &&
				(e.offsetX < 125) &&
					(e.offsetY > 20) &&
						(e.offsetY < 45) ){
			G.current = new Title(0);
		}
	}
}

Title.prototype.scrollHandler = function (e){
}

function Lose (mode) {
	this.mode = mode;
	this.frames = 0;
	G.world = new World();
	G.world.addFakePlayer(mode);
	G.world.level(0);
}

Lose.prototype.update = function () {
	this.frames++;
		G.world.update();
}


Lose.prototype.draw = function () {
	G.world.draw();
	G.context.fillStyle = "yellow";
	G.context.font = '100px sans-serif';
	G.context.textAlign = 'center';
	if (this.mode ==1)
		G.context.fillText("YOU WIN", G.canvas.width/2,150);
	if (this.mode ==2)
		G.context.fillText("YOU LOSE", G.canvas.width/2,150);

}


Lose.prototype.clickHandler = function (e){
	if (this.frames > 60){
		G.current = new Title(0);
	}
}

Lose.prototype.scrollHandler = function (e){
}


function Win () {
}

Win.prototype.update = function () {
}


Win.prototype.draw = function () {
	G.context.drawImage(G.images.win, 0,0);
}


Win.prototype.clickHandler = function (e){
	G.current = new Title(0);
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
	if (e.offsetX < 213) { 
		G.world.addPlayer(0);
		G.world.level(0);
	} else if (e.offsetX > 427){
		G.world.addPlayer(1);
		G.world.staticlevel(2);
	} else{
		G.world.addPlayer(0);
		G.world.level(1);
	}
}

Singletitle.prototype.scrollHandler = function (e){
}

