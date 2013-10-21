var assert = require("assert")
var Board = require("./board.js").Board;
var Piece = require("./piece.js").Piece;
var Game = require("./game.js").Game;

describe("Piece", function(){
	var darkPiece = new Piece("black");
	var lightPiece = new Piece("white");
	describe("#color", function(){
	  it("should have the color assigned to it", function(){
		  assert.equal(darkPiece.color, "black");
		  assert.equal(lightPiece.color, "white");
	  })
	  it("should only allow black or white", function(){
		  var makeBadPiece = function(){
			  new Piece("foo");
		  };
		  assert.throw(makeBadPiece(), Error, "Color must be black or white");
	  })
	})
	describe("#flip", function(){
		it("should switch colors when flipped", function(){
			darkPiece.flip();
			assert.equal(darkPiece.color, "white");
		})
	});
})

describe("Board", function(){
	var testBoard = new Board();
	describe("#grid", function(){
		it("should be 8x8", function(){
			assert.equal(testBoard.grid.length, 8);
			for(i = 0; i < 8; i ++){
				assert.equal(testBoard.grid[i].length, 8);
			}
		})
		it("should begin with 4 pieces in the center", function(){
			assert.equal(testBoard.grid[3][3].color, "white");
			assert.equal(testBoard.grid[3][4].color, "black");
			assert.equal(testBoard.grid[4][3].color, "black");
			assert.equal(testBoard.grid[4][4].color, "white");
		})
		it("should start out empty except for the 4 center pieces", function(){
			testBoard.grid.forEach( function(row, i){
				row.forEach( function(spot, j){
					if((i !== 3 && i !== 4) && (j !== 3 && j !== 4)){
						assert.equal(spot, undefined);
					}
				});
			});
		})
	}) // end describe #grid
	
	describe("putting pieces on board", function(){
		
	})
	describe("#full", function(){
		it("should not begin full", function(){
			var anotherBoard = new Board();
			assert.equal(anotherBoard.full, false);
		})
		it("should be full if no spots are empty", function(){
			// Fill the board for the test
			for(i = 0; i < 8; i ++){
				for(j = 0; j < 8; j ++){
					testBoard[i][j] = new Piece("white");
				}
			}
			// Test fullness
		  assert.equal(testBoard.full, true);
		});
	})
	
})

describe("Game", function(){
	
})