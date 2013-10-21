var Piece = require("./piece.js").Piece;
var Board = require("./board.js").Board;

function Game() {
	this._dirs = [[0, 1], [1, 1], [1, 0],
								[1, -1], 0, -1], [-1, -1],
								[-1, 0], [-1, 1]];
	this.board = new Board();
	
	this.checkMove = function(start, dir, capture){
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
			}
			return adjSpot;
		};
		return false
	};
	
	this.validMoves = function(color) {
		var validMovesList = [];
		this.board.each( function(contents, coord){
			if(this.board.isMine?(color, coord)){
				this._dirs.forEach( function(dir){
					var move = this.checkMove(coord, dir, false);
					if(move){
						validMovesList.push(move);
					};
				});
				return validMovesList;
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
		this._dirs.forEach( function(dir){
				var move = this.checkMove(coord, dir, true);
		};
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