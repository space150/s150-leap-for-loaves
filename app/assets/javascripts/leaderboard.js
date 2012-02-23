//= require application
//= require game/motionDetector

var leaderboard = {
    init: function() {
		if ( motionDetector.hasMotionData() )
			$('#start-panel').show();
    }
};

$(document).ready(function(){
    leaderboard.init();	
});