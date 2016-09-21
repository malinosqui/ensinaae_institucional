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

	function validateEmail(email) {
		var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		return re.test(email);
	}

	function validate() {
		var field = $('#email');

		if (!validateEmail(field[0].value)) {

			new PNotify({
				title: 'E-mail inválido',
				type: 'error',
				text: 'Preencha o e-mail correntamente e tente de novo!'
			});

			return false;
		}
		else {
			return true;
		}
	}


	// Document on load.
	$(function () {

		PNotify.prototype.options.styling = "bootstrap3";

		// configurando firebase
		var config = {
			apiKey: "AIzaSyB-SJCUV-h63gIsJmCmRGs46s2DptuWBu8",
			authDomain: "ensinaae-9ae64.firebaseapp.com",
			databaseURL: "https://ensinaae-9ae64.firebaseio.com",
			storageBucket: "ensinaae-9ae64.appspot.com",
		};
		firebase.initializeApp(config);

		var database = firebase.database();


		mainMenu();
		contentWayPoint();

		// $('#email').bind('change', function () {
		// 	validate();
		// });

		$('#btnContinue').bind('click', function () {

			// $('#_course').val();

		});

		$('#date').mask('00/00/0000');
		$('#hour').mask('00:00');
		$('#location').mask('00000-000');
		$('#phone').mask("(00) 00000-0000");

		$('[data-toggle="tooltip"]').tooltip();

		$("#phone-check").change(function () {
			if (this.checked)
				$("#phone-div").css("display", "block");
			else
				$("#phone-div").css("display", "none");
		});

		var options = {
			data: ["Atualidades", "Biologia", "Espanhol", "Física", "Geografia", "Gramática", "História", "Inglês", "Matemática", "Redação"]
		};

		$("#_course").easyAutocomplete(options);
		
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

