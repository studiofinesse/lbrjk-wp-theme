(function($) {

	$(document).ready(function() {

		/*
		 * Not quite 'Accordian' Style FAQs
		 */
		$('.panel--collapse .panel__head').click(function() {
			if($(this).parent().hasClass('open')) {
				$(this).parent().removeClass('open');
				$(this).next('.panel__content').slideUp();
			} else {
				$(this).parent().addClass('open');
				$(this).next('.panel__content').slideDown();
			}
		});

	});

})(jQuery);