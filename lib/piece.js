function Piece(color){
	this.color = color;
};

Piece.prototype.oppColor = function() {
	return (this.color === "black") ? "white" : "black";
}
Piece.prototype.flip = function() {
	this.color = this.oppColor();
};
Piece.prototype.toString = function() {
	return (this.color === "black" ? "o" : "@")
}

exports.Piece = Piece;