var runGame = function() {
	var Board = require("./board.js").Board;
	var Piece = require("./piece.js").Piece;
	var Game = require("./game.js").Game;
	my_board = new Board();
	my_game = new Game(my_board);
  my_game.run_loop();
};

runGame();