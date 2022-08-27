import * as flsFunctions from './modules/functions.js';
import * as script from './modules/script.js';
import Swiper, { Navigation, Pagination } from 'swiper';


flsFunctions.isWebp();
flsFunctions.ibg();


let initPhone = false;
let salePageCards;
function initSwiperOnMobile() {
	if (window.innerWidth <= 768) {
		if (!initPhone) {
			initPhone = true;
			salePageCards = new Swiper('.sale-page__cards', {
				navigation: {
					// nextEl: '.swiper-button-next',
					// prevEl: '.swiper-button-prev'
				},
				pagination: {
					el: '.sale-page__pagination',
					type: 'fraction',
				},
				slidesPerView: 1.08,
				spaceBetween: 16,
				watchOverflow: true,
				loop: true,
				modules: [Navigation, Pagination],
			});
		}
	} else if (initPhone) {
		salePageCards.destroy();
		initPhone = false;
	}
}
let initBigDevice;
function initSwiperOnBigDevice() {
	if (window.innerWidth <= 1170) {
		if (!initBigDevice) {
			initBigDevice = true;
			salePageCards = new Swiper('.suggestions-page__body', {
				pagination: {
					el: '.suggestions-page__pagination',
				},
				slidesPerView: 1.13,
				spaceBetween: 16,
				watchOverflow: true,
				loop: true,
				modules: [Navigation, Pagination],
			});
		}
	} else if (initBigDevice) {
		salePageCards.destroy();
		initBigDevice = false;
	}
}
initSwiperOnMobile();
initSwiperOnBigDevice();
window.addEventListener('resize', () => {
	initSwiperOnMobile();
	initSwiperOnBigDevice();
});

