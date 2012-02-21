//= require application
//= require game/accel
//= require game/jumper
//= require game/sparklines
//= require game/debug

var game = {
	timer: null,
	gameRunning: false,
	countdownTimeLeft: 3,
	liftoffDate: null,
	init: function () {
		this.initJumper();
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
		
		jumper.startup();
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
			jumper.enableJumping();
		}	
	},
	completeSession: function () {
		if ( !this.gameRunning ) return;
		
		sparklines.running = false;
		this.gameRunning = false;
		this.countdownTimeLeft = 3.0;
		this.liftoffDate = null;
		
		jumper.shutdown();
		clearTimeout(this.timer);
		
		$('#message-output').html('Get ready to leap!');
	},
	initJumper: function () {
		jumper.registerForLiftoff(this.liftoff.bind(this));
		jumper.registerForLanding(this.landed.bind(this));
	},
	liftoff: function () {
		if ( this.gameRunning )
		{
			this.liftoffDate = new Date();
			$('#jump-feedback').html('<strong>JUMPING!</strong>');
		}
	},
	landed: function () {
		if ( this.gameRunning )
		{
			// get the ms diff for the liftoff/landing
			var now = new Date();
			var d1 = now.getTime() - this.liftoffDate.getTime();
			var d2 = d1*0.16;
			var inches = d2*0.0393700787;

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
	game.init();
});