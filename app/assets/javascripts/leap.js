//= require game/motionDetector
//= require game/jumpDetector
//= require game/liftoffAnimation
//= require game/distanceCalculation
//= require lib/2.5.3-crypto-sha1
//= require lib/2.5.3-crypto-min
//= require lib/jquery-cookie
//= require game/debug

// leap is the main leap game entry point

var leap = {
	timer: null,
	gameRunning: false,
	countdownTime: 0,
	countdownTicks: 3,
	liftoffDate: null,
	outputMessages: [ '<h1 class="light">Ready...</h1>', 
		'<h1>Ready...</h1><h1 class="light">Set...</h1>', 
		'<h1>Ready...</h1><h1>Set...</h1><h1 class="light">Leap!</h1>'],
	cookieMessage: 'Cookies are not enabled. Please enable cookies in your browser settings to leap for loaves!',
	init: function () {
		this.initJumpDetector();
		this.initHoldButton();

		if ( !this.checkForCookies() )
		{
			errorDialog.show( this.cookieMessage );
		}

		 _gaq.push(['_trackPageview', '/leap']);
	},
	checkForCookies: function () {
		var c = 'test_cookie';
	    $.cookie( c, true );
	    if ( $.cookie( c ) )
	    {
			$.cookie( c, null );
			return true;
	    }
	    else
	    	return false;
	},
	initHoldButton: function () {
		$('#hold-button').bind('touchstart mousedown', this.startGame.bind(this))
			.bind('touchend touchcancel mouseup mouseleave', this.endGame.bind(this));	
	},
	startGame: function (e) {
		e.preventDefault();

		$('#hold-feedback').html('<strong>B</strong>');
		$('#hold-button').addClass('active');
		$('#leap-man').addClass('ready').removeClass('leaping');

		this.startCountdown();
	},
	endGame: function (e) {
		e.preventDefault();
		
		$('#hold-feedback').html('');
		$('#hold-button').removeClass('active');
		$('#leap-man').removeClass('ready').removeClass('leaping');
		
		if ( this.gameRunning && jumpDetector.isAirborne )
		{
			this.landed();
		}
		else
		{
			this.completeSession();
			liftoffAnimation.reset();
		}
	},
	startCountdown: function () {
		if ( this.gameRunning ) return;
		
		this.gameRunning = true;
		$('#message-output').html(this.outputMessages[this.countdownTime]);
		clearTimeout(this.timer);
		this.timer = setTimeout(this.countdownTick.bind(this), 1000);

		sparklines.running = true;
		
		jumpDetector.startup();
	},
	countdownTick: function () {
		if ( !this.gameRunning ) return;
		
		this.countdownTime += 1;
		$('#message-output').html(this.outputMessages[this.countdownTime]);
			
		if ( this.countdownTime < this.countdownTicks )
		{
			clearTimeout(this.timer);
			this.timer = setTimeout(this.countdownTick.bind(this), 1000);			
		}
		else
		{
			$('#message-output').html(this.outputMessages[this.countdownTime]);
			jumpDetector.enableJumping();
			errorDialog.close();
		}	
	},
	completeSession: function () {
		if ( !this.gameRunning ) return;
		
		sparklines.running = false;

		this.gameRunning = false;
		this.countdownTime = 0;
		this.liftoffDate = null;
		
		jumpDetector.shutdown();
		clearTimeout(this.timer);
		
		$('#message-output').html('<h1>Hold the button while you leap.</h1>');
	},
	initJumpDetector: function () {
		jumpDetector.registerForLiftoff(this.liftoff.bind(this));
		jumpDetector.registerForLanding(this.landed.bind(this));
	},
	liftoff: function () {
		if ( this.gameRunning )
		{
			this.liftoffDate = new Date();
			$('#jump-feedback').html('<strong>J</strong>');
			$('#leap-man').addClass('leaping').removeClass('ready');
			$('#leap-shadow').addClass('leaping');
			
			// start the rocketship animation
			liftoffAnimation.startLiftoffWithDate( this.liftoffDate );
		}
	},
	landed: function () {
		if ( this.gameRunning )
		{
			var start = +this.liftoffDate;
			var now = +new Date();
			var inches = calculateInchesFromNowToDate( now, start );
			
			// complete the liftoff animation
			liftoffAnimation.landWithDistance( inches );

			// submit the high score
			if ( motionDetector.hasMotionData() )
			{
				var csrf = $("meta[name='csrf-token']").attr('content');
				var message = now + '-' + start + '-' + inches + '-' + csrf;
				var digest = Crypto.util.bytesToHex(Crypto.SHA1( message, { asBytes: true } ));
				$.ajax({
					type: 'POST',
					url: '/leaps.json',
					data: { n: now, s: start, d: inches, x: digest },
					success: this.scoreUploaded.bind(this),
					error: this.scoreUploadFailed.bind(this)
				});
			}

			this.completeSession();

			this.updateViewForScore( inches );
		}
	},
	updateViewForScore: function ( inches ) {
		$('#jump-feedback').html('<strong>' + inches + '"</strong>');
		$('#message-output').html('<h1>One Moment...</h1>');
		$('#hold-button').addClass('hidden');
	},
	scoreUploaded: function ( data ) {
		var total = data.t;
		var inches = data.i;
		$('#leap-panel').hide();
		$('#result-panel').show();
		$('#result-inches').html(inches);
		$('#result-total-inches').html(total);

		_gaq.push(['_trackEvent', 'leaps', 'leapSubmitted', undefined, inches]);
	},
	scoreUploadFailed: function ( error ) {
		errorDialog.show( this.cookieMessage );
	}
};

$(document).ready(function(){
	leap.init();
});