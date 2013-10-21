var Piece = require("./piece.js").Piece;
var Board = require("./board.js").Board;

function Game() {
	this.board = new Board();
	
	this.valid_moves = function(color) {
		//TODO: returns valid moves for given color
	};
	
	this.no_valid_moves = function() {
		return (this.valid_moves("black").length === 0) && 
		(this.valid_moves("white").length === 0)
	};
	this.won = function() {
		return (this.no_valid_moves() || this.board.full());
	};
	
	this.capture_pieces = function(added_pos){
		//TODO: flip all captured pieces to the proper color.
	};
	
	this.place_piece = function(pos, color) {
	  if(this.valid_moves(color).indexOf(pos) >= 0){
		  var piece = new Piece(color);
		  this.board.grid[pos[0]][pos[1]] = piece;
		  this.capture_pieces(added_pos);
	  } else {
		  //TODO: raise error?
		  console.log("Not a valid move!");
	  }	
	};
};

exports.Game = Game;