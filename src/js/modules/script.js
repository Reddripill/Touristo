'use strict';

window.addEventListener('load', function (event) {
	const body = document.querySelector('body');

	let menuBurger = document.querySelector('.menu__burger');
	let menuBody = document.querySelector('.menu__body');
	let headerContainer = document.querySelector('.header__container')

	menuBurger.addEventListener('click', function (event) {
		if (!menuBurger.classList.contains('_active')) {
			openBurger()
		} else {
			closeBurger();
		}
		event.preventDefault();
	})

	function openBurger() {
		menuBurger.classList.add('_active');
		menuBody.classList.add('_active');
		headerContainer.classList.add('_active');
		bodyLock();
	}

	function closeBurger() {
		menuBurger.classList.remove('_active');
		menuBody.classList.remove('_active');
		headerContainer.classList.remove('_active');
		bodyUnlock();
	}

	function bodyLock() {
		const paddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth;
		body.classList.add('_lock');
		body.paddingRight = paddingValue + 'px';
	}

	function bodyUnlock() {
		body.classList.remove('_lock');
		body.paddingRight = '';
	}

	// Main header
	//===================================================================================================





	//===================================================================================================
	document.addEventListener('click', function (event) {
		let el = event.target;
		if (el.classList.contains('sale-page__place')) {
			el.classList.toggle('_active');
		}
		if (el.closest('.cards__checkbox')) {
			el.closest('.cards__checkbox').classList.toggle('_active');
		}
		if (el.closest('.distribute-page__type_always p')) {
			if (window.innerWidth <= 991) {
				if (el.classList.contains('distribute-page__enable')) {
					if (!el.classList.contains('_active')) {
						el.previousElementSibling.classList.remove('_active');
						el.classList.add('_active');
						document.querySelector('.distribute-page__input_enable').classList.add('_active');
						document.querySelector('.distribute-page__input').classList.remove('_active');
					}
				} else {
					if (!el.classList.contains('_active')) {
						el.nextElementSibling.classList.remove('_active');
						el.classList.add('_active');
						document.querySelector('.distribute-page__input_enable').classList.remove('_active');
						document.querySelector('.distribute-page__input').classList.add('_active');
					}
				}
			}
		}
		if (el.closest('.main-page__action')) {
			let firstChild = el.closest('.main-page__actions').firstElementChild;
			let descriptionBlock = document.querySelector('.main-page__description');
			if (firstChild.classList.contains('_active')) {
				firstChild.classList.remove('_active');
				firstChild.nextElementSibling.classList.add('_active');
			} else {
				firstChild.nextElementSibling.classList.remove('_active');
				firstChild.classList.add('_active');
			}
			descriptionBlock.classList.toggle('_active');
			if (descriptionBlock.classList.contains('_active')) {
				descriptionBlock.style.height = descriptionBlock.scrollHeight + 'px';
			} else {
				descriptionBlock.style.height = 0;
			}
		}
		if (el.closest('.addition-data__arrow')) {
			let additionalSublist = document.querySelector('.sublist-addition');
			el.closest('.addition-data__arrow').classList.toggle('_active');
			el.closest('.addition-data__arrow').previousElementSibling.classList.toggle('_hide');
			additionalSublist.classList.toggle('_active');
		}
		if (el.closest('.sublist-addition__action')) {
			if (el.classList.contains('sublist-addition__action_plus')) {
				++el.closest('.sublist-addition__actions').previousElementSibling.value;
			} else {
				if (el.closest('.sublist-addition__actions').previousElementSibling.value > 0) {
					--el.closest('.sublist-addition__actions').previousElementSibling.value;
				}
			}
		}
	})
})
