<script setup lang="ts">
import type { ErrorObject } from '@vuelidate/core';

export interface InputTemplateProps {
	label?: string;
	tag?: 'label' | 'span';
	id?: string;
	errors?: string[] | ErrorObject[];
}

withDefaults(defineProps<InputTemplateProps>(), {
	tag: 'label',
	errors: () => [],
});
</script>

<template>
	<div class="default-input">
		<Component :is="tag" v-if="label" :for="id" class="default-input__label">
			<slot name="label" :label-value="label">
				<span class="default-input__label-text">{{ label }}</span>
			</slot>
		</Component>
		<div class="default-input__input">
			<slot />
			<slot name="action" />
		</div>
		<ul v-if="errors.length" class="default-input__errors">
			<li class="default-input__error">
				{{ typeof errors[0] === 'string' ? errors[0] : errors[0].$message }}
			</li>
		</ul>
		<div v-if="$slots.underInput" class="default-input__bottom">
			<slot name="underInput" />
		</div>
	</div>
</template>

<style scoped lang="sass">
.default-input
	display: flex
	flex-direction: column

	&:has(.disabled)
		.default-input__label
			color: var(--color-neutral-500)

	&__label
		padding-bottom: 8px
		color: var(--di-label-color)
		font-size: var(--font-size-text-s)
		font-weight: 400
		line-height: var(--line-height-text)

	&__input
		position: relative
		display: flex
		align-items: center
		gap: 8px
		min-width: 250px

	&__errors
		margin-top: 8px

	&__error
		color: var(--color-negative)
		font-size: var(--font-size-text-s)
		font-weight: 400
		line-height: var(--line-height-text)

	&__bottom
		margin-top: 12px
</style>
