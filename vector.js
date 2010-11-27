
function Vector(x,y) {
    this.x = x;
    this.y = y;
}
Vector.prototype = {
    x: 0,
    y: 0,

	a:function(vector) {
		var ret = new Vector;
		ret.x = this.x + vector.x;
		ret.y = this.y + vector.y; 
		return ret;
	},

	s:function(vector) {
		var ret = new Vector;
		ret.x = this.x - vector.x;
		ret.y = this.y - vector.y;
		return ret;
	},


	m:function(k) {
		var ret = new Vector;
		ret.x = this.x *k;
		ret.y = this.y * k;
		return ret;
	},


	d:function(k) {
		var ret = new Vector;
		ret.x = this.x / k;
		ret.y = this.y / k;
		return ret;
	},

	lengthSquared: function() {
		return this.x * this.x + this.y * this.y;
	},

	length: function () {
		return Math.sqrt(this.lengthSquared());
	},

	normalize:function() {
		if (this.length() == 0)
			return this;
		else
			return this.d(this.length());	
	},

	copy: function () {
		return $V(this.x, this.y);
	},
}

function $V(x,y){
	return new Vector(x,y);

}
