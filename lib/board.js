var Piece = require("./piece.js").Piece;

makeGrid = function(){
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
	this.grid = makeGrid();
	this.full = function() {
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
  this.get_piece(pos){
	  this.grid[pos[0]][pos[1]];
  };
};

exports.Board = Board;