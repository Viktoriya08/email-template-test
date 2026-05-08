<script setup lang="ts">
import InputTemplate from '@components/utils/templates/form/InputTemplate.vue';
import type { ErrorObject } from '@vuelidate/core';

export interface InputRadioProps {
	id?: string;
	valueProp: string | number;
	name?: string;
	label?: string;
	text?: string;
	readOnly?: boolean;
	disabled?: boolean;
	required?: boolean;
	title?: string;
	errors?: string[] | ErrorObject[];
}

withDefaults(defineProps<InputRadioProps>(), {
	id: '',
	name: '',
	label: '',
	text: '',
	readOnly: false,
	disabled: false,
	required: false,
	title: '',
	errors: () => [],
});

const modelValue = defineModel<string | number>();
</script>

<template>
	<InputTemplate :label="label" :errors="errors" tag="span">
		<template v-if="$slots.label" #label="{ labelValue }">
			<slot name="label" :label-value="labelValue" />
		</template>

		<label
			class="input-radio"
			:title="title"
			:class="[
				{ active: modelValue === valueProp },
				{ error: errors.length },
				{ disabled },
				{ readonly: readOnly },
			]"
		>
			<input
				:id="id"
				v-model="modelValue"
				type="radio"
				:disabled="disabled || readOnly"
				:required="required"
				:readonly="readOnly"
				:name="name"
				:value="valueProp"
				class="input-radio__input"
			>
			<span class="input-radio__checkmark" />
			<span class="input-radio__value">
				{{ text || valueProp }}
			</span>
		</label>

		<template v-if="$slots.action" #action>
			<slot name="action" />
		</template>
	</InputTemplate>
</template>

<style scoped lang="sass">
.input-radio
	position: relative
	display: flex
	flex: 1 1 auto
	align-items: center
	width: 100%

	@include hover
		& .input-radio
			&__checkmark
				border-color: var(--di-border-color-hover)

	&.disabled
		cursor: not-allowed

		& .input-radio
			&__checkmark
				border-color: var(--di-border-color-disabled)

			&__value
				color: var(--di-color-disabled)

	&.readonly:not(.disabled)
		cursor: help

	&.error
		& .input-radio
			&__checkmark
				border-color: var(--di-border-color-error)

	&.active
		@include hover
			& .input-radio
				&__checkmark
					background-color: var(--di-border-color-hover)

		&.disabled
			& .input-radio
				&__checkmark
					border-color: transparent
					background-color: var(--di-border-color-disabled)

		& .input-radio
			&__checkmark
				border-color: transparent
				background-color: var(--di-border-color-active)

				&::before
					display: block

	&__checkmark
		display: flex
		align-items: center
		justify-content: center
		flex-shrink: 0

		size: 24px
		margin-right: 16px

		border-width: 2px
		border-style: solid
		border-radius: 50%
		border-color: var(--di-border-color)

		background-color: var(--di-bg)

		color: var(--color-neutral-100)

		transition: border-color .3s ease, background-color .3s ease

		&::before
			content: ''
			position: relative

			display: none
			flex-grow: 0
			flex-shrink: 0

			size: 40%

			border-radius: 50%

			background-color: currentcolor

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
			& + .input-radio
				&__checkmark
					border-color: var(--di-border-color-active)
					background-color: var(--di-bg-focus)

		&:checked:focus-visible
			& + .input-radio
				&__checkmark
					outline: 2px solid var(--di-bg-focus)
					outline-offset: 2px
</style>
