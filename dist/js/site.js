(function($){
	/**
	 * Owl Carousel
	 */
	
	$('.carousel-container').each(function(){
		var container = $(this),
			carousel = container.find('.carousel')

		carousel.owlCarousel({
			items: 1,
			margin: 0,
			loop: true,
			nav: false,
			dots: true,
			dotsContainer: container.find('.carousel-nav')
		})
	})
})(jQuery)