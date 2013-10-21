var Piece = require("./piece.js").Piece;
var Board = require("./board.js").Board;

function Game() {
	this._dirs = [[0, 1], [1, 1], [1, 0],
								[1, -1], [0, -1], [-1, -1],
								[-1, 0], [-1, 1]];
	this.board = new Board();
};

Game.prototype.checkMove = function(start, dir, capture){
	var myColor = this.board.getPiece(start).color
	var enemyColor = this.board.getPiece(start).oppColor;
	var captured = [];
	var adjSpot = [(start[0] + dir[0]), (start[1] + dir[1])];
	var adjPiece = this.board.getPiece(adjSpot);
	while(!((adjPiece !== undefined) && (adjPiece.color !== enemyColor))){
		captured.push(adjSpot);
		start = adjSpot;
		adjSpot = [(start[0] + dir[0]), (start[1] + dir[1])];
		if(this.board.offBoard(adjSpot)){
			return false;
		}
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
	console.log("returned the following valid moves for color of: ",color);
	console.log(validMovesList);
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
	this._dirs.forEach( function(dir){
			var move = this.checkMove(coord, dir, true);
	});
};

Game.prototype.placePiece = function(pos, color) {
  if(this.validMoves(color).indexOf(pos) >= 0){
	  var piece = new Piece(color);
	  this.board.grid[pos[0]][pos[1]] = piece;
	  this.capturePieces(added_pos);
  } else {
	  throw new Error("Invalid Move");
  }	
};

Game.prototype.runLoop = function() {
	// TODO: Fill this out.
};

exports.Game = Game;