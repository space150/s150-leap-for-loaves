(function(){
	
var errorDialog = {
	panel: null,
	init: function () {
		this.panel = $("#error-panel");
		if ( this.panel )
		{
			this.panel.bind('touchstart mousedown', this.handleCloseClick.bind(this));
			this.panel.find('.message').bind('touchstart mousedown', 
				this.handleCloseClick.bind(this));
			this.panel.find("a.close").bind('touchstart mousedown', 
				this.handleCloseClick.bind(this));			
		}
	},
	close: function () {
		if ( !this.panel.is(':hidden') )
			this.panel.slideUp('fast');
	},
	show: function ( message ) {
		this.panel.find('.message').html( message);
		this.panel.slideDown('slow');
	},
	handleCloseClick: function (e) { 
		e.preventDefault();
		errorDialog.close();
	}
};

this.errorDialog = errorDialog;
errorDialog.init();

})();