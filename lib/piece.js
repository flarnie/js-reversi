function Piece(color){
	this.color = color;
	this.oppColor = function() {
		return (this.color === "black") ? "white" : "black";
	}
	this.flip = function() {
		this.color = this.oppColor();
	};
};

exports.Piece = Piece;