$(document).ready(function () {
  
	svg4everybody({});

	var bannerSlider = new Swiper('.banner-slider', {
		speed: 400,
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
		},
	});

	bannerSlider.on('slideChange', function () {
		console.log('slide changed');
		AOS.refresh()
		$('.banner-item__title').removeClass('bounce')
		$('.swiper-slide-active').children().children().children('.banner-item__content').children('.banner-item__title').addClass('bounce')

	});

	var reviewsSlider = new Swiper('.reviews-slider', {
		speed: 400,
		slidesPerView: 3,
		spaceBetween: 50,
		slidesPerGroup: 3,
	});

	$(window).scroll(function () {
		var movement = -parseInt($(this).scrollTop() / 2.35);
		$('.sections-wrapper').css({
		backgroundPosition: 'center ' + (movement+800) + 'px'
		});
		});
		
		var parkPosition = $('.section-park-video').offset().top - $(window).height(); 
		$(window).scroll(function () { 
		//var movement2 = -parseInt($(this).scrollTop() / 10); 
		var scrollPos = $(this).scrollTop(); 
		if (scrollPos > parkPosition && scrollPos < parkPosition + 900) { 
		$('.park-section-bg').css('transform', 'scale(' + (1 + (scrollPos - parkPosition) * 0.0003) +')'); 
		 } 
		});

		AOS.init();

});
