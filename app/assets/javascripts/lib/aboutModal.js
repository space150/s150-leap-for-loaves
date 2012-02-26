(function(){
	
var aboutModal = {
	init: function () {
		$('a.help.icon').click(this.handleOpenClick);
		$("#about-overlay").click(this.handleCloseClick);
		$("#about-content a.close").click(this.handleCloseClick);
	},
	close: function () {
		$("#about-overlay").fadeOut('fast');
		$("#about-content").fadeOut('fast');
	},
	open: function () {
		$("#about-overlay").fadeIn('fast');
		$("#about-content").fadeIn('fast');
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