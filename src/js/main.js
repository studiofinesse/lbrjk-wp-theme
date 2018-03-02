//=require vendor/modernizr.js
//=require lib/helpers.js
//=require lib/panels.js

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