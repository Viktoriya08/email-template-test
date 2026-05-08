<script setup lang="ts">
import { ref } from 'vue';

import Toggle from '@vueform/toggle';
import InputTemplate from '@components/utils/templates/form/InputTemplate.vue';
import type { ErrorObject } from '@vuelidate/core';

export interface InputSwitchProps {
	id?: string;
	disabled?: boolean;
	label?: string;
	name?: string;
	trueValue?: string | number | boolean;
	falseValue?: string | number | boolean;
	offLabel?: string;
	onLabel?: string;
	errors?: string[] | ErrorObject[];
}

const props = withDefaults(defineProps<InputSwitchProps>(), {
	id: '',
	disabled: false,
	label: '',
	name: '',
	trueValue: true,
	falseValue: false,
	offLabel: '',
	onLabel: '',
	errors: () => [],
});

const innerValue = ref<string | number | boolean>(false);
const modelValue = defineModel<string | number | boolean>({
	get(v) {
		return v ?? innerValue.value;
	},
	set(v) {
		innerValue.value = v;
	},
});

function setValue(value: string | number | boolean) {
	if (props.disabled)
		return;
	modelValue.value = value;
}
</script>

<template>
	<InputTemplate :label="label" :errors="errors" tag="span">
		<template v-if="$slots.label" #label="{ labelValue }">
			<slot name="label" :label-value="labelValue" />
		</template>

		<div
			class="input-switch"
			:class="[{ disabled }, { error: errors.length }, { active: modelValue === trueValue }]"
		>
			<span
				v-if="offLabel"
				class="input-switch__label input-switch__label--off"
				@click="setValue(falseValue)"
			>{{ offLabel }}</span>
			<Toggle
				v-model="modelValue"
				:disabled="disabled"
				:name="name"
				:true-value="trueValue"
				:false-value="falseValue"
				class="input-switch__switch"
			/>
			<span
				v-if="onLabel"
				class="input-switch__label input-switch__label--on"
				@click="setValue(trueValue)"
			>{{ onLabel }}</span>
		</div>

		<template v-if="$slots.action" #action>
			<slot name="action" />
		</template>
	</InputTemplate>
</template>

<style lang="sass">
@import '@vueform/toggle/themes/default'

.input-switch
	display: flex
	align-items: center
	gap: 16px
	cursor: pointer

	&.error
		& .input-switch
			&__switch
				--toggle-ring-color: var(--di-border-color-error)

				& .toggle
					outline-width: 2px

	&.active
		& .input-switch
			&__switch

				&:focus-visible
					--toggle-ring-color: var(--color-primary-300)

				@include hover
					--toggle-ring-color: var(--color-primary-300)

	&.disabled
		cursor: not-allowed

		& .input-switch
			&__switch
				pointer-events: none

			&__label
				color: var(--di-color-disabled)
				pointer-events: none

	&__label
		color: var(--di-color)
		font-size: var(--di-font-size)
		line-height: var(--di-line-height)

	&__switch
		--toggle-width: 68px
		--toggle-height: 32px
		--toggle-border: 4px
		--toggle-font-size: var(--di-font-size)
		--toggle-duration: 150ms
		--toggle-bg-on: var(--color-primary-500)
		--toggle-bg-off: var(--color-neutral-300)
		--toggle-bg-on-disabled: var(--color-primary-300)
		--toggle-bg-off-disabled: var(--color-neutral-200)
		--toggle-border-on: transparent
		--toggle-border-off: transparent
		--toggle-border-on-disabled: transparent
		--toggle-border-off-disabled: transparent
		--toggle-ring-width: 4px
		--toggle-ring-color: var(--color-neutral-200)
		--toggle-text-on: var(--di-color)
		--toggle-text-off: var(--di-color)
		--toggle-text-on-disabled: var(--color-neutral-500)
		--toggle-text-off-disabled: var(--color-neutral-500)
		--toggle-handle-enabled: var(--di-bg)
		--toggle-handle-disabled: var(--di-bg)

		&:focus
			box-shadow: none

		&:focus-visible
			& .toggle
				outline-width: var(--toggle-ring-width)

		@include hover
			--toggle-bg-on: var(--color-primary-400)
			--toggle-ring-color: var(--color-neutral-400)

			& .toggle
				outline-width: 2px

		& .toggle
			outline-color: var(--toggle-ring-color)
			outline-style: solid
			outline-width: 0
			transition: background-color .3s ease, border-color .3s ease
</style>
