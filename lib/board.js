var Piece = require("./piece.js").Piece;

_makeGrid = function(){
	var grid = []
	for (var i = 0; i < 8; i++) {
		var row = new Array(8);
		grid.push(row);
	}
	// Add initial 4 pieces for Reversi
	grid[3][3] = new Piece("white");
	grid[3][4] = new Piece("black");
	grid[4][3] = new Piece("black");
	grid[4][4] = new Piece("white");
	return grid;
};

function Board(){
	this.grid = _makeGrid();
};

Board.prototype.full = function() {
	var pieces = [];
	for(var i = 0; i < 8; i++){
		for(var j = 0; j < 8; j++){
			var piece = this.grid[i][j];
			if (piece){
				pieces.push(piece);
			} // end inner if
		} // end inner for loop
	} // end outer for loop
	return (pieces.length === 64);
};
Board.prototype.each = function(callback){
	this.grid.forEach( function(row, i) {
		row.forEach( function(item, j){
			callback(item, [i, j]);
		});
	});
};

Board.prototype.toString = function() {
	var endString = "";
  this.grid.forEach( function(row, i) {
	  endString += " "+i+" |";
	  row.forEach( function(item, j){
		  if(typeof item === 'undefined'){
			  endString += "_";
		  } else {
			  endString += item.toString();
		  }
	  });
	  endString += "\n";
  });	
  return endString;
}

Board.prototype.getPiece = function(pos){
  return this.grid[pos[0]][pos[1]];
};
Board.prototype.isMine = function(color, pos){
  return (this.getPiece(pos).color === color);
};
Board.prototype.offBoard = function(pos){
	return (pos[0] > 7 || pos[0] < 0 || pos[1] > 7 || pos[1] < 0);
}

exports.Board = Board;