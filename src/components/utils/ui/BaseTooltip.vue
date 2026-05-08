<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import type { Instance } from '@popperjs/core';
import { createPopper } from '@popperjs/core';

export interface BaseTooltipProps {
	placement?: 'top' | 'bottom' | 'left' | 'right';
	offset?: [number, number];
	flip?: boolean;
	showOnClick?: boolean;
}

const props = withDefaults(defineProps<BaseTooltipProps>(), {
	placement: 'top',
	offset: () => [0, 12],
	flip: true,
	showOnClick: false,
});

const popperWillHide = ref(false);
const popperHideTimeout = ref<number | null>(null);
const popperShown = ref(false);
const popper = ref<Instance>();
const trigger = ref<HTMLElement>();
const tooltip = ref<HTMLElement>();

const popperEvents = computed(() => ({
	mouseleave: startHidingPopover,
	...(props.showOnClick ? { click: showPopper } : { mouseenter: showPopper }),
}));

onMounted(() => {
	initPopper();
});

function initPopper() {
	if (!trigger.value || !tooltip.value)
		return;

	popper.value = createPopper(
		trigger.value,
		tooltip.value,
		{
			placement: props.placement,
			modifiers: [
				{
					name: 'preventOverflow',
					options: {
						padding: 8,
					},
				},
				{
					name: 'offset',
					options: {
						offset: props.offset,
					},
				},
				{
					name: 'flip',
					enabled: props.flip,
					options: {
						padding: 8,
					},
				},
			],
		},
	);
}

function showPopper() {
	if (popperShown.value) {
		popperWillHide.value = false;
		return;
	}

	popperShown.value = true;

	popper.value?.setOptions(options => ({
		...options,
		modifiers: [
			...(options.modifiers as unknown[]),
			{
				name: 'eventListeners',
				enabled: true,
			},
		],
	}));

	popper.value?.update();
}

function startHidingPopover() {
	popperWillHide.value = true;

	if (popperHideTimeout.value)
		clearTimeout(popperHideTimeout.value);

	popperHideTimeout.value = setTimeout(() => {
		if (popperWillHide.value)
			hidePopper();
	}, 10);
}

function hidePopper() {
	popperWillHide.value = false;
	popperShown.value = false;

	popper.value?.setOptions(options => ({
		...options,
		modifiers: [
			...(options.modifiers as unknown[]),
			{
				name: 'eventListeners',
				enabled: true,
			},
		],
	}));

	popper.value?.update();
}
</script>

<template>
	<div
		v-click-outside="hidePopper"
		class="tooltip"
		v-on="popperEvents"
	>
		<div ref="trigger" class="tooltip__trigger" aria-describedby="tooltip">
			<slot />
		</div>
		<div v-show="popperShown" ref="tooltip" class="tooltip__content" role="tooltip">
			<div class="tooltip__arrow" data-popper-arrow />
			<slot name="tooltip" />
		</div>
	</div>
</template>

<style scoped lang="sass">
.tooltip
	&__content
		z-index: var(--z-index-dropdown)
		max-width: 280px
		padding: fluid(10,16) fluid(16,24)
		border-radius: var(--radius-s)
		background: var(--color-neutral-100)
		font-size: var(--font-size-text-m)
		line-height: var(--line-height-text)
		filter: drop-shadow(0px 0px 15px rgba(183, 184, 200, 0.5))

		&[data-popper-placement^='top'] > .tooltip__arrow
			bottom: -8px

		&[data-popper-placement^='bottom'] > .tooltip__arrow
			top: -8px

		&[data-popper-placement^='left'] > .tooltip__arrow
			right: -8px

		&[data-popper-placement^='right'] > .tooltip__arrow
			left: -8px

	&__arrow
		position: absolute
		visibility: hidden
		size: 24px
		background: inherit

		&::before
			content: ''
			position: absolute
			visibility: visible
			size: 24px
			background: inherit
			transform: rotate(45deg)
</style>
