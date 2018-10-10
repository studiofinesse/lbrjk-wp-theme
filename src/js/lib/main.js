(function($) {

	// Initiate AOS
	// AOS.init({
	// 	once: true
	// });

	$(document).ready(function() {

		// Mobile menu trigger
		$('.toggle--menu').click(function(){
			$(this).toggleClass('active');
			$('html').toggleClass('nav-open');
		});

	});

})(jQuery);