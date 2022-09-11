'use strict';

import * as main from '../app.js';
import * as cards from './initCards.js';

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


	const dataCountries = document.querySelectorAll('[data-country]');
	let availableCountries = [];
	function createCountryArrow(countriesCollection) {
		if (countriesCollection.length > 0) {
			countriesCollection.forEach(dataCountry => {
				let countriesObj = {};
				let placeForTravel = dataCountry.dataset.country;
				countriesObj.country = placeForTravel.toLowerCase();
				countriesObj.item = dataCountry;
				availableCountries.push(countriesObj);
			})
		}
	}
	createCountryArrow(dataCountries);


	// Options
	//===================================================================================================

	//===================================================================================================

	// All clicks
	//===================================================================================================

	document.addEventListener('click', function (event) {
		let el = event.target;
		if (el.classList.contains('sale-page__place')) {
			if (!el.classList.contains('_active')) {
				document.querySelectorAll('.sale-page__place').forEach(item => {
					item.classList.remove('_active');
				})
				el.classList.add('_active');
				const countryName = el.id.toLowerCase();
				availableCountries.forEach(availableCountry => {
					if (availableCountry.item.classList.contains('_choosed')) {
						availableCountry.item.classList.remove('_choosed');
					}
				})
				availableCountries.forEach(availableCountry => {
					if (countryName == 'all') {
						availableCountry.item.classList.add('_choosed');
					} else if (availableCountry.country.indexOf(countryName) != -1) {
						availableCountry.item.classList.add('_choosed');
					}
				})
				if (!document.querySelector('.cards__item._choosed')) {
					document.querySelector('.cards__nothing').classList.add('_active');
				} else {
					document.querySelector('.cards__nothing').classList.remove('_active');
					main.salePageCards.destroy();
					main.initSwiperOnMobile(true);
				}
			}
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
		if (el.closest('._filter__close')) {
			el.closest('._filter__close').parentElement.remove();
			let optionChooseItems = document.querySelectorAll('.option__item._choose');
			optionChooseItems.forEach(optionChooseItem => {
				if (optionChooseItem.textContent == el.closest('._filter__close').parentElement.textContent) {
					optionChooseItem.classList.remove('_choose');
				}
			})
			if (!document.querySelector('._filter__item')) {
				searchInput.setAttribute('placeholder', searchInputPlaceholder);
			}
			const blockInSearchItems = document.querySelectorAll('._filter__item');
			if (blockInSearchItems.length <= 3 || blockInSearchItems == null) {
				searchInput.classList.remove('_hold');
			}
		}
		if (el.closest('.main-page__button')) {
			const pageSale = document.querySelector('.page__sale');
			const pageSaleCoords = pageSale.getBoundingClientRect();
			console.log(pageSaleCoords.top);
			window.scrollTo({
				top: pageSaleCoords.top + window.pageYOffset,
				behavior: 'smooth',
			});
			event.preventDefault();
		}
		if (el.closest('.option__item._match')) {
			el.classList.add('_choose');
			createFieldFilter(el.closest('.option__item._match'));
			let optionMatchItems = document.querySelectorAll('.option__item._match');
			document.querySelector('.option__item._match').parentElement.classList.remove('_active');
			optionMatchItems.forEach(optionMatchItem => {
				optionMatchItem.classList.remove('_match');
			})
		}
	})

	//===================================================================================================

	// Create a new cards from json file
	//===================================================================================================

	const allSuggestions = document.querySelector('.sale-page__btn');
	async function getCards(button) {
		if (!button.classList.contains('_hold')) {
			button.classList.add('_hold');
			let response = await fetch('json/cards.json');
			if (response.ok) {
				let result = await response.json();
				cards.initCards(result);
				button.classList.remove('_hold');
				button.remove();
				availableCountries = [];
				createCountryArrow(document.querySelectorAll('[data-country]'));
			} else {
				alert('Ошибка при получении данных карточек');
			}
		}
	}

	allSuggestions.addEventListener('click', function (event) {
		const countryInputs = document.querySelectorAll('.sale-page__place');
		const cardsItems = document.querySelectorAll('.cards__item');
		const cardsNothing = document.querySelector('.cards__nothing');
		event.preventDefault();
		countryInputs.forEach(countryInput => {
			if (countryInput.id.toLowerCase() !== 'all') {
				if (countryInput.classList.contains('_active')) {
					countryInput.classList.remove('_active');
				}
			} else {
				if (!countryInput.classList.contains('_active')) {
					countryInput.classList.add('_active');
				}
			}
		})
		cardsItems.forEach(cardsItem => {
			if (!cardsItem.classList.contains('_choosed')) {
				cardsItem.classList.add('_choosed');
			}
		})
		if (cardsNothing.classList.contains('_active')) {
			cardsNothing.classList.remove('_active')
		}
		getCards(event.target);
		main.salePageCards.destroy();
		main.initSwiperOnMobile(true);
	})

	//===================================================================================================

	// Search input
	//===================================================================================================

	const searchForm = document.forms.searchForm;
	const searchInput = searchForm.elements.searchInput;
	let searchInputPlaceholder = searchInput.placeholder;

	let optionsAvailableItems = [];
	const option = document.querySelector('.option');
	async function getOptions() {
		let response = await fetch('json/options.json');
		if (response.ok) {
			let result = await response.json();
			initOptionsBlock(result);
		} else {
			alert('Произошла ошибка при получении optins.json');
		}
	}

	function initOptionsBlock(resultObj) {
		resultObj.options.forEach(item => {
			let optionItem = document.createElement('div');
			optionItem.classList.add('option__item');
			optionItem.textContent = item.name;
			option.append(optionItem);
			let optionItemObject = {};
			optionItemObject.name = item.name;
			optionItemObject.variety = item.variety;
			optionItemObject.item = optionItem;
			optionsAvailableItems.push(optionItemObject);
		})
	}

	getOptions();

	function checkOptionsMatches(optionsAvailableItem, searchInputValue) {
		for (const item of optionsAvailableItem.variety) {
			if (item.slice(0, searchInputValue.length).toLowerCase() === searchInputValue.toLowerCase()) return true;
			continue;
		}
	}

	searchInput.addEventListener('input', function () {
		let searchInputValue = searchInput.value;
		optionsAvailableItems.forEach(optionsAvailableItem => {
			if (checkOptionsMatches(optionsAvailableItem, searchInputValue) && searchInputValue != '') {
				if (!optionsAvailableItem.item.classList.contains('_match') && !optionsAvailableItem.item.classList.contains('_choose')) {
					optionsAvailableItem.item.classList.add('_match');
				}
			} else {
				if (optionsAvailableItem.item.classList.contains('_match')) {
					optionsAvailableItem.item.classList.remove('_match');
				}
			}
		})
		if (document.querySelector('.option__item._match')) {
			option.classList.add('_active');
		} else {
			option.classList.remove('_active');
		}
	})


	function createFieldFilter(item, field = false) {
		const blockInSearch = document.querySelector('._filter__list');
		const blockInSearchItem = document.createElement('div');
		const blockInSearchClose = document.createElement('div');

		blockInSearchItem.classList.add('_filter__item');
		blockInSearchClose.classList.add('_filter__close');
		blockInSearchClose.classList.add('_icon-close');

		if (!field) {
			blockInSearchItem.textContent = item.textContent;
		} else {
			blockInSearchItem.textContent = searchInput.value;
		}
		blockInSearch.append(blockInSearchItem);
		blockInSearchItem.append(blockInSearchClose);
		searchInput.value = '';

		if (document.querySelector('._filter__item')) {
			const blockInSearchItems = document.querySelectorAll('._filter__item');
			if (blockInSearchItems.length > 2) {
				searchInput.classList.add('_hold')
			}
		}
		if (document.contains(blockInSearchItem)) {
			searchInput.removeAttribute('placeholder');
		}
	}

	initBlockInSearchField();
	searchForm.addEventListener('submit', function (event) {
		event.preventDefault();
	})

	function initBlockInSearchField() {
		const blockInSearch = document.createElement('div');
		blockInSearch.classList.add('_filter');
		searchInput.before(blockInSearch);
		const blockInSearchList = document.createElement('div');
		blockInSearchList.classList.add('_filter__list');
		blockInSearch.append(blockInSearchList);
	}

	//===================================================================================================
})
