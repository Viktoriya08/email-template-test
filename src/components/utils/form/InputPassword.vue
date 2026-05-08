<script setup lang="ts">
import InputTemplate from '@components/utils/templates/form/InputTemplate.vue';
import type { ErrorObject } from '@vuelidate/core';
import { ref } from 'vue';

export type PassAutoComplete = 'on' |
	'new-password' |
	'current-password' |
	'off';

export interface InputPasswordProps {
	id?: string;
	label?: string;
	placeholder?: string;
	readOnly?: boolean;
	disabled?: boolean;
	required?: boolean;
	autoComplete?: PassAutoComplete;
	title?: string;
	name?: string;
	errors?: string[] | ErrorObject[];
}

withDefaults(defineProps<InputPasswordProps>(), {
	id: '',
	label: '',
	placeholder: '',
	readOnly: false,
	disabled: false,
	required: false,
	title: '',
	name: '',
	autocomplete: 'on',
	errors: () => [],
});

const passShown = ref(false);
const innerValue = ref<string | number>();
const modelValue = defineModel<string | number>({
	get(v) {
		return v ?? innerValue.value;
	},
	set(v) {
		innerValue.value = v;
		return v;
	},
});

function togglePassShown(): void {
	passShown.value = !passShown.value;
}
</script>

<template>
	<InputTemplate :id="id" :label="label" :errors="errors">
		<template v-if="$slots.label" #label="{ labelValue }">
			<slot name="label" :label-value="labelValue" />
		</template>

		<div class="input-password">
			<input
				:id="id"
				v-model="modelValue"
				:placeholder="placeholder"
				:disabled="disabled"
				:readonly="readOnly"
				:required="required"
				:autocomplete="autoComplete"
				:title="title"
				:name="name"
				:type="passShown ? 'text' : 'password'"
				class="input-password__input"
				:class="[
					{ error: errors.length },
				]"
			>
			<span aria-hidden="true" tabindex="0" role="button" class="input-password__icon" :class="{ active: passShown }" @click="togglePassShown" @keydown.enter="togglePassShown">
				<span class="input-password__icon-image" />
			</span>
		</div>

		<template v-if="$slots.action" #action>
			<slot name="action" />
		</template>

		<template v-if="$slots.underInput" #underInput>
			<slot name="underInput" />
		</template>
	</InputTemplate>
</template>

<style lang="sass">
.input-password
	position: relative
	flex: 1 1 auto

	&.disabled
		& .input-password
			&__icon
				color: var(--di-border-color-disabled)
				pointer-events: none

	&.error
		& .input-password
			&__input
				border-color: transparent transparent var(--di-border-color-error)

				// @include placeholder
				// 	color: var(--di-color-error)

			&__icon
				color: var(--di-border-color-error)

	&__input
		flex: 1 1 auto

		width: 100%
		min-height: calc(2 * var(--di-border-width) + var(--di-font-size) * var(--di-line-height) + 2 * var(--di-py))
		padding: var(--di-py) var(--di-px)
		padding-right: calc( var(--di-icon-size) + var(--di-px) )

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

			// @include placeholder
			// 	color: var(--di-color-disabled)

		// @include placeholder
		// 	color: var(--di-placeholder-color)

		&:read-only:not(:disabled)
			cursor: help

	&__icon
		position: absolute
		top: 50%
		right: var(--di-px)

		display: inline-block

		size: var(--di-icon-size)

		color: var(--color-neutral-900)

		transform: translateY(-50%)
		transition: color .3s ease

		cursor: pointer

		&.active
			& .input-password
				&__icon-image
					@include icon('pass-show')

		&-image
			display: inline-block
			size: 100%
			background-color: currentcolor

			mask-size: contain

			@include icon('pass-hide')
</style>
