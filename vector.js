
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

	normalize:function() {
	    var mod = Math.sqrt (this.x * this.x + this.y * this.y );
	    return this.d(mod);	
	}
}

function $V(x,y){
	return new Vector(x,y);

}
