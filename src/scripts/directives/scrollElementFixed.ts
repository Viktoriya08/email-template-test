import type { Directive } from 'vue';

interface ScrollHandlerHTMLElement extends HTMLElement {
	_scrollHandler?: () => void;
}

const scrollElementFixed: Directive<ScrollHandlerHTMLElement> = {
	mounted(el) {
		const offset = el.offsetTop;

		const scrollHandler = () => {
			if (window.scrollY > offset)
				el.classList.add('fixed');

			else
				el.classList.remove('fixed');
		};

		document.addEventListener('scroll', scrollHandler);

		el._scrollHandler = scrollHandler;
	},
	unmounted(el) {
		if (el._scrollHandler) {
			document.removeEventListener('scroll', el._scrollHandler);
			delete el._scrollHandler;
		}
	},
};

export default scrollElementFixed;
