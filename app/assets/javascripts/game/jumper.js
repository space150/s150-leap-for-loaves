(function(){

var jumper = {
	liftoffHandlers: [],
    landedHandlers: [],
	shortHistoryPoints: [],
	shortHistoryCount: 2,
	shortHistoryAverage: { x: 0, y: 0, z: 0 },
	fullHistoryPoints: [],
	fullHistoryCount: 16,
	fullHistoryAverage: { x: 0, y: 0, z: 0 },
	delta: { x: 0, y: 0, z: 0 },
	threshold: { x: 0.5, y: 0.5, z: 0.5 },
	isAirborne: false,
	isAcquiringInitialWindow: false,
	isEnabled: false,
	isJumpingEnabled: false,
    init: function () {
		accel.register(this.moved.bind(this));
    },
	shutdown: function () {
		this.isAirborne = false;
		this.isEnabled = false;
		this.isAcquiringInitialWindow = false;

		this.shortHistoryPoints = [];
		this.shortHistoryAverage = { x: 0, y: 0, z: 0 };
		
		this.fullHistoryPoints = [];
		this.fullHistoryAverage = { x: 0, y: 0, z: 0 };
		
		this.delta = { x: 0, y: 0, z: 0 };
	},
	startup: function () {
		this.isAcquiringInitialWindow = true;
		this.isEnabled = true;
	},
	enableJumping: function () {
		this.isJumpingEnabled = true;
	},
    registerForLiftoff: function (func) {
        this.liftoffHandlers.push(func);
    },
	registerForLanding: function (func) {
        this.landedHandlers.push(func);
    },
	jumping: function () {
		this.delta.x = Math.abs(this.fullHistoryAverage.x - this.shortHistoryAverage.x);
		this.delta.y = Math.abs(this.fullHistoryAverage.y - this.shortHistoryAverage.y);
		this.delta.z = Math.abs(this.fullHistoryAverage.z - this.shortHistoryAverage.z);
		return 	this.delta.x > this.threshold.x ||
				this.delta.y > this.threshold.y ||
				this.delta.z > this.threshold.z;
	},
	moved: function (e) {
		if ( !this.isEnabled ) return;
		
		var current = { x: e.accel.x, y: e.accel.y, z: e.accel.z };
					
		this.accumulateFullHistory( current );
		this.accumulateShortTermHistory( current );
		
		//if ( !this.isAirborne )
		//	this.calculateThreshold();
		
		// if we aren't acquiring our initial window and we have enabled jumping, check for the jump start/stop states
		if ( this.isJumpingEnabled && !this.isAcquiringInitialWindow ) {
			var isJumping = this.jumping(); 
			if ( isJumping && !this.isAirborne ) {
				for ( var i = 0, j = this.liftoffHandlers.length; i < j; i++ ) {
					this.liftoffHandlers[i]();
	            }
				this.isAirborne = true;
			}
			else if ( !isJumping && this.isAirborne )
			{
				for ( var i = 0, j = this.landedHandlers.length; i < j; i++ ) {
					this.landedHandlers[i]();
	            }
				this.isAirborne = false;
			}		
		}
    },
	calculateThreshold: function () {
		// modify the threshold to include any full history fluctuations
		var currentX = Math.abs(this.fullHistoryAverage.x);
		if ( currentX > this.threshold.x )
			this.threshold.x = currentX;
		var currentY = Math.abs(this.fullHistoryAverage.y);
		if ( currentY > this.threshold.y )
			this.threshold.y = currentY;
		var currentZ = Math.abs(this.fullHistoryAverage.z);
		if ( currentZ > this.threshold.z )
			this.threshold.z = currentZ;
	},
	accumulateShortTermHistory: function ( current ) {
		// push the current entry on to the stack
		this.shortHistoryPoints = this.shortHistoryPoints.slice( 0, this.shortHistoryCount-1 );
		this.shortHistoryPoints.unshift( current );
		
		// calculate the short-term avergage (over shortHistoryCount frames)
		var tally = { x: 0 , y: 0, z: 0 };
		$.each(this.shortHistoryPoints, function (idx, item) {
			tally.x += item.x;
			tally.y += item.y;
			tally.z += item.z;
		});
		tally.x /= this.shortHistoryCount;
		tally.y /= this.shortHistoryCount;
		tally.z /= this.shortHistoryCount;
		this.shortHistoryAverage = tally;
	},
	accumulateFullHistory: function ( current ) {
		// push the current entry on to the stack
		this.fullHistoryPoints = this.fullHistoryPoints.slice( 0, this.fullHistoryCount-1 );
		this.fullHistoryPoints.unshift( current );
		
		// calculate the full historical average (over fullHistoryCount frames)
		var tally = { x: 0 , y: 0, z: 0 };
		$.each(this.fullHistoryPoints, function (idx, item) {
			tally.x += item.x;
			tally.y += item.y;
			tally.z += item.z;
		});
		tally.x /= this.fullHistoryCount;
		tally.y /= this.fullHistoryCount;
		tally.z /= this.fullHistoryCount;
		this.fullHistoryAverage = tally;
		
		// if we are acquiring the initial window and we have enough data points to fill the history
		if ( this.isAcquiringInitialWindow && this.fullHistoryPoints.length >= this.fullHistoryCount ) {
			// we are good to go
			this.isAcquiringInitialWindow = false;
			console.log("initial window acquired!");
		}
	},
	toString: function() {
        return this.format( this.delta.x )
            + " : " + this.format( this.delta.y )
            + " : " + this.format( this.delta.z );
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

this.jumper = jumper;
jumper.init();

})();