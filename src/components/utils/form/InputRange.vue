<script setup lang="ts">
import { customRef, ref } from 'vue';

import type { MaskType } from '@scripts/consts/masks';
import type { ErrorObject } from '@vuelidate/core';
import InputTemplate from '@components/utils/templates/form/InputTemplate.vue';
import Slider from '@vueform/slider';
import { useMask } from '@scripts/composables/useMask';

interface FormatTooltipsObject {
	prefix?: string;
	suffix?: string;
	decimals?: number;
	thousands?: string;
}

export interface InputRangeProps {
	min?: number;
	max?: number;
	step?: number;
	tooltips?: boolean;
	tooltipMerge?: number;
	tooltipFormat?: ((value: number) => string | number) | FormatTooltipsObject;
	tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
	id?: string;
	label?: string;
	readOnly?: boolean;
	disabled?: boolean;
	required?: boolean;
	title?: string;
	name?: string;
	leftPrefix?: string;
	rightPrefix?: string;
	suffix?: string;
	maskType?: Extract<MaskType, 'priceMask' | 'integerMask' | 'decimalMask'>;
	errors?: string[] | ErrorObject[];
}

const props = withDefaults(defineProps<InputRangeProps>(), {
	min: 0,
	max: 100,
	step: 1,
	tooltips: false,
	tooltipMerge: -1,
	tooltipFormat: undefined,
	tooltipPosition: 'bottom',
	id: '',
	label: '',
	readOnly: false,
	disabled: false,
	required: false,
	title: '',
	name: '',
	leftPrefix: 'from',
	rightPrefix: 'to',
	suffix: '',
	maskType: 'integerMask',
	errors: () => [],
});

const { getMask } = useMask();
const innerValue = ref<number | [number, number]>(0);
const modelValue = defineModel < number | [number, number]>({
	get(v) {
		return v ?? innerValue.value;
	},
	set(v) {
		innerValue.value = v;
		return v;
	},
});
const minValue = valueConstructor('min');
const maxValue = valueConstructor('max');

function valueConstructor(position: 'min' | 'max' = 'min') {
	let timeout: number;
	return customRef<number | string>((track, trigger) => {
		return {
			get() {
				track();
				if (position === 'min')
					return (Array.isArray(modelValue.value) ? modelValue.value[0] : modelValue.value) as number;
				else
					return (Array.isArray(modelValue.value) ? modelValue.value[1] : modelValue.value) as number;
			},
			set(rawValue: string | number) {
				clearTimeout(timeout);
				timeout = setTimeout(() => {
					let value: number;
					if (typeof rawValue === 'string') {
						value = Number.parseFloat(rawValue);
						if (Number.isNaN(value))
							value = 0;
					}
					else {
						value = rawValue;
					}

					if (value > props.max)
						value = props.max;

					if (value < props.min)
						value = props.min;

					if (Array.isArray(modelValue.value)) {
						if (position === 'min')
							modelValue.value = [value, modelValue.value[1]];
						else
							modelValue.value = [modelValue.value[0], value];
					}
					else { modelValue.value = value; }

					trigger();
				}, 300);
			},
		};
	});
}
</script>

<template>
	<InputTemplate :id="id" :label="label" tag="span" :errors="errors">
		<template v-if="$slots.label" #label="{ labelValue }">
			<slot name="label" :label-value="labelValue" />
		</template>

		<div
			class="input-range"
			:title="title"
			:class="[{ error: errors.length }, { disabled }, { readonly: readOnly }]"
		>
			<div class="input-range__wrapper">
				<template v-if="Array.isArray(modelValue)">
					<label class="input-range__input-wrapper">
						<span v-if="leftPrefix" class="input-range__prefix">{{ leftPrefix }}</span>
						<input
							:id="`${id}-1`"
							v-model="minValue"
							v-mask:[getMask(maskType)]
							:disabled="disabled"
							:readonly="readOnly"
							:required="required"
							inputmode="numeric"
							:name="name"
							type="text"
							class="input-range__input input-range__input--left"
						>
					</label>
					<label class="input-range__input-wrapper">
						<span v-if="rightPrefix" class="input-range__prefix">{{ rightPrefix }}</span>
						<input
							:id="`${id}-2`"
							v-model="maxValue"
							v-mask:[getMask(maskType)]
							:disabled="disabled"
							:readonly="readOnly"
							:required="required"
							inputmode="numeric"
							:name="name"
							type="text"
							class="input-range__input input-range__input--right"
						>
						<span v-if="suffix" class="input-range__suffix">{{ suffix }}</span>
					</label>
				</template>
				<label v-else class="input-range__input-wrapper">
					<span v-if="leftPrefix" class="input-range__prefix">{{ leftPrefix }}</span>
					<input
						:id="id"
						v-model="maxValue"
						v-mask:[getMask(maskType)]
						:disabled="disabled"
						:readonly="readOnly"
						:required="required"
						inputmode="numeric"
						:name="name"
						type="text"
						class="input-range__input input-range__input--single"
					>
					<span v-if="suffix" class="input-range__suffix">{{ suffix }}</span>
				</label>
			</div>
			<Slider
				v-model="modelValue"
				:min="min"
				:max="max"
				:tooltips="disabled ? false : tooltips"
				:step="step"
				:format="tooltipFormat"
				:merge="tooltipMerge"
				:tooltip-position="tooltipPosition"
				:disabled="disabled || readOnly"
				class="input-range__slider"
			/>
		</div>

		<template v-if="$slots.action" #action>
			<slot name="action" />
		</template>
	</InputTemplate>
