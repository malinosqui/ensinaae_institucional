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

		$('#date').datepicker({
			format: "mm/dd/yyyy",
			language: 'pt-BR'
		});

		jQuery.extend(jQuery.validator.messages, {
			required: "Campo obrigatório.",
			email: "E-mail inválido",
			date: "Data inválida.",
			number: "Número inválido.",
			maxlength: jQuery.validator.format("É somente no máximo {0} caracteres."),
			minlength: jQuery.validator.format("É permitido no mínimo {0} caracteres.")
		});

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

		var courses = ["Atualidades", "Biologia", "Espanhol", "Física", "Geografia", "Gramática", "História", "Inglês", "Matemática", "Redação"];


		var options = {
			data: courses,
			list: {
				match: {
					enabled: true
				},
				onSelectItemEvent: function () {
					var value = $("#_course").getSelectedItemData();
					if (value) {
						console.log(value);
						$("#course").val(value).trigger("change");
						$("#btnContinue").prop("disabled", false);
						$("#_course").val(value);
					}
					else {
						$("#btnContinue").prop("disabled", true);
					}
				}
			}
		};

		var optionsModal = {
			data: courses,
			list: {
				match: {
					enabled: true
				}
			}
		};

		$("#_course").easyAutocomplete(options);
		$("#course").easyAutocomplete(optionsModal);

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
			$('#startMenu').css('display', 'block');
			$('.warning').css('display', 'none');
		} else {
			$('#fh5co-header-section').removeClass('header-fixed');
			$('#fh5co-logo').removeClass('header-fixed');
			$('#startMenu').css('display', 'none');
			// $('#fh5co-logo').addClass('animated bounceOut');

		}
	});

	$('#btnBuy').click(function () {

		//verifica formulário'
		if (!$("#formModal").valid())
			return;


		$("#btnBuy>img").css("display", "inline-block");
		$("#btnBuy").prop("disabled", "true");


		var obj = {
			name: $("#name").val(),
			phone: $("#phone").val(),
			usePhoneToContact: $("#phone-check").prop("checked"),
			dateClass: $("#date").val(),
			hourLesson: $("#hour").val(),
			customerEmail: $("#email").val(),
			price: $("#price option:selected").text(),
			location: $("#location").val(),
			level: $("#level option:selected").text(),
			course: $("#course").val(),
			frequency: $('#frequency option:selected').text()
		};

		var btn = this;

		$.ajax({
			url: "http://ensinaae-mail.azurewebsites.net/sendSimple",
            cache: false,
            type: "POST",
			method: "POST",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(obj),
            success: function (data, textStatus, XMLHttpRequest) {
				$("#modalForm").css("display", "none");
				$("#modalSuccess").css("display", "block");
				$("#btnDismiss").html("OK");
				$(btn).css("display", "none");
				$("#btnBuy>img").css("display", "none");

            },
			error: function (err, status) {
				console.log(err, status);
			}
        });
	});


	var offset = 300;

	var navigationContainer = $('#cd-nav'),
		mainNavigation = navigationContainer.find('#cd-main-nav ul');

	//open or close the menu clicking on the bottom "menu" link
	$('.cd-nav-trigger').on('click', function () {
		$(this).toggleClass('menu-is-open');
		//we need to remove the transitionEnd event handler (we add it when scolling up with the menu open)
		mainNavigation.off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend').toggleClass('is-visible');

	});

	// function checkMenu() {
	// 	if ($(window).scrollTop() > offset && !navigationContainer.hasClass('is-fixed')) {
	// 		navigationContainer.addClass('is-fixed').find('.cd-nav-trigger').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function () {
	// 			mainNavigation.addClass('has-transitions');
	// 		});
	// 	} else if ($(window).scrollTop() <= offset) {
	// 		//check if the menu is open when scrolling up
	// 		if (mainNavigation.hasClass('is-visible') && !$('html').hasClass('no-csstransitions')) {
	// 			//close the menu with animation
	// 			mainNavigation.addClass('is-hidden').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
	// 				//wait for the menu to be closed and do the rest
	// 				mainNavigation.removeClass('is-visible is-hidden has-transitions');
	// 				navigationContainer.removeClass('is-fixed');
	// 				$('.cd-nav-trigger').removeClass('menu-is-open');
	// 			});
	// 			//check if the menu is open when scrolling up - fallback if transitions are not supported
	// 		} else if (mainNavigation.hasClass('is-visible') && $('html').hasClass('no-csstransitions')) {
	// 			mainNavigation.removeClass('is-visible has-transitions');
	// 			navigationContainer.removeClass('is-fixed');
	// 			$('.cd-nav-trigger').removeClass('menu-is-open');
	// 			//scrolling up with menu closed
	// 		} else {
	// 			navigationContainer.removeClass('is-fixed');
	// 			mainNavigation.removeClass('has-transitions');
	// 		}
	// 	}
	// }

} ());
