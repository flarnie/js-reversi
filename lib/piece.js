function Piece(color){
	this.color = color;
	this.flip = function() {
		this.color = (this.color === "black") ? "white" : "black";
	};
};

exports.Piece = Piece;