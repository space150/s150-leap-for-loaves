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

		$('#read-more-button').click(this.handleReadMoreClick);
    },
    handleReadMoreClick: function () {
    	var button = $('#read-more-button');
    	var panel = $('#read-more-panel');
    	if ( panel.is(':hidden') )
    	{
    		button.html('Close<i class="arrow"></i>');
    		button.addClass('open');
    		$('#read-more-panel').slideDown('slow');
    	}
    	else
    	{
    		button.html('Read More<i class="arrow"></i>');
    		button.removeClass('open');
			$('#read-more-panel').slideUp('slow');
    	}	
    	return false;
    }
};

$(document).ready(function(){
    leaderboard.init();	
});