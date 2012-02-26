//= require game/animLoop
//= require game/distanceCalculation

(function(){

// liftoff animation handles all the user ruler animation/syncing. It should sync up with the events coming
// from the leap game object

var liftoffAnimation = {
	numberBoard: null,
	boardHeight: 0,
	windowHeight: 0,
	totalEntryCount: 50,
	distancePerEntry: 0,
	startingDate: null,
	isRunning: false,
    init: function() {
    	// this causes issues with orientation change on mobile devices, so desktop users will just have
    	// to refresh thier browser when they resize thier window...
		//$(window).resize(this.initNumberBoard.bind(this));
		this.initNumberBoard();
    },
	initNumberBoard: function () {
		this.numberBoard = $('#leap-ruler');
		if ( this.numberBoard )
		{
			this.boardHeight = parseFloat(this.numberBoard.css('height'));
			this.distancePerEntry = this.boardHeight/this.totalEntryCount;
			this.windowHeight = parseFloat(this.numberBoard.parent().css('height'));
			this.numberBoard.css( 'marginTop', -this.boardHeight + this.windowHeight );
		}
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
			var targetPosition = (-this.boardHeight + this.windowHeight) + (this.distancePerEntry * inches);
			this.numberBoard.css( 'marginTop', targetPosition );

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
	}
};

this.liftoffAnimation = liftoffAnimation;
liftoffAnimation.init();

})();