var Piece = require("./piece.js").Piece;
var Board = require("./board.js").Board;

function Game() {
	this._dirs = [[0, 1], [1, 1], [1, 0],
								[1, -1], [0, -1], [-1, -1],
								[-1, 0], [-1, 1]];
	this.board = new Board();
};

Game.prototype.checkMove = function(start, dir, capture){
	console.log("Checking move for ", start);
	console.log("with direction ", dir);
	var myColor = this.board.getPiece(start).color;
	var enemyColor = this.board.getPiece(start).oppColor();
	var captured = [];
	var adjSpot = [(start[0] + dir[0]), (start[1] + dir[1])];
	var adjPiece = this.board.getPiece(adjSpot);
	console.log("adjPiece is ", adjPiece);
	console.log(enemyColor);
	while(((adjPiece !== undefined) && (adjPiece.color === enemyColor))){
		console.log("found enemy piece at ", adjSpot);
		captured.push(adjSpot);
		start = adjSpot;
		adjSpot = [(adjSpot[0] + dir[0]), (adjSpot[1] + dir[1])];
		console.log("new adjSpot is ", adjSpot);
		adjPiece = this.board.getPiece(adjSpot);
		if(this.board.offBoard(adjSpot)){
			console.log("we went off the board!");
			return false;
		}
	};
	if(capture){
		if(this.board.getPiece(adjSpot).color === myColor){
		 	captured.forEach( function(piece){
				piece.flip();
			});
			return adjSpot	
		}
	} else if(this.board.getPiece(adjSpot) === undefined){
		return adjSpot;
	};
	return false
};

//TODO: DRY this out some.
// Game.prototype.checkMove = function(start, dir){
// 	var adjSpot = [(start[0] + dir[0]), (start[1] + dir[1])];
// 	var adjPiece = this.board.getPiece(adjSpot);
// 	var enemyColor = this.board.getPiece(start).oppColor;
// 	while(!((adjPiece !== undefined) && (adjPiece.color === enemyColor))){
// 	  adjSpot = []	
// 	}
// 	
// }

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