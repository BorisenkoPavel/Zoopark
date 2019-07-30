$(document).ready(function () {

	$(document).on("click", '[data-toggle="lightbox"]', function(event) {
		event.preventDefault();
		$(this).ekkoLightbox();
	});
	
	AOS.init();

// 	$(".nav").sticky({topSpacing:0});
//   $('.nav').on('sticky-start', function() { 
// 		console.log("Started");
// 		$('.logo').addClass('hidden');
// 	 });
// 	$('.nav').on('sticky-end', function() { 
// 		console.log("Ended"); 
// 		$('.logo').removeClass('hidden');
// });

	var bannerSlider = new Swiper('.banner-slider', {
		speed: 400,
		autoplay: {
			delay: 5000,
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
		loop: true,
			navigation: {
				nextEl: '.swiper-button-next.banner-button-next',
				prevEl: '.swiper-button-prev.banner-button-prev',
			},
	});

	var gallerySlider = new Swiper('.gallery-slider', {
		speed: 400,
		slidesPerView: 3,
		spaceBetween: 10,
			navigation: {
				nextEl: '.swiper-button-next.gallery-button-next',
				prevEl: '.swiper-button-prev.gallery-button-prev',
			},
			breakpoints: {
				992: {
					slidesPerView: 2,
				},
				576: {
					slidesPerView: 1,
				}
			},
	});
	var pageSlider = new Swiper('.page-slider', {
		speed: 400,
			navigation: {
				nextEl: '.swiper-button-next.page-button-next',
				prevEl: '.swiper-button-prev.page-button-prev',
			},
	});

	var reviewsSlider = new Swiper('.reviews-slider', {
		speed: 400,
		slidesPerView: 3,
		spaceBetween: 50,
		slidesPerGroup: 3,
		navigation: {
			nextEl: '.swiper-button-next.reviews-button-next',
			prevEl: '.swiper-button-prev.reviews-button-prev',
		},
		breakpoints: {
			992: {
				navigation: false,
				slidesPerView: 2,
			},
			// when window width is <= 640px
			576: {
				slidesPerView: 1,
				spaceBetween: 30,
			}
		}
	});

	$('.hamburger--squeeze').on('click', function(){

		$(this).toggleClass('is-active')
		$('.menu').toggleClass('is-active')
	})

	// $(window).scroll(function () {
	// 	var movement = -parseInt($(this).scrollTop() / 2.35);
	// 	$('.sections-wrapper').css({
	// 	backgroundPosition: 'center ' + (movement+800) + 'px'
	// 	});
	// 	});
		
		// var parkPosition = $('.section-park-video').offset().top - $(window).height(); 
		// $(window).scroll(function () { 
		// //var movement2 = -parseInt($(this).scrollTop() / 10); 
		// var scrollPos = $(this).scrollTop(); 
		// if (scrollPos > parkPosition && scrollPos < parkPosition + 900) { 
		// $('.park-section-bg').css('transform', 'scale(' + (1 + (scrollPos - parkPosition) * 0.0003) +')'); 
		//  } 
		// });
		$( window ).resize(function() {
			if ($(window).width()>992) {
				$('.hamburger--squeeze').removeClass('is-active')
				$('.menu').removeClass('is-active')
			}
		});

		$('.menu__nav').children('li').children('.nav-link').on('click', function(event) {
			event.preventDefault()
			$(this).siblings('.nav__sub-menu').slideToggle()
		})
});
