//= require application
//= require game/accel
//= require game/jumper
//= require game/sparklines

var debug = {
    lines: [],
    init: function() {
        this.initAccel();
        this.initSparklines();
        $("#onoff").click(function(){
            sparklines.running = !sparklines.running;
        })
    },
    initAccel: function() {
        accel.register(this.moved.bind(this));
    },
    initSparklines: function() {
        var linesData = [
                {axis:"x", col:"red", xOff: 20},
                {axis:"y", col:"green", xOff: 40},
                {axis:"z", col:"yellow", xOff: 60}
            ],
            _this = this;

        sparklines.init("sparks");
        
        $.each(linesData, function(i){
            var line = new sparklines.line(this.axis, this.col, this.xOff);
            sparklines.addLine(line);
            _this.lines.push(line);
        });
    },
	initJumper: function () {
		jumper.registerForLiftoff(this.liftoff);
		jumper.registerForLanding(this.landed);
	},
    moved: function(e) {
        var lines = this.lines;
        $.each(lines, function(i){
            this.lastVal = this.value;
        });
        lines[0].value = e.accel.x + 25;
        lines[1].value = e.accel.y + 45;
        lines[2].value = e.accel.z + 70;
		
		$("#mm").html( "delta [" + jumper.toString() + "]" );
    }
};

var game = {
	timer: null,
	gameRunning: false,
	countdownTimeLeft: 3,
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
		this.timer = setTimeout(this.countdownTick.bind(this), 1000);
		sparklines.running = true;
	},
	countdownTick: function () {
		if ( !this.gameRunning ) return;
		
		this.countdownTimeLeft -= 1;
		$('#message-output').html('Leap in ' + this.countdownTimeLeft + '...');
			
		if ( this.countdownTimeLeft > 0 )
			this.timer = setTimeout(this.countdownTick.bind(this), 1000);
		else
		{
			$('#message-output').html('GO! GO! GO!');
			jumper.startup();
		}	
	},
	completeSession: function () {
		if ( !this.gameRunning ) return;
		
		sparklines.running = false;
		this.gameRunning = false;
		this.countdownTimeLeft = 3.0,
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
			$('#jump-feedback').html('<strong>JUMPING!</strong>');
		}
	},
	landed: function () {
		if ( this.gameRunning )
		{
			$('#jump-feedback').html('currently not airborne.');
			this.completeSession();
		}
	}
};

$(document).ready(function(){
    debug.init();
	game.init();
});