//= require game/motionDetector

var leaderboard = {
    init: function() {
		if ( motionDetector.hasMotionData() )
		{
			$('#start-panel').show();
			$('body').addClass('welcome');
		}
		else
		{
			$('#start-panel').hide();
		}
    }
};

$(document).ready(function(){
    leaderboard.init();	
});