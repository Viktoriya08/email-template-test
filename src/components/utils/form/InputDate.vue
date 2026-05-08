<script setup lang="ts">
import { DatePicker } from 'v-calendar';
import type { ErrorObject } from '@vuelidate/core';
import InputTemplate from '@components/utils/templates/form/InputTemplate.vue';
import type { DatePickerDate } from 'v-calendar/dist/types/src/use/datePicker';
import { computed, ref } from 'vue';

export interface InputDateProps {
	id?: string;
	dateMask?: string;
	label?: string;
	placeholder?: string;
	readOnly?: boolean;
	disabled?: boolean;
	required?: boolean;
	maxDate?: Date;
	minDate?: Date;
	title?: string;
	errors?: string[] | ErrorObject[];
}

const props = withDefaults(defineProps<InputDateProps>(), {
	id: '',
	dateMask: 'DD.MM.YYYY',
	label: '',
	placeholder: '',
	readOnly: false,
	disabled: false,
	required: false,
	maxDate: undefined,
	minDate: undefined,
	title: '',
	errors: () => [],
});

const innerValue = ref<DatePickerDate>(null);
const modelValue = defineModel<DatePickerDate>({
	get(v) {
		return v ?? innerValue.value;
	},
	set(value: DatePickerDate) {
		innerValue.value = value;
		return value;
	},
});

const getInputMask = computed(() => props.dateMask.replaceAll(/\w/gi, '#'));
</script>

<template>
	<InputTemplate :id="id" :label="label" :errors="errors">
		<template v-if="$slots.label" #label="{ labelValue }">
			<slot name="label" :label-value="labelValue" />
		</template>

		<DatePicker
			v-model="modelValue"
			:max-date="maxDate"
			:min-date="minDate"
			:masks="{ input: dateMask }"
		>
			<template #default="{ inputValue, inputEvents }">
				<div class="input-date" :class="[{ error: errors.length }, { disabled }]">
					<input
						:id="id"
						v-mask
						:data-maska="getInputMask"
						:value="inputValue"
						:placeholder="placeholder"
						:disabled="disabled"
						:readonly="readOnly"
						:required="required"
						:title="title"
						type="text"
						class="input-date__input"
						v-on="(!readOnly && !disabled && inputEvents) || {}"
					>
					<span aria-hidden="true" class="input-date__icon">
						<span class="input-date__icon-image" />
					</span>
				</div>
			</template>
		</DatePicker>

		<template v-if="$slots.action" #action>
			<slot name="action" />
		</template>
	</InputTemplate>
</template>

<style lang="sass">
@import 'v-calendar/dist/style.css'

.input-date
	--calendar-icon-size: var(--di-icon-size)

	position: relative

	&:focus-within
		& .input-date
			&__icon
				color: var(--di-border-color-active)

	@include hover
		& .input-date
			&__icon
				color: var(--di-border-color-hover)

	&.disabled
		& .input-date
			&__icon
				color: var(--di-border-color-disabled)

	&.error
		& .input-date
			&__input
				border-color: transparent transparent var(--di-border-color-error)

				&::placeholder
					color: var(--di-color-error)

			&__icon
				color: var(--di-border-color-error)

	&__input
		flex: 1 1 auto

		width: 100%
		min-height: calc(2 * var(--di-border-width) + var(--di-font-size) * var(--di-line-height) + 2 * var(--di-py))
		padding: var(--di-py) calc(var(--di-px) + var(--calendar-icon-size) + var(--di-px) / 2) var(--di-py) var(--di-px)

		overflow: hidden

		border-width: var(--di-border-width)
		border-style: solid
		border-radius: var(--di-border-radius)
		border-color: var(--di-border-color)

		background-color: var(--di-bg)

		color: var(--di-color)

		font-size: var(--di-font-size)
		line-height: var(--di-line-height)

		text-overflow: ellipsis
		white-space: nowrap

		transition: border-color .3s ease, background-color .3s ease

		&:focus
			border-color: var(--di-border-color-active)

		@include hover
			border-color: var(--di-border-color-hover)

		&:focus-visible
			outline: none
			border-color: var(--di-border-color-hover)

		&:disabled
			border-color: var(--di-border-color-disabled)
			background-color: var(--di-bg-disabled)
			color: var(--di-color-disabled)
			cursor: not-allowed

			&::placeholder
				color: var(--di-color-disabled)

		&::placeholder
			color: var(--di-placeholder-color)

		&:read-only:not(:disabled)
			cursor: help

	&__icon
		position: absolute
		top: 50%
		right: var(--di-px)

		display: inline-block

		size: var(--calendar-icon-size)

		color: var(--di-border-color)

		transform: translateY(-50%)
		transition: color .3s ease

		pointer-events: none

		&-image
			display: inline-block
			size: 100%
			background-color: currentcolor

			mask-size: contain

			@include icon('calendar')
</style>
