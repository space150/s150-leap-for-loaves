//= require application
//= require game/motionDetector
//= require game/jumpDetector
//= require game/liftoffAnimation
//= require game/distanceCalculation
//= require game/debug

// leap is the main leap game entry point

var leap = {
	timer: null,
	gameRunning: false,
	countdownTimeLeft: 3,
	liftoffDate: null,
	init: function () {
		this.initJumpDetector();
		this.initHoldButton();
	},
	initHoldButton: function () {
		$('#hold-button').bind('touchstart mousedown', this.startGame.bind(this))
			.bind('touchend touchcancel mouseup mouseleave', this.endGame.bind(this));	
	},
	startGame: function () {
		$('#hold-feedback').html('<strong>PRESSED!</strong>');
		this.startCountdown();
	},
	endGame: function () {
		$('#hold-feedback').html('button not pressed.');
		this.completeSession();
	},
	startCountdown: function () {
		if ( this.gameRunning ) return;
		
		this.gameRunning = true;
		$('#message-output').html('Leap in 3...');
		clearTimeout(this.timer);
		this.timer = setTimeout(this.countdownTick.bind(this), 1000);
		sparklines.running = true;
		
		jumpDetector.startup();
	},
	countdownTick: function () {
		if ( !this.gameRunning ) return;
		
		this.countdownTimeLeft -= 1;
		$('#message-output').html('Leap in ' + this.countdownTimeLeft + '...');
			
		if ( this.countdownTimeLeft > 0 )
		{
			clearTimeout(this.timer);
			this.timer = setTimeout(this.countdownTick.bind(this), 1000);			
		}
		else
		{
			$('#message-output').html('GO! GO! GO!');
			jumpDetector.enableJumping();
		}	
	},
	completeSession: function () {
		if ( !this.gameRunning ) return;
		
		sparklines.running = false;
		this.gameRunning = false;
		this.countdownTimeLeft = 3.0;
		this.liftoffDate = null;
		
		jumpDetector.shutdown();
		clearTimeout(this.timer);
		
		$('#message-output').html('Get ready to leap!');
	},
	initJumpDetector: function () {
		jumpDetector.registerForLiftoff(this.liftoff.bind(this));
		jumpDetector.registerForLanding(this.landed.bind(this));
	},
	liftoff: function () {
		if ( this.gameRunning )
		{
			this.liftoffDate = new Date();
			$('#jump-feedback').html('<strong>JUMPING!</strong>');
			
			// start the rocketship animation
			liftoffAnimation.startLiftoffWithDate( this.liftoffDate );
		}
	},
	landed: function () {
		if ( this.gameRunning )
		{
			var inches = calculateInchesFromNowToDate( +new Date(), +this.liftoffDate );
			
			// complete the liftoff animation
			liftoffAnimation.landWithDistance( inches );

			this.updateViewForScore( inches );
			this.submitScore( inches );
			
			this.completeSession();
		}
	},
	updateViewForScore: function ( inches ) {
		$('#jump-feedback').html('Last leap was ' + inches + ' inches in height');
	},
	submitScore: function ( inches ) {	
		$.ajax({
			type: 'POST',
			url: '/leaps.json',
			data: { inches: inches },
			success: function ( data ) {
				console.log('data: ' + data);
			},
			error: function ( error ) {
				console.log('error: ' + error);
			}
		});
	}
};

$(document).ready(function(){
	leap.init();
});