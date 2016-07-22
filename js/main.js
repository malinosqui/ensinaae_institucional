; (function () {

	'use strict';

	// Main Menu Superfish
	var mainMenu = function () {

		$('#fh5co-primary-menu').superfish({
			delay: 0,
			animation: {
				opacity: 'show'
			},
			speed: 'fast',
			cssArrows: true,
			disableHI: true
		});

	};

	// Animations

	var contentWayPoint = function () {
		var i = 0;
		$('.animate-box').waypoint(function (direction) {

			if (direction === 'down' && !$(this.element).hasClass('animated')) {

				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function () {

					$('body .animate-box.item-animate').each(function (k) {
						var el = $(this);
						setTimeout(function () {
							el.addClass('fadeInUp animated');
							el.removeClass('item-animate');
						}, k * 200, 'easeInOutExpo');
					});

				}, 100);

			}

		}, { offset: '85%' });
	};


	// Document on load.
	$(function () {

		mainMenu();
		contentWayPoint();

		$('#email').bind('change', function () {

			var field = $('#email');

			if (!field[0].value)
				$('#email-error').addClass('show');
			else
				$('#email-error').removeClass('show');
		});

	});

	$('a[href*="#"]:not([href="#"])').click(function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: target.offset().top
				}, 1000);
				return false;
			}
		}
	});

	$(window).scroll(function () {
		if ($(this).scrollTop() > 647) {
			$('#fh5co-header-section').addClass('header-fixed');
			$('#fh5co-logo').addClass('header-fixed');
			$('#fh5co-logo').addClass('animated bounceIn');

		} else {
			$('#fh5co-header-section').removeClass('header-fixed');
			$('#fh5co-logo').removeClass('header-fixed');
			// $('#fh5co-logo').addClass('animated bounceOut');

		}
	});

} ());

