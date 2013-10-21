var runGame = function() {
	var Board = require("./board.js").Board;
	var Piece = require("./piece.js").Piece;
	var Game = require("./game.js").Game;
	myBoard = new Board();
	myGame = new Game(myBoard);
  myGame.runLoop();
};

runGame();