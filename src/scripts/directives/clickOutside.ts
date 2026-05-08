import type { Directive } from 'vue';

interface ClickOutsideHTMLElement extends HTMLElement {
	_clickOutside?: (event: MouseEvent) => void;
}

/**
 * @description
 * Директива для обработки клика вне элемента
 * @example
 * <div v-click-outside="onClickOutside"></div>
 * @param {HTMLElement} el
 * @param {object} binding
 * @param {Function} binding.value
 */
const clickOutside: Directive<ClickOutsideHTMLElement> = {
	mounted: (el, binding) => {
		const element = el;

		const onClick = (event: MouseEvent) => {
			if (!element.contains(event.target as Node) && typeof binding.value === 'function')
				binding.value(event);
		};

		element._clickOutside = onClick;

		setTimeout(() => {
			if (element._clickOutside)
				document.addEventListener('click', element._clickOutside, false);
		}, 500);
	},
	unmounted: (el) => {
		const element = el;
		if (!element._clickOutside)
			return;
		document.removeEventListener('click', element._clickOutside, false);
		delete element._clickOutside;
	},
};

export default clickOutside;
