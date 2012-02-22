(function(){
	
// uses HTML5 DeviceMotionEvent to gather device accelerometer data

var motionDetector = {
    handlers: [],
    support: window.DeviceMotionEvent,
    init: function() {
        var _this = this;
        window.addEventListener("devicemotion", function( e ) {
            var data = {
                accel: {
                    x: e.accelerationIncludingGravity.x,
                    y: e.accelerationIncludingGravity.y,
                    z: e.accelerationIncludingGravity.z
                },
                rot: {
                    rate: e.rotationRate
                },
                toString: function() {
                    return this.format(this.accel.x)
                        + " : " + this.format(this.accel.y )
                        + " : " + this.format(this.accel.z );
                },
                format: function(num) {
                    var res = ~~(num * 1000) / 1000;
                    if(res >= 0){
                        res = "+" + res;
                    }
                    res += "";
                    while(res.length < 7){
                        res += ".";
                    }
                    return res;
                }
            };
            for(var i = 0, j = _this.handlers.length; i < j; i++) {
                _this.handlers[i](data);
            }
        }, false);
    },
    register: function(func) {
        this.handlers.push(func);
    },
	hasMotionData: function () {
		if ( !window.DeviceMotionEvent )
			return false;
		return true;
	}
};

this.motionDetector = motionDetector;
motionDetector.init();

})();