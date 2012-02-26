(function(){
	
var aboutModal = {
	init: function () {
		$('a.help.icon').click(this.handleOpenClick);
		$("#about-overlay").click(this.handleCloseClick);
		$("#about-content a.close").click(this.handleCloseClick);
	},
	close: function () {
		$("#about-overlay").hide();
		$("#about-content").hide();
	},
	open: function () {
		$("#about-overlay").show();
		$("#about-content").show();
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