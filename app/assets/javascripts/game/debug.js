(function(){

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

this.debug = debug;
debug.init();

})();