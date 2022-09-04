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


	const allSuggestions = this.document.querySelector('.sale-page__btn');
	async function getCards(button) {
		if (!button.classList.contains('_hold')) {
			button.classList.add('_hold');
			let response = await fetch('json/cards.json');
			if (response.ok) {
				let result = await response.json();
				initCards(result);
				button.classList.remove('_hold');
				button.remove();
			} else {
				alert('Ошибка при получении данных карточек');
			}
		}
	}

	function initCards(resultArr) {
		const cardsBody = document.querySelector('.cards__body');
		resultArr.cards.forEach(item => {
			const image = item.image;
			const labels = item.labels;
			const id = item.id;
			const title = item.title;
			const country = item.country;
			const dates = item.dates;
			const visa = item.visa;
			const transport = item.transport;
			const hotelStars = item.hotelStars;
			const food = item.food;
			const price = item.price;
			let cardsBlock = ``;
			let imageBlock = ``;
			let mainBlock = ``;

			let cardsBodyStart = `<div class="cards__item swiper-slide">`;
			let cardsBodyEnd = `</div>`;

			let cardsImageStart = `<div class="cards__image _ibg">`;
			let cardsImageEnd = `</div>`;

			let cardsImg = `<img src="img/cards/${image}" alt="Пейзаж" class="cards__img">`;

			let cardsLabels = ``;
			if (labels) {
				let cardsAllLabel = ``;
				let cardsLabelsStart = `<div class="cards__labels">`;
				let cardsLabelsEnd = `</div>`;
				labels.forEach(cardsLabel => {
					cardsAllLabel += `<label class="cards__label cards__label_${cardsLabel.type}">${cardsLabel.text}</label>`;
				})
				cardsLabels += cardsLabelsStart;
				cardsLabels += cardsAllLabel;
				cardsLabels += cardsLabelsEnd;
			}

			imageBlock += cardsImageStart;
			imageBlock += cardsImg;
			imageBlock += cardsLabels;
			imageBlock += cardsImageEnd;


			let cardsMainStart = `<div class="cards__main">`;
			let cardsMainEnd = `</div>`;
			let cardsId = `<div class="cards__id">id: ${id}</div>`;

			let cardsTitle = `<a href="#" class="cards__title">${title}</a>`;

			let cardsCountry = `<div class="cards__country">${country}</div>`;

			let cardsDates = `<div class="cards__dates _icon-calendar">${dates}</div>`;

			let cardsAbout = ``;

			let cardsAboutStart = `<div class="cards__about">`;
			let cardsAboutEnd = `</div>`;
			let cardsAboutVisa = `<div class="cards__service _icon-www">${visa}</div>`;
			let cardsAboutTransport = `<div class="cards__service _icon-${transport.type}">${transport.text}</div>`;
			let cardsHotelStars = ``;
			let cardsHotelStart = `
				<div class="cards__service">
					<p>Питание</p>`;
			let cardsHotelEnd = `</div>`;
			let cardsHotelStarsStart = `<div class="cards__stars">`;
			let cardsHotelStarsEnd = `</div>`;
			cardsHotelStars += cardsHotelStart;
			cardsHotelStars += cardsHotelStarsStart;
			if (hotelStars) {
				for (let i = 0; i < hotelStars; i++) {
					cardsHotelStars += `<div class="cards__star _active _icon-starFull"></div>`;
				}
				if (hotelStars != 5) {
					for (let j = 0; j < 5 - hotelStars; j++) {
						cardsHotelStars += `<div class="cards__star _active _icon-starBorder"></div>`;
					}
				}
			}
			cardsHotelStars += cardsHotelStarsEnd;
			cardsHotelStars += cardsHotelEnd;
			let cardsAboutFood = `
			<div class="cards__service">
				<p>Питание</p>
				<div class="cards__additionally">${food}</div>
			</div>`;


			cardsAbout += cardsAboutStart;
			cardsAbout += cardsAboutVisa;
			cardsAbout += cardsAboutTransport;
			cardsAbout += cardsHotelStars;
			cardsAbout += cardsAboutFood;
			cardsAbout += cardsAboutEnd;

			let cardsPrice = ``;
			let cardsPriceStart = `<div class="cards__price">`;
			let cardsPriceEnd = `</div>`;

			cardsPrice += cardsPriceStart;
			cardsPrice += `<div class="cards__rubs"><span>${price.rub}</span> ₽ / на персону</div>`;
			cardsPrice += `<div class="cards__euro">${price.euro} €</div>`;
			cardsPrice += cardsPriceEnd;

			let cardsCheckbox = `
			<div class="cards__checkbox">
				<input type="radio">
				<div class="cards__compare">Добавить для сравнения</div>
			</div>`;


			mainBlock += cardsMainStart;
			mainBlock += cardsId;
			mainBlock += cardsTitle;
			mainBlock += cardsCountry;
			mainBlock += cardsDates;
			mainBlock += cardsAbout;
			mainBlock += cardsPrice;
			mainBlock += cardsCheckbox;
			mainBlock += cardsMainEnd;

			cardsBlock += cardsBodyStart;
			cardsBlock += imageBlock;
			cardsBlock += mainBlock;
			cardsBlock += cardsBodyEnd;

			cardsBody.insertAdjacentHTML('beforeend', cardsBlock);
		});
	}

	allSuggestions.addEventListener('click', function (event) {
		event.preventDefault();
		getCards(event.target);
	})
})
