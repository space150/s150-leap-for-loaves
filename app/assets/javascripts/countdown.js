
var countdown = {
	then: new Date("Feb 29 2012 00:00:00"),
	timer: null,
    init: function() {
    	this.timer = setTimeout(this.tick.bind(this), 1000);
        _gaq.push(['_trackPageview', '/countdown']);
    },
    tick: function () {
    	var now = new Date();
 	  	var diff = new Date(this.then - now);
 		var seconds_left = Math.floor(diff.valueOf() / 1000);
 		var seconds = Math.floor(seconds_left / 1) % 60;
 		var minutes = Math.floor(seconds_left / 60) % 60;
 		var hours = Math.floor(seconds_left / 3600) % 24;
 		var days = Math.floor(seconds_left / 86400) % 86400;
 		this.updateDisplay( days, hours, minutes, seconds );
 		this.timer = setTimeout(this.tick.bind(this), 1000);
    },
    updateDisplay: function ( days, hours, minutes, seconds ) {
 		$('#days').html(this.formatNumber(days));
 		$('#hours').html(this.formatNumber(hours));
 		$('#minutes').html(this.formatNumber(minutes));
 		$('#seconds').html(this.formatNumber(seconds));
    },
    formatNumber: function ( number ) {
    	var value = number + '';
 		if ( value.length < 2 ) {
 	    	return "0" + value;
 		}
 		return value;
 	}
};

$(document).ready(function(){
    countdown.init();	
});