import { vMaska } from 'maska';
import type { App } from 'vue';
import clickOutside from '@scripts/directives/clickOutside';
import animate from '@scripts/directives/animate';
import sizeObserve from '@scripts/directives/sizeObserve';
import scrollElementFixed from '@scripts/directives/scrollElementFixed';

export default function useDirectives(AppInstance: App) {
	AppInstance.directive('mask', vMaska)
		.directive('click-outside', clickOutside)
		.directive('animate', animate)
		.directive('scroll-element-fixed', scrollElementFixed)
		.directive('size-observe', sizeObserve);
	// .directive('ym-goal', ymGoal);
	return AppInstance;
}
