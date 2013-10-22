var Piece = require("./piece.js").Piece;
var Board = require("./board.js").Board;

function Game() {
	this._dirs = [[0, 1], [1, 1], [1, 0],
								[1, -1], [0, -1], [-1, -1],
								[-1, 0], [-1, 1]];
	this.board = new Board();
};

Game.prototype.checkMove = function(start, dir, capture){
  var that = this;
	var myColor = this.board.getPiece(start).color;
	var enemyColor = this.board.getPiece(start).oppColor();
	var captured = [];
	var adjSpot = [(start[0] + dir[0]), (start[1] + dir[1])];
	var adjPiece = this.board.getPiece(adjSpot);
	while(((adjPiece !== undefined) && (adjPiece.color === enemyColor))){
		captured.push(adjSpot);
		start = adjSpot;
		adjSpot = [(adjSpot[0] + dir[0]), (adjSpot[1] + dir[1])];
		adjPiece = this.board.getPiece(adjSpot);
		if(this.board.offBoard(adjSpot)){
			return false;
		}
	};
	if(capture){
		if((adjPiece !== undefined) && (adjPiece.color === myColor)){
		 	captured.forEach( function(spot){
			  var piece = that.board.getPiece(spot);
				piece.flip();
			});
			return adjSpot	
		}
	} else if(this.board.getPiece(adjSpot) === undefined){
		return adjSpot;
	};
	return false
};

// TODO: factor out some of the above into a capture method below.
Game.prototype.capture = function(start, dir){
	
}

Game.prototype.validMoves = function(color) {
	var validMovesList = [];
	var that = this;
	this.board.each( function(contents, coord){
		if(that.board.isMine(color, coord)){
			that._dirs.forEach( function(dir){
				var move = that.checkMove(coord, dir, false);
				if(move){
					validMovesList.push(move);
				};
			});
		};
	});
	return validMovesList;
};

Game.prototype.noValidMoves = function() {
	return (this.validMoves("black").length === 0) && 
	(this.validMoves("white").length === 0)
};
Game.prototype.won = function() {
	return (this.noValidMoves() || this.board.full());
};

Game.prototype.capturePieces = function(addedPos){
	var that = this;
	this._dirs.forEach( function(dir){
			var move = that.checkMove(addedPos, dir, true);
	});
};

_movesInclude = function(moves, move){
	var result = false;
	moves.forEach( function(possibleMove){
		if((possibleMove[0] === move[0]) && (possibleMove[1] === move[1])){
			result = true;
		}
	});
	return result;
}

Game.prototype.placePiece = function(pos, color) {
	var valMovesList = this.validMoves(color);
  if(_movesInclude(valMovesList, pos)){
	  var piece = new Piece(color);
	  this.board.grid[pos[0]][pos[1]] = piece;
	  this.capturePieces(pos);
  } else {
	  throw new Error("Invalid Move");
  }	
};

Game.prototype.runLoop = function() {
	// TODO: Fill this out.
};

exports.Game = Game;