//= require game/motionDetector

var leaderboard = {
    init: function() {
    	var hasMotionData = motionDetector.hasMotionData();

		if ( !ALREADY_VIEWED_INTRO && hasMotionData )
			$('#welcome-panel').show();
		else
			$('#welcome-panel').hide();

		if ( hasMotionData )
			$('#leap-again-button').show();
		else
			$('#leap-again-button').hide();
    }
};

$(document).ready(function(){
    leaderboard.init();	
});