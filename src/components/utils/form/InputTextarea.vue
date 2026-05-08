<script setup lang="ts">
import { ref } from 'vue';

import InputTemplate from '@components/utils/templates/form/InputTemplate.vue';
import type { ErrorObject } from '@vuelidate/core';

export interface InputTextareaProps {
	id?: string;
	label?: string;
	placeholder?: string;
	readOnly?: boolean;
	disabled?: boolean;
	required?: boolean;
	title?: string;
	name?: string;
	errors?: string[] | ErrorObject[];
}

withDefaults(defineProps<InputTextareaProps>(), {
	id: '',
	label: '',
	placeholder: '',
	readOnly: false,
	disabled: false,
	required: false,
	title: '',
	name: '',
	errors: () => [],
});

const innerValue = ref<string>('');
const modelValue = defineModel<string>({
	get(v) {
		return v ?? innerValue.value;
	},
	set(v) {
		innerValue.value = v;
		return v;
	},
});
</script>

<template>
	<InputTemplate :id="id" :label="label" :errors="errors">
		<template v-if="$slots.label" #label="{ labelValue }">
			<slot name="label" :label-value="labelValue" />
		</template>

		<textarea
			:id="id"
			v-model="modelValue"
			:placeholder="placeholder"
			:disabled="disabled"
			:readonly="readOnly"
			:required="required"
			:title="title"
			:name="name"
			class="input-textarea"
			:class="{ error: errors.length }"
		/>

		<template v-if="$slots.action" #action>
			<slot name="action" />
		</template>
	</InputTemplate>
</template>

<style lang="sass">
.input-textarea
	flex: 1 1 auto

	width: 100%
	min-height: calc((2 * var(--di-border-width) + var(--di-font-size) * var(--di-line-height) + 2 * var(--di-py)) * 1.6)
	max-height: 350px
	padding: var(--di-py) var(--di-px)

	border-width: var(--di-border-width)

	border-style: solid
	border-radius: var(--di-border-radius)
	border-color: var(--di-border-color)

	background-color: var(--di-bg)

	color: var(--di-color)

	font-size: var(--di-font-size)
	line-height: var(--di-line-height)

	transition: border-color .3s ease, background-color .3s ease

	resize: vertical

	&:focus
		border-color: var(--di-border-color-active)

	&:focus-visible
		border-color: var(--di-border-color-hover)
		outline: none

	@include hover
		border-color: var(--di-border-color-hover)

	&:disabled
		border-color: var(--di-border-color-disabled)
		background-color: var(--di-bg-disabled)
		color: var(--di-color-disabled)
		cursor: not-allowed

		&::placeholder
			color: var(--di-color-disabled)

	&.error
		border-color: transparent transparent var(--di-border-color-error)

		&::placeholder
			color: var(--di-color-error)

	&::placeholder
		color: var(--di-placeholder-color)
		font-family: var(--font-family-primary)

	&:read-only:not(:disabled)
		cursor: help
</style>
