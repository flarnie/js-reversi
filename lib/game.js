var Piece = require("./piece.js").Piece;
var Board = require("./board.js").Board;

function Game() {
	this._dirs = [[0, 1], [1, 1], [1, 0],
								[1, -1], 0, -1], [-1, -1],
								[-1, 0], [-1, 1]];
	this.board = new Board();
	
	this.findMove = function(start, dir, capture){
		var myColor = this.board.getPiece(start).color
		var enemyColor = this.board.getPiece(start).oppColor;
		var captured = [];
		var adjSpot = [(start[0] + dir[0]), (start[1] + dir[1])];
		while(this.board.getPiece(adjSpot).color === enemyColor){
			captured.push(adjSpot);
			start = adjSpot;
			adjSpot = [(start[0] + dir[0]), (start[1] + dir[1])];
			return false if this.board.offBoard(adjSpot);
		};
		if(this.board.getPiece(adjSpot).color === myColor){
			if(capture){
				captured.forEach( function(piece){
					piece.flip();
				});
			} // end if capture
			return true
		};
		return false
	};
	
	this.validMoves = function(color) {
		//TODO: returns valid moves for given color
		this.board.each( function(contents, coord){
			if(this.board.isMine?(color, coord)){
				// TODO:
				// for each direction
				// check each spot that is opp. color
				// until you run into a non-opp. color contents
				// then, if that spot is your color
				// it is a valid move
				// re-use this logic to flip captured pieces?
			};
		});
	};
	
	this.noValidMoves = function() {
		return (this.validMoves("black").length === 0) && 
		(this.validMoves("white").length === 0)
	};
	this.won = function() {
		return (this.noValidMoves() || this.board.full());
	};
	
	this.capturePieces = function(addedPos){
		//TODO: flip all captured pieces to the proper color.
	};
	
	this.placePiece = function(pos, color) {
	  if(this.validMoves(color).indexOf(pos) >= 0){
		  var piece = new Piece(color);
		  this.board.grid[pos[0]][pos[1]] = piece;
		  this.capturePieces(added_pos);
	  } else {
		  //TODO: raise error?
		  console.log("Not a valid move!");
	  }	
	};
};

exports.Game = Game;