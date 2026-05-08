import ResizeController from '@scripts/utils/resizeController';

function calcHeaderHeight() {
	const doc = document.documentElement;
	const header = document.querySelector('.header') as HTMLElement;

	if (header)
		doc.style.setProperty('--header-height', `${header.offsetHeight}px`);
}

export default function calcAppProperties() {
	ResizeController.add('header', calcHeaderHeight);
	calcHeaderHeight();
}
