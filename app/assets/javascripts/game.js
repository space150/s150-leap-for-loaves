//= require application
//= require game/accel
//= require game/jumper
//= require game/sparklines

var testacc = {
    lines: [],
    init: function() {
        this.initAccel();
        this.initSparklines();
		this.initJumper();
        $("#onoff").click(function(){
            sparklines.running = !sparklines.running;
        })
    },
    initAccel: function() {
        accel.register(this.moved);
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
        var lines = testacc.lines;
        $.each(lines, function(i){
            this.lastVal = this.value;
        });
        lines[0].value = e.accel.x + 25;
        lines[1].value = e.accel.y + 45;
        lines[2].value = e.accel.z + 70;
    },
	liftoff: function () {
		$('#jump-feedback').html('<strong>JUMPING!</strong>');
	},
	landed: function () {
		$('#jump-feedback').html('currently not airborne.');
	}
};

$(document).ready(function(){
    testacc.init();

	$('#hold').bind('touchstart mousedown', function() {
		$('#hold-feedback').html('<strong>PRESSED!</strong>');
	}).bind('touchend touchcancel mouseup mouseleave', function() {
		$('#hold-feedback').html('button not pressed.');
	});
	
});