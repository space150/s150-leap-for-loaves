//= require game/motionDetector
//= require game/jumpDetector

// this provides motion and jump debug output

(function(){
	
var sparklines = {
    speed: 10,
    lines: [],
    running: false,
    canvas: {},
    init: function(el) {
        var _this = this;
        var canvas = this.canvas;
        canvas.canvas = document.getElementById(el);
        canvas.ctx = canvas.canvas.getContext("2d");
        canvas.width = canvas.canvas.width;
        canvas.height = canvas.canvas.height;

        this.run();
    },
    addLine: function(line){
        this.lines.push(line);
    },
    draw: function(){
        var canvas = this.canvas,
            ctx = canvas.ctx,
            imgData = ctx.getImageData( 1, 0, canvas.width - 1, canvas.height );
        ctx.putImageData(imgData, 0, 0);
        ctx.clearRect( canvas.width - 1, 0, 1, canvas.height );

        $.each(this.lines, function(idx, item){
            ctx.fillStyle = item.color;
            ctx.fillRect( canvas.width - 1, item.value / 100 * canvas.height, 1, 1 );
        });
    },
    run: function(){
        var _this = this;
        setTimeout(function(){
            if(_this.running){
                _this.draw();
            }
            _this.run();
        }, this.speed);
    },
    line: function( name, color, value ){
        this.name = name || "";
        this.color = color || "#555";
        this.value = value || 0;
        this.lastVal = 0;
    }
};

this.sparklines = sparklines;

var debug = {
    lines: [],
    init: function() {
		this.initMotionDetector();
        this.initSparklines();
    },
    initMotionDetector: function() {
        motionDetector.register(this.moved.bind(this));
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
    moved: function(e) {
        var lines = this.lines;
        $.each(lines, function(i){
            this.lastVal = this.value;
        });
        lines[0].value = e.accel.x + 25;
        lines[1].value = e.accel.y + 45;
        lines[2].value = e.accel.z + 70;
		
		$("#mm").html( "delta [" + jumpDetector.toString() + "]" );
    }
};

this.debug = debug;

if ( $('#mm').length > 0 )
	debug.init();

})();