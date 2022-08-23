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

	let dataSpollers = document.querySelectorAll('[data-spoller]');

	if (dataSpollers.length > 0) {
		dataSpollers.forEach(dataSpoller => {
			dataSpoller.addEventListener('click', function (event) {
				let el = event.target;
				let spollerBlock = document.querySelector(`${el.dataset.spoller}`);
				spollerBlock.classList.toggle('_active');
				if (spollerBlock.classList.contains('_active')) {
					spollerBlock.style.height = spollerBlock.scrollHeight + 'px';
					dataSpoller.closest('div').classList.add('_active');
				} else {
					spollerBlock.style.height = 0;
					dataSpoller.closest('div').classList.remove('_active');
				}
				event.preventDefault();
			})
		})
	}



	const rangeDescriptorArrows = document.querySelectorAll('.range-descriptor__arrow');
	const spllerLink = document.querySelector('.descriptor-main__showhide');

	if (rangeDescriptorArrows.length > 0) {
		rangeDescriptorArrows.forEach(rangeDescriptorArrow => {
			rangeDescriptorArrow.addEventListener('click', function (event) {
				let rangeBlock = document.querySelector(`.${rangeDescriptorArrow.id}`);
				rangeDescriptorArrow.classList.toggle('_active');
				if (rangeDescriptorArrow.classList.contains('_active')) {
					rangeBlock.classList.add('_active');
					if (rangeDescriptorArrow.id == 'sub-range') {
						spllerLink.classList.add('_margin');
					}
				} else {
					rangeBlock.classList.remove('_active');
					if (rangeDescriptorArrow.id == 'sub-range') {
						spllerLink.classList.remove('_margin');
					}
				}
			})
		})
	}


	const arrowCounters = document.querySelectorAll('.sub-range__action');
	const inputCounter = document.querySelector('.range-descriptor__input_persons .range-descriptor__field');

	if (arrowCounters.length > 0) {
		let result = 0;
		arrowCounters.forEach(arrowCounter => {
			arrowCounter.addEventListener('pointerdown', function (event) {
				let fieldCounter = event.target.parentElement.querySelector('input');
				if (event.target.classList.contains('sub-range__action_plus')) {
					++fieldCounter.value;
					inputCounter.value = `Количество персон: ${++result}`;
				} else {
					if (fieldCounter.value > 0) {
						--fieldCounter.value;
						inputCounter.value = `Количество персон: ${--result}`;
					}
				}
				event.preventDefault();
			})
		})
	}



	const rangeInputs = document.querySelectorAll('.slider-descriptor__inputs input');
	const progress = document.querySelector('.slider-descriptor__progress');
	let rangeGap = 1;

	if (rangeInputs.length > 0) {
		rangeInputs.forEach(rangeInput => {
			rangeInput.addEventListener('input', function (event) {
				let daysMin = parseInt(rangeInputs[0].value);
				let daysMax = parseInt(rangeInputs[1].value);
				let spanMinElement = document.querySelector('.slider-descriptor__prop_min span');
				let spanMaxElement = document.querySelector('.slider-descriptor__prop_max span');
				if (daysMax - daysMin <= rangeGap) {
					if (event.target.closest('.slider-descriptor__inputs_min')) {
						rangeInputs[0].value = daysMax - rangeGap;
					} else {
						rangeInputs[1].value = daysMin + rangeGap;
					}
				} else {
					spanMinElement.textContent = `${daysMin}`;
					spanMaxElement.textContent = `${daysMax}`;
					progress.style.left = (daysMin - rangeInputs[0].min) / (rangeInputs[0].max - rangeInputs[0].min) * 100 + '%';
					progress.style.right = 100 - (daysMax - rangeInputs[1].min) / (rangeInputs[1].max - rangeInputs[1].min) * 100 + '%';
				}
			})
		})
	}




	const formMainHeader = document.forms['main-header'];

	formMainHeader.addEventListener('submit', function (event) {
		createElement(formMainHeader.elements.searchField)
		event.preventDefault();
	})

	function createElement(before) {
		let div = document.createElement('div');
		let innerDiv = document.createElement('div');
		let close = document.createElement('div');
		div.className = '_div';
		innerDiv.className = '_inner-div';
		close.className = '_close';
		div.textContent = before.value;
		before.before(div);
		div.append(innerDiv);
		innerDiv.append(close);
		before.value = '';
		before.placeholder = '';
		close.addEventListener('click', function () {
			div.remove();
			if (!document.querySelector('._div')) {
				before.placeholder = 'Страна, город, регион, отель';
			}
		})
	}

	document.addEventListener('click', function (event) {
		let el = event.target;
		if (el.classList.contains('sale-page__place')) {
			el.classList.toggle('_active');
		}
		if (el.closest('.cards__checkbox input')) {
			el.classList.toggle('_active');
		}
	})
})

