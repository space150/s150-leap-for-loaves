//= require application
//= require game/accel

var leaderboard = {
    init: function() {
		if ( !accel.hasMotionData() )
			$('#start-panel').hide();
    }
};

$(document).ready(function(){
    leaderboard.init();	
});