$(document).ready(function () {
  
	svg4everybody({});

	var bannerSlider = new Swiper('.banner-slider', {
		speed: 400,
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
		},
	});

	var reviewsSlider = new Swiper('.reviews-slider', {
		speed: 400,
		slidesPerView: 3,
		spaceBetween: 50,
		slidesPerGroup: 3,
	});

	$(window).scroll(function () {
		var movement = -parseInt($(this).scrollTop() / 2.5);
		$('.sections-wrapper').css({
		backgroundPosition: 'center ' + (movement+800) + 'px'
		});
		});
		
	$('.section-park-video').scroll(function () {
		var movement2 = -parseInt($(this).scrollTop() / 10);
		$('.park-section-bg').css('transform', 'scale(' + movement2 +')');
		console.log(movement2)
		});

});
