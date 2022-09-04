const inputThumbLeft = document.querySelector('.range-slider__input_left');
const inputThumbRight = document.querySelector('.range-slider__input_right');
const thumbLeft = document.querySelector('.range-slider__thumb_left');
const thumbRight = document.querySelector('.range-slider__thumb_right');
const range = document.querySelector('.range-slider__range');


function setLeftThumbValue() {
	const inputMin = parseInt(inputThumbLeft.min);
	const inputMax = parseInt(inputThumbLeft.max);
	const daysFrom = document.querySelector('.range-slider__days_from span'); // Для проекта

	inputThumbLeft.value = Math.min(parseInt(inputThumbLeft.value), parseInt(inputThumbRight.value) - 1);
	let percent = ((inputThumbLeft.value - inputMin) / (inputMax - inputMin)) * 100;

	range.style.left = percent + '%';
	thumbLeft.style.left = percent + '%';

	daysFrom.textContent = inputThumbLeft.value; // Для проекта
}

function setRightThumbValue() {
	const inputMin = parseInt(inputThumbRight.min);
	const inputMax = parseInt(inputThumbRight.max);
	const daysTo = document.querySelector('.range-slider__days_to span'); // Для проекта

	inputThumbRight.value = Math.max(parseInt(inputThumbRight.value), parseInt(inputThumbLeft.value) + 1);
	let percent = ((inputThumbRight.value - inputMin) / (inputMax - inputMin)) * 100;

	range.style.right = (100 - percent) + '%';
	thumbRight.style.right = (100 - percent) + '%';

	daysTo.textContent = inputThumbRight.value; // Для проекта
}

inputThumbLeft.addEventListener('input', setLeftThumbValue);
inputThumbRight.addEventListener('input', setRightThumbValue);