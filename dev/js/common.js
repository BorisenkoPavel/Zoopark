$(document).ready(function () {

	// $(".goto").on("click", function (event) {
	// 	event.preventDefault();
	// 	var id = $(this).attr('href'),
	// 			top = $(id).offset().top-150;
	// 	$('body, html').animate({
	// 		scrollTop: top
	// 	}, 350);
	// });

	$(document).on("click", '[data-toggle="lightbox"]', function(event) {
		event.preventDefault();
		$(this).ekkoLightbox();
	});
	
	AOS.init();

	var accordion = document.getElementsByClassName("accordion");

	for (let i = 0; i < accordion.length; i++) {
		accordion[i].addEventListener("click", function(){
			this.classList.toggle("active");
			var details = this.nextElementSibling;
			details.classList.toggle("active");

			if (details.style.maxHeight) {
				details.style.maxHeight = null;
				// details.addEventListener("transitionend", function(){
				// 	details.style.paddingTop = null
				// })

			} else {
				details.style.maxHeight = details.scrollHeight + 15 + "px";
			}
		});
	}

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

	$('.menu-title').on('click', function(){

		$('.hamburger--squeeze').toggleClass('is-active')
		$('.menu').toggleClass('is-active')
	})
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

		var videoPlayButton,
    videoWrapper = document.getElementsByClassName('video-wrapper')[0],
    video = document.getElementsByTagName('video')[0],
		videoMethods = {}
		
		videoMethods.renderVideoPlayButton = function() {
    if (videoWrapper.contains(video)) {
      this.formatVideoPlayButton();
      video.classList.add('has-media-controls-hidden');
      videoPlayButton = document.getElementsByClassName('video-overlay-play-button')[0];
      videoPlayButton.addEventListener('click', this.hideVideoPlayButton);
    }
	}
	
  videoMethods.formatVideoPlayButton = function () {
    videoWrapper.insertAdjacentHTML('beforeend', '\
                <svg class="video-overlay-play-button" viewBox="0 0 200 200" alt="Play video">\
                    <circle cx="100" cy="100" r="90" fill="none" stroke-width="15" stroke="#fff"/>\
                    <polygon points="70, 55 70, 145 145, 100" fill="#fff"/>\
                </svg>\
            ');
	}
	
  videoMethods.hideVideoPlayButton = function() {
    video.play();
    videoPlayButton.classList.add('is-hidden');
    video.classList.remove('has-media-controls-hidden');
    video.setAttribute('controls', 'controls');
    $('.close-video').removeClass('hidden');
  }

	// video.addEventListener("pause", function (){
	// 	this.src = this.src
	// 	videoPlayButton.classList.remove('is-hidden')
	// 	video.classList.add('has-media-controls-hidden')
	// })
	$('.close-video').on('click', function (){
		video.src = video.src
		videoPlayButton.classList.remove('is-hidden')
		video.classList.add('has-media-controls-hidden')
		$(this).addClass('hidden')
	})
	// var svgButton = videoWrapper.querySelector('.video-overlay-play-button')
	// svgButton.
videoMethods.renderVideoPlayButton()

});
