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
		this.initNumberBoard();
    },
	initNumberBoard: function () {
		this.numberBoard = $('#number-board');
		if ( this.numberBoard )
		{
			this.boardHeight = parseFloat(this.numberBoard.css('height'));
			this.distancePerEntry = this.boardHeight/this.totalEntryCount;
			this.windowHeight = parseFloat(this.numberBoard.parent().css('height'))
			this.numberBoard.css( 'marginTop', -this.boardHeight );
		}
	},
	startLiftoffWithDate: function ( date ) {
		this.startingDate = +date;
		this.isRunning = true;
		animLoop( this.animationTick.bind(this), this.numberBoard );
	},
	animationTick: function( deltaT, now ) {
		var inches = calculateInchesFromNowToDate( now, this.startingDate );
		var targetPosition = (-this.boardHeight) + (this.distancePerEntry * inches);
		this.numberBoard.css( 'marginTop', targetPosition );
		
		if ( this.isRunning && inches < this.totalEntryCount )
			return true;
		else
			return false;
	}, 
	landWithDistance: function ( distance ) {
		this.isRunning = false;
	}
};

this.liftoffAnimation = liftoffAnimation;
liftoffAnimation.init();

})();