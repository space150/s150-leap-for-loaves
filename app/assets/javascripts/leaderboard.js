//= require game/motionDetector

var leaderboard = {
    init: function() {
        var hasMotionData = motionDetector.hasMotionData();
        var isFirefox = (navigator.userAgent.match(/Firefox/i) != null);

        if ( !ALREADY_VIEWED_INTRO )
            aboutModal.open();

        if ( ALREADY_VIEWED_INTRO )
            $('#welcome-panel').hide();
        else if ( !isFirefox && hasMotionData )
            $('#welcome-panel').show();
		else
            $('#welcome-panel').hide();

		if ( !isFirefox && hasMotionData )
			$('.leap-again.button').removeClass('hidden');
		else
			$('.leap-again.button').addClass('hidden');

		$('#read-more-button').bind('touchstart mousedown', this.handleReadMoreClick.bind(this));

        _gaq.push(['_setCustomVar', 1, 'motionCapable', hasMotionData, 2]);
        _gaq.push(['_trackPageview', '/leaderboard']);
    },
    handleReadMoreClick: function (e) {
        e.preventDefault();
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