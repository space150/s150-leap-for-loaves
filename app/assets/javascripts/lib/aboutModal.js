(function(){
	
var aboutModal = {
	init: function () {
		$('a.help.icon').bind('touchstart mousedown', this.handleOpenClick.bind(this))
		$("#about-close").bind('touchstart mousedown', this.handleCloseClick.bind(this));
	},
	close: function () {
		$("#about-overlay").fadeOut('fast');
		$("#about-content").fadeOut('fast');
		$("#about-close").fadeOut('fast');
	},
	open: function () {
		$("#about-overlay").fadeIn('fast');
		$("#about-content").fadeIn('fast');
		$("#about-close").fadeIn('fast');
	},
	handleOpenClick: function (e) {
		e.preventDefault();
		aboutModal.open();
	},
	handleCloseClick: function (e) { 
		e.preventDefault();
		aboutModal.close();
	}
};

this.aboutModal = aboutModal;
aboutModal.init();

})();