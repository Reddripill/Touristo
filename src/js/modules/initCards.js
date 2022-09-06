function initCards(resultArr) {
	const cardsBody = document.querySelector('.cards__body');
	resultArr.cards.forEach(item => {
		const image = item.image;
		const labels = item.labels;
		const id = item.id;
		const title = item.title;
		const country = item.country;
		const dataCountry = item.dataCountry;
		const dates = item.dates;
		const visa = item.visa;
		const transport = item.transport;
		const hotelStars = item.hotelStars;
		const food = item.food;
		const price = item.price;
		let cardsBlock = ``;
		let imageBlock = ``;
		let mainBlock = ``;
		let cardsBodyStart = `<div data-country="${dataCountry}" class="cards__item swiper-slide">`;
		let activeInputPlaces = document.querySelector('.sale-page__place._active');
		if (activeInputPlaces.id.toLowerCase() == dataCountry.toLowerCase() || activeInputPlaces.id.toLowerCase() == 'all') {
			cardsBodyStart = `<div data-country="${dataCountry}" class="cards__item swiper-slide _choosed">`
		}
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



export { initCards };