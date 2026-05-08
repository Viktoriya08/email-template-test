import { VIEWPORT_SIZES } from '@scripts/consts/utils';
import type { ComputedRef, InjectionKey } from 'vue';
import { computed, onBeforeUnmount, onMounted, provide, ref } from 'vue';

export type ViewportNames =
	| 'mobile'
	| 'mobile-xl'
	| 'tablet'
	| 'tablet-xl'
	| 'laptop'
	| 'laptop-xl'
	| 'laptop-xxl'
	| 'container'
	| 'pc';

export type ViewportCheckFunction = ComputedRef<(viewportName: ViewportNames) => boolean>;

export const isViewportKey = Symbol('isViewport') as InjectionKey<ViewportCheckFunction>;
export const viewportUntilKey = Symbol('viewportUntil') as InjectionKey<ViewportCheckFunction>;

export function useViewportHandler() {
	const windowWidth = ref(window.innerWidth);

	const handleResize = () => {
		windowWidth.value = window.screen.width;
	};

	onMounted(() => {
		window.addEventListener('resize', handleResize);
		try {
			window.screen.orientation.addEventListener('change', handleResize);
		}
		catch (e) {
			console.error('Orientation change is not supported');
		}
	});

	onBeforeUnmount(() => {
		window.removeEventListener('resize', handleResize);
		try {
			window.screen.orientation.removeEventListener('change', handleResize);
		}
		catch (e) {
			console.error('Orientation change is not supported');
		}
	});

	const isViewport = computed(() => (viewportName: ViewportNames) => {
		switch (viewportName) {
			case 'mobile':
				return windowWidth.value <= VIEWPORT_SIZES.mobile;
			case 'mobile-xl':
				return (
					windowWidth.value <= VIEWPORT_SIZES['mobile-xl']
					&& windowWidth.value > VIEWPORT_SIZES.mobile
				);
			case 'tablet':
				return (
					windowWidth.value <= VIEWPORT_SIZES.tablet
					&& windowWidth.value > VIEWPORT_SIZES['mobile-xl']
				);
			case 'tablet-xl':
				return (
					windowWidth.value <= VIEWPORT_SIZES['tablet-xl']
					&& windowWidth.value > VIEWPORT_SIZES.tablet
				);
			case 'laptop':
				return (
					windowWidth.value <= VIEWPORT_SIZES.laptop
					&& windowWidth.value > VIEWPORT_SIZES['tablet-xl']
				);
			case 'laptop-xl':
				return (
					windowWidth.value <= VIEWPORT_SIZES['laptop-xl']
					&& windowWidth.value > VIEWPORT_SIZES.laptop
				);
			case 'laptop-xxl':
				return (
					windowWidth.value <= VIEWPORT_SIZES['laptop-xxl']
					&& windowWidth.value > VIEWPORT_SIZES['laptop-xl']
				);
			case 'container':
				return (
					windowWidth.value <= VIEWPORT_SIZES.container
					&& windowWidth.value > VIEWPORT_SIZES['laptop-xxl']
				);
			case 'pc':
				return windowWidth.value > VIEWPORT_SIZES.container;
			default:
				return false;
		}
	});

	const viewportUntil = computed(() => (viewportName: ViewportNames) => {
		switch (viewportName) {
			case 'mobile':
				return windowWidth.value <= VIEWPORT_SIZES.mobile;
			case 'mobile-xl':
				return windowWidth.value <= VIEWPORT_SIZES['mobile-xl'];
			case 'tablet':
				return windowWidth.value <= VIEWPORT_SIZES.tablet;
			case 'tablet-xl':
				return windowWidth.value <= VIEWPORT_SIZES['tablet-xl'];
			case 'laptop':
				return windowWidth.value <= VIEWPORT_SIZES.laptop;
			case 'laptop-xl':
				return windowWidth.value <= VIEWPORT_SIZES['laptop-xl'];
			case 'laptop-xxl':
				return windowWidth.value <= VIEWPORT_SIZES['laptop-xxl'];
			case 'container':
				return windowWidth.value <= VIEWPORT_SIZES.container;
			case 'pc':
				return false;
			default:
				return false;
		}
	});

	provide(isViewportKey, isViewport);
	provide(viewportUntilKey, viewportUntil);

	return { isViewport, viewportUntil };
}
