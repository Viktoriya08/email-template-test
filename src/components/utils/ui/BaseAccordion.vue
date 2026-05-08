<script setup lang="ts">
import { computed, inject, reactive, ref, watch } from 'vue';

import IconSVG from '@components/utils/templates/ui/IconSVG.vue';
import type { ViewportCheckFunction, ViewportNames } from '@scripts/composables/useViewportHandler';
import { viewportUntilKey } from '@scripts/composables/useViewportHandler';
import { VIEWPORT_SIZES } from '@scripts/consts/utils';

export interface BaseAccordionProps {
	disabled?: boolean;
	mediaUntil?: ViewportNames;
	pointerSide?: 'ltl' | 'rtl';
	theme?: 'default' | 'secondary' | 'backdrop';
}

interface AccordionStyles {
	scrollHeight: string;
	transitionDuration: string;
}

const props = withDefaults(defineProps<BaseAccordionProps>(), {
	disabled: false,
	mediaUntil: undefined,
	pointerSide: 'rtl',
	theme: 'default',
});

const accordionDropdown = ref<HTMLElement>();
const accordionShown = ref(props.mediaUntil ? window.innerWidth <= VIEWPORT_SIZES[props.mediaUntil] : false);
const accordionStyles = reactive<AccordionStyles>({
	scrollHeight: '0px',
	transitionDuration: '0.3s',
});

const viewportUntil = inject(viewportUntilKey) as ViewportCheckFunction;
const isViewportUntil = computed(() => props.mediaUntil ? viewportUntil.value(props.mediaUntil) : false);

watch(isViewportUntil, (value) => {
	accordionShown.value = !!value;
});

function clickHandler() {
	if (props.disabled && isViewportUntil.value)
		return;

	if (accordionShown.value && accordionDropdown.value)
		calculateSizes(accordionDropdown.value);

	accordionShown.value = !accordionShown.value;
}

function calculateSizes(el: Element): void {
	accordionStyles.scrollHeight = `${el.scrollHeight}px`;
	accordionStyles.transitionDuration = `${Math.max(0.3, Math.min(1.5, el.scrollHeight / 1000))}s`;
}
</script>

<template>
	<div
		class="accordion"
		:class="[
			{ disabled },
			{ active: accordionShown },
			`accordion--${theme}`,
			`accordion--${pointerSide}`,
		]"
	>
		<div class="accordion__box">

			<div class="accordion__header" @click="clickHandler">
				<p class="accordion__title">
					<slot name="title" />
				</p>
				<button v-if="!isViewportUntil" class="accordion__icon" :disabled="disabled">
					<slot name="icon">
						<IconSVG class="accordion__icon-image" :name="accordionShown ? 'minus' : 'plus'" />
					</slot>
				</button>
			</div>
			<Transition name="accordion" @enter="calculateSizes">
				<div
					v-show="accordionShown"
					ref="accordionDropdown"
					class="accordion__dropdown"
					:style="`--accordion-dropdown-height: ${accordionStyles.scrollHeight}; --accordion-dropdown-transition-duration: ${accordionStyles.transitionDuration}`"
				>
					<div class="accordion__body">
						<slot name="body" />
					</div>
				</div>
			</Transition>
		</div>
	</div>
</template>

<style scoped lang="sass">

</style>
