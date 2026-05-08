<!--TODO: надо, чтобы можно было проставлять активность и делать аккордион открытым по умолчанию-->
<script setup lang="ts">
import { computed, inject, reactive, ref, watch } from 'vue';

import IconSVG from '@components/utils/templates/ui/IconSVG.vue';
import type { ViewportCheckFunction, ViewportNames } from '@scripts/composables/useViewportHandler';
import { viewportUntilKey } from '@scripts/composables/useViewportHandler';
import { VIEWPORT_SIZES } from '@scripts/consts/utils';

export interface BrandAccordionProps {
	mediaUntil?: ViewportNames;
}

interface AccordionStyles {
	scrollHeight: string;
	transitionDuration: string;
}

const props = withDefaults(defineProps<BrandAccordionProps>(), {
	mediaUntil: undefined,
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
	if (isViewportUntil.value)
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
		class="brand-accordion"
		:class="[
			{ active: accordionShown },
		]"
	>
		<button class="brand-accordion__header" @click.prevent="clickHandler">
			<slot name="title" />
			<span v-if="!isViewportUntil" class="brand-accordion__icon">
				<IconSVG class="brand-accordion__icon-image" :name="'arrow-md-down'" />
			</span>
		</button>
		<Transition name="accordion" @enter="calculateSizes">
			<div
				v-show="accordionShown"
				ref="accordionDropdown"
				class="brand-accordion__dropdown"
				:style="`--accordion-dropdown-height: ${accordionStyles.scrollHeight}; --accordion-dropdown-transition-duration: ${accordionStyles.transitionDuration}`"
			>
				<slot name="body" />
			</div>
		</Transition>
	</div>
</template>

<style scoped lang="sass">

</style>