</template>

<style lang="sass">
@import '@vueform/slider/themes/default.css'

.input-range
	position: relative
	flex: 1 1 auto
	display: flex
	flex-direction: column
	gap: 20px

	&:focus-within
		& .input-range
			&__wrapper
				border-color: var(--di-border-color-active)

	@include hover
		& .input-range
			&__wrapper
				border-color: var(--di-border-color-hover)

	&.disabled
		& .input-range
			&__wrapper
				border-color: var(--di-border-color-disabled)
				background-color: var(--di-bg-disabled)
				color: var(--di-color-disabled)
				cursor: not-allowed

			&__suffix,
			&__prefix
				color: var(--di-color-disabled)

			&__slider
				--slider-handle-border: 6px solid var(--di-border-color-disabled)

	&.readonly:not(.disabled)
		& .input-range
			&__wrapper
				cursor: help

			&__slider
				--slider-handle-border: 6px solid var(--di-border-color-disabled)
				--slider-connect-bg-disabled: var(--color-primary-500)

	&.error
		& .input-range
			&__wrapper
				border-color: var(--di-border-color-error)
				color: var(--di-color-error)

			&__suffix,
			&__prefix
				color: var(--di-color-error)

	&__wrapper
		display: flex
		align-items: center
		justify-content: stretch
		gap: fluid(8,12)

		width: 100%

	&__input-wrapper
		display: flex
		flex: 1 1 auto
		align-items: center
		justify-content: flex-start
		gap: calc(var(--di-px) / 2)
		padding: var(--di-py) var(--di-px)
		cursor: inherit

		min-height: calc(2 * var(--di-border-width) + var(--di-font-size) * var(--di-line-height) + 2 * var(--di-py))

		border-width: var(--di-border-width)
		border-style: solid
		border-radius: var(--di-border-radius)
		border-color: var(--di-border-color)

		background-color: var(--di-bg)

		color: var(--di-color)

		font-size: var(--di-font-size)
		line-height: var(--di-line-height)

		transition: border-color .3s ease, background-color .3s ease

	&__input
		flex: 1 1 75%

		width: 100%
		min-width: 30px
		max-width: 100%
		margin: 0
		padding: 0

		overflow: hidden

		border: none
		border-radius: 0

		background-color: transparent

		text-align: left
		text-overflow: ellipsis
		white-space: nowrap

		cursor: inherit
		outline: none

		&--single
			max-width: 125px

	&__prefix
		flex: 1 0 25%

		max-width: max-content

		overflow: hidden

		color: currentColor

		font-size: var(--di-font-size)
		line-height: var(--di-line-height)

		text-overflow: ellipsis
		white-space: nowrap

	&__suffix
		flex-shrink: 0
		color: var(--di-border-color)
		font-size: var(--di-font-size)
		line-height: var(--di-line-height)
		white-space: nowrap

	&__slider
		--slider-bg: var(--color-neutral-200)
		--slider-connect-bg: var(--color-primary-600)
		--slider-connect-bg-disabled: var(--di-border-color-disabled)
		--slider-height: 2px
		--slider-vertical-height: 300px
		--slider-radius: var(--radius-xl)
		--slider-handle-bg: var(--color-neutral-100)
		--slider-handle-border: 6px solid var(--color-primary-600)
		--slider-handle-width: 20px
		--slider-handle-height: 20px
		--slider-handle-radius: 50%
		--slider-handle-shadow: none
		--slider-handle-shadow-active: none
		--slider-handle-ring-width: 0
		--slider-handle-ring-color: transparent
		--slider-tooltip-font-size: var(--font-size-text-s)
		--slider-tooltip-line-height: var(--line-height-s)
		--slider-tooltip-font-weight: 700
		--slider-tooltip-min-width: 20px
		--slider-tooltip-bg: var(--color-primary-500)
		--slider-tooltip-bg-disabled: var(--di-border-color-disabled)
		--slider-tooltip-color: var(--color-neutral-100)
		--slider-tooltip-radius: var(--radius-m)
		--slider-tooltip-py: 2px
		--slider-tooltip-px: 6px
		--slider-tooltip-arrow-size: 6px
		--slider-tooltip-distance: 2px

		margin-left: calc(var(--slider-handle-width) / 2)
		margin-right: calc(var(--slider-handle-width) / 2)
</style>
