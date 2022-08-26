import * as flsFunctions from './modules/functions.js';
import * as script from './modules/script.js';
import Swiper, { Navigation, Pagination } from 'swiper';


flsFunctions.isWebp();
flsFunctions.ibg();


let init = false;
let salePageCards;
function initSwiperOnMobile() {
	if (window.innerWidth <= 768) {
		if (!init) {
			init = true;
			salePageCards = new Swiper('.sale-page__cards', {
				navigation: {
					// nextEl: '.swiper-button-next',
					// prevEl: '.swiper-button-prev'
				},
				pagination: {
					el: '.sale-page__pagination',
					clickable: true,
					type: 'fraction',
				},
				slidesPerView: 1.08,
				spaceBetween: 16,
				watchOverflow: true,
				loop: true,
				modules: [Navigation, Pagination],
			});
		}
	} else if (init) {
		salePageCards.destroy();
		init = false;
	}
}
initSwiperOnMobile();
window.addEventListener('resize', () => {
	initSwiperOnMobile();
});

