(function(){

var sparklines = {
    speed: 10,
    lines: [],
    running: false,
    canvas: {},
    init: function(el){
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
})();