
var gettimestamp =function() {
	// for IE
	if (!Date.now) {
    Date.now = function() { return new Date().getTime(); }
	}
	return  Math.floor(Date.now() / 1000);
}

  module.exports = gettimestamp;