//= require game/motionDetector

var leaderboard = {
    init: function() {
		if ( true)//motionDetector.hasMotionData() )
		{
			$('#start-panel').show();
			$('body').addClass('welcome');
		}
		else
		{
			$('#start-panel').hide();
			$('#leaderboard-panel').show();
		}
    }
};

$(document).ready(function(){
    leaderboard.init();	
});