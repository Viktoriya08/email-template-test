<script setup lang="ts">
import { ref } from 'vue';

import InputTemplate from '@components/utils/templates/form/InputTemplate.vue';
import type { ErrorObject } from '@vuelidate/core';

export interface InputCheckboxProps {
	id?: string;
	label?: string;
	text?: string;
	readOnly?: boolean;
	disabled?: boolean;
	name?: string;
	required?: boolean;
	title?: string;
	errors?: string[] | ErrorObject[];
}

withDefaults(defineProps<InputCheckboxProps>(), {
	id: '',
	label: '',
	text: '',
	readOnly: false,
	disabled: false,
	name: '',
	required: false,
	title: '',
	errors: () => [],
});

const innerValue = ref(false);
const modelValue = defineModel<boolean>({
	get(v) {
		return v ?? innerValue;
	},
	set(value: boolean) {
		innerValue.value = value;
		return value;
	},
});
</script>

<template>
	<InputTemplate :label="label" :errors="errors" tag="span">
		<template v-if="$slots.label" #label="{ labelValue }">
			<slot name="label" :label-value="labelValue" />
		</template>

		<label
			class="input-checkbox"
			:title="title"
			:class="[
				{ active: modelValue },
				{ error: errors.length },
				{ disabled },
				{ readonly: readOnly },
			]"
		>
			<input
				:id="id"
				v-model="modelValue"
				type="checkbox"
				:disabled="disabled || readOnly"
				:required="required"
				:name="name"
				:readonly="readOnly"
				class="input-checkbox__input"
			>
			<span class="input-checkbox__checkmark" />
			<span class="input-checkbox__value">
				{{ text }}
			</span>
		</label>

		<template v-if="$slots.action" #action>
			<slot name="action" />
		</template>
	</InputTemplate>
</template>

<style scoped lang="sass">
.input-checkbox
	position: relative
	display: flex
	flex: 1 1 auto
	align-items: center
	width: 100%
	cursor: pointer

	&:focus
		& .input-checkbox
			&__checkmark
				border-color: var(--color-primary-600)
				background-color: var(--color-primary-300)


	&:focus-visible
		outline: none

		& .input-checkbox
			&__checkmark
				border-color: var(--color-primary-600)
				background-color: var(--color-primary-300)

	@include hover
		& .input-checkbox
			&__checkmark
				border-color: var(--color-primary-600)

	&.disabled
		cursor: not-allowed

		& .input-checkbox
			&__checkmark
				border-color: var(--color-neutral-500)

			&__value
				color: var(--color-neutral-700)

	&.readonly:not(.disabled)
		cursor: help

	&.error
		& .input-checkbox
			&__checkmark
				border-color: var(--color-neutral-500)

	&.active
		@include hover
			& .input-checkbox
				&__checkmark
					background-color: var(--color-primary-400)

		&.disabled
			& .input-checkbox
				&__checkmark
					border-color: transparent
					background-color: var(--color-neutral-500)

				&__value
					color: var(--color-neutral-900)

		& .input-checkbox
			&__checkmark
				border-color: transparent
				background-color: var(--color-primary-600)

				&::before
					display: block

	&__checkmark
		display: flex
		flex-shrink: 0
		align-items: center
		justify-content: center

		size: 24px
		margin-right: 16px

		border-width: 2px
		border-style: solid
		border-radius: 8px
		border-color: var(--color-neutral-500)

		background-color: var(--color-neutral-100)

		color: var(--color-neutral-100)

		transition: border-color .3s ease, background-color .3s ease

		&::before
			content: ''
			position: relative

			display: none
			flex-grow: 0
			flex-shrink: 0

			size: 100%

			background-color: currentcolor
			mask-position: center
			mask-size: contain

			pointer-events: none

			@include icon("check")

	&__value
		color: var(--di-color)
		font-size: var(--di-font-size)
		line-height: var(--di-line-height)

	&__input
		position: absolute
		top: 0
		left: 0
		width: 0
		height: 0
		opacity: 0
		appearance: none

		&:focus-visible:not(&:checked)
			& + .input-checkbox
				&__checkmark
					border-color: var(--di-border-color-active)
					background-color: var(--di-bg-focus)

		&:checked:focus-visible
			& + .input-checkbox
				&__checkmark
					outline: 2px solid var(--di-bg-focus)
					outline-offset: 2px
</style>
