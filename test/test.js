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
	
})

describe("Game", function(){
	
})