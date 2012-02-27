//= require game/animLoop
//= require game/distanceCalculation

(function(){

// liftoff animation handles all the user ruler animation/syncing. It should sync up with the events coming
// from the leap game object

var liftoffAnimation = {
	numberBoard: null,
	indicator: null,
	indicatorBottomOffset: 0,
	man: null,
	manHeight: 0,
	boardHeight: 0,
	windowHeight: 0,
	totalEntryCount: 50,
	distancePerEntry: 0,
	startingDate: null,
	isRunning: false,
    init: function() {
    	$(window).resize(this.reset.bind(this));

		this.initNumberBoard();
		this.initIndicator();
		this.initMan();
    },
	initNumberBoard: function () {
		this.numberBoard = $('#leap-ruler');
		if ( this.numberBoard )
		{
			this.boardHeight = this.numberBoard.height();
			this.distancePerEntry = this.boardHeight/this.totalEntryCount;
			this.windowHeight = this.numberBoard.parent().height();
			this.numberBoard.css( 'marginTop', -this.boardHeight + this.windowHeight );
		}
	},
	initIndicator: function () {
		this.indicator = $('#leap-marker');
		if ( this.indicator )
			this.indicatorBottomOffset = parseFloat(this.indicator.css('bottom'));
	},
	initMan: function () {
		this.man = $('#leap-man');
		if ( this.man )
			this.manHeight = this.man.height();
	},
	startLiftoffWithDate: function ( date ) {
		this.startingDate = +date;
		this.isRunning = true;
		animLoop( this.animationTick.bind(this), this.numberBoard );
	},
	animationTick: function( deltaTime, now ) {
		if ( this.isRunning )
		{
			var inches = calculateInchesFromNowToDate( now, this.startingDate );
			var distance = this.distancePerEntry * inches;

			// if the calculated position is less than 1/2 of the window height, 
			// then move the arrow instead of the numbers
			if ( distance < this.windowHeight*0.5)
			{
				this.indicator.css( 'bottom', (distance+this.indicatorBottomOffset) );

				// wait until the distance is half-way up the man's height before moving him
				if ( distance > this.manHeight*0.5 )
					this.man.css( 'height', distance+this.manHeight*0.5 );
			}
			else
			{		
				// otherwise, move the numbers, be sure to accommodate for half of the window height,
				// which is the distance our arrow should have moved
				var targetPosition = (-this.boardHeight + this.windowHeight) + (distance-this.windowHeight*0.5);
				this.numberBoard.css( 'marginTop', targetPosition );
			}

			if ( inches < this.totalEntryCount )
				return true;
			else
				return false;			
		}
		else
		{
			return false;
		}
	}, 
	landWithDistance: function ( distance ) {
		this.isRunning = false;
	},
	reset: function () {
		this.initNumberBoard();
    	this.indicator.css( 'bottom', this.indicatorBottomOffset );
    	this.man.css( 'height', this.manHeight );
    }
};

this.liftoffAnimation = liftoffAnimation;
liftoffAnimation.init();

})();