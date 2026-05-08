<script setup lang="ts">
import InputTemplate from '@components/utils/templates/form/InputTemplate.vue';
import { useMask } from '@scripts/composables/useMask';
import type { MaskType } from '@scripts/consts/masks';
import type { ErrorObject } from '@vuelidate/core';
import { ref } from 'vue';

export type AutoComplete = 'on' |
	'sex' |
	'honorific-prefix' |
	'given-name' |
	'additional-name' |
	'family-name' |
	'nickname' |
	'email' |
	'username' |
	'new-password' |
	'current-password' |
	'one-time-code' |
	'organization-title' |
	'organization' |
	'street-address' |
	'address-level4' |
	'address-level3' |
	'address-level2' |
	'address-level1' |
	'country' |
	'country-name' |
	'postal-code' |
	'cc-name' |
	'cc-given-name' |
	'cc-additional-name' |
	'cc-family-name' |
	'cc-number' |
	'cc-exp' |
	'cc-exp-month' |
	'cc-exp-year' |
	'cc-csc' |
	'cc-type' |
	'transaction-amount' |
	'tel' |
	'tel-local' |
	'url';

export interface InputTextProps {
	id?: string;
	label?: string;
	placeholder?: string;
	readOnly?: boolean;
	disabled?: boolean;
	required?: boolean;
	unmaskAsNumber?: boolean;
	autoComplete?: AutoComplete;
	title?: string;
	name?: string;
	maskType?: MaskType;
	type?: 'text' | 'email' | 'tel' | 'numeric';
	errors?: string[] | ErrorObject[];
	maxlength?: string;
}

const props = withDefaults(defineProps<InputTextProps>(), {
	id: '',
	label: '',
	placeholder: '',
	unmaskAsNumber: false,
	readOnly: false,
	disabled: false,
	required: false,
	title: '',
	name: '',
	type: 'text',
	maskType: undefined,
	autocomplete: 'off',
	errors: () => [],
	maxlength: '',
});

const { getMask } = useMask();
const innerValue = ref<string | number>();
const modelValue = defineModel<string | number>({
	get(v) {
		return v ?? innerValue.value;
	},
	set(v) {
		innerValue.value = v;
		if (props.unmaskAsNumber)
			return Number.parseFloat(String(v));
		return v;
	},
});
</script>

<template>
	<InputTemplate :id="id" :label="label" :errors="errors">
		<template v-if="$slots.label" #label="{ labelValue }">
			<slot name="label" :label-value="labelValue" />
		</template>

		<input
			:id="id"
			v-model="modelValue"
			v-mask:[getMask(maskType)]
			:placeholder="placeholder"
			:disabled="disabled"
			:readonly="readOnly"
			:required="required"
			:inputmode="type"
			:autocomplete="autoComplete"
			:title="title"
			:name="name"
			type="text"
			:maxlength="maxlength"
			class="input-text"
			:class="[
				{ error: errors.length },
			]"
		>
		<template v-if="$slots.action" #action>
			<slot name="action" />
		</template>
	</InputTemplate>
</template>

<style lang="sass">
.input-text
	flex: 1 1 auto

	width: 100%
	min-height: calc(2 * var(--di-border-width) + var(--di-font-size) * var(--di-line-height) + 2 * var(--di-py))
	padding: var(--di-py) var(--di-px)

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

	&__pass-btn
		position: absolute
		top: 50%
		right: var(--di-px)
		size: var(--di-icon-size)
		color: var(--color-neutral-700)
		transform: translateY(-50%)
		transition: color .3s ease

		svg
			width: 100%
			height: 100%

	&::placeholder
		color: var(--di-placeholder-color)

	&:read-only:not(:disabled)
		cursor: help
</style>
