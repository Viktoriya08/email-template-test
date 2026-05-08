<script setup lang="ts">
import { ref } from 'vue';

export interface InputSearchProps {
	id?: string;
	name?: string;
	placeholder?: string;
	disabled?: boolean;
	title?: string;
	tooltips?: string[];
}

const props = withDefaults(defineProps<InputSearchProps>(), {
	id: '',
	name: '',
	placeholder: '',
	disabled: false,
	title: '',
	tooltips: () => [],
});

const emit = defineEmits(['search']);

const innerValue = ref('');
const modelValue = defineModel<string>({
	get(v) {
		return v ?? innerValue.value;
	},
	set(v) {
		innerValue.value = v;
		return v;
	},
});

const isFocus = ref(false);
function setValue(value: string): void {
	modelValue.value = value;
}

function handleFocusOut(): void {
	isFocus.value = false;
}

function handleFocusIn(): void {
	if (props.disabled)
		return;
	isFocus.value = true;
}

function handleSearch(): void {
	if (props.disabled)
		return;
	emit('search', modelValue.value);
}

function handleTooltipClick(tooltip: string): void {
	setValue(tooltip);
	isFocus.value = false;
}
</script>

<template>
	<div v-click-outside="handleFocusOut" class="input-search" @focusin="handleFocusIn">
		<div class="input-search__wrapper">
			<div class="input-search__icons input-search__icons--left">
				<span
					aria-hidden="true"
					tabindex="0"
					role="button"
					class="input-search__lens"
					:class="{ disabled }"
					@click="handleSearch"
					@keydown.enter="handleSearch"
				>
					<span class="input-search__lens-icon" />
				</span>
			</div>

			<input
				:id="id"
				v-model="modelValue"
				:placeholder="placeholder"
				:disabled="disabled"
				inputmode="text"
				:title="title"
				:name="name"
				type="text"
				class="input-search__input"
				@keydown.enter="handleSearch"
			>

			<div class="input-search__icons input-search__icons">
				<span
					v-if="modelValue"
					aria-hidden="true"
					tabindex="0"
					role="button"
					class="input-search__clear"
					@click="setValue('')"
					@keydown.enter="setValue('')"
				>
					<span class="input-search__clear-icon" />
				</span>
				<span
					v-if="isFocus || modelValue"
					aria-hidden="true"
					tabindex="0"
					role="button"
					class="input-search__confirm"
					@click="handleSearch"
					@keydown.enter="handleSearch"
				>
					<span class="input-search__confirm-icon" />
				</span>
			</div>
		</div>
		<div v-show="tooltips.length && isFocus" class="input-search__dropdown">
			<ul class="input-search__tooltips">
				<li
					v-for="tooltip in tooltips"
					:key="tooltip"
					tabindex="0"
					role="button"
					class="input-search__tooltip"
					@click="handleTooltipClick(tooltip)"
					@keydown.enter="handleTooltipClick(tooltip)"
				>
					{{ tooltip }}
				</li>
			</ul>
		</div>
	</div>
</template>

<style lang="sass">
.input-search
	--search-lens-size: var(--di-icon-size)
	--search-clear-size: var(--di-icon-size)
	--search-confirm-size: var(--di-icon-size)

	position: relative

	&__wrapper
		position: relative
		display: flex
		min-width: 250px

	&__input
		flex: 1 1 auto

		width: 100%
		min-height: calc(2 * var(--di-border-width) + var(--di-font-size) * var(--di-line-height) + 2 * var(--di-py))
		padding: var(--di-py) calc(var(--search-confirm-size) + var(--search-clear-size) + var(--di-px) / 2 + var(--di-px)) var(--di-py) calc(var(--search-lens-size) + var(--di-px) / 2 + var(--di-px))

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
			background-color: var(--di-bg-hover)

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

	&__icons
		position: absolute
		top: 50%
		right: var(--di-px)
		display: flex
		align-items: center
		gap: calc(var(--di-px) / 4)
		transform: translateY(-50%)

		&--left
			right: unset
			left: var(--di-px)

	&__lens,
	&__clear,
	&__confirm
		flex-grow: 0
		flex-shrink: 0
		transition: color .3s ease
		cursor: pointer

		&-icon
			display: inline-block
			size: 100%
			mask-repeat: no-repeat
			mask-size: contain

	&__lens
		size: var(--search-lens-size)
		color: var(--color-neutral-500)

		@include hover
			color: var(--color-primary-600)

		&.disabled
			color: var(--di-border-color-disabled)
			cursor: not-allowed

		&-icon
			background-color: currentcolor

			@include icon('lens')

			@include media('max', 'tablet')
				@include icon('search')

	&__clear
		size: var(--search-clear-size)
		color: var(--color-neutral-700)

		@include hover
			color: var(--color-primary-600)

		&-icon
			background-color: currentcolor

			@include icon('clear')

	&__confirm
		size: var(--search-confirm-size)
		color: var(--color-primary-600)

		@include hover
			color: var(--color-primary-700)

		&-icon
			background-color: currentcolor

			@include icon('arrow-right')

	&__dropdown
		position: absolute
		right: calc(var(--di-border-width) * -1)
		bottom: 0
		left: calc(var(--di-border-width) * -1)
		z-index: var(--z-index-dropdown)

		display: flex
		flex-direction: column

		max-height: 225px
		margin-top: calc(var(--di-border-width, 1px) * -1)
		padding: fluid(4, 8)

		border-radius: var(--di-border-radius)
		outline: none

		background: var(--di-bg, #FFF)

		transform: translateY(calc(100% + 6px))

	&__tooltips
		display: flex
		flex-direction: column
		gap: 2px
		max-height: 100%
		padding-right: fluid(12, 16)
		overflow-y: scroll
		-webkit-overflow-scrolling: touch

		@include v-scroll

	&__tooltip
		display: flex
		align-items: center
		justify-content: flex-start

		padding: fluid(10, 14.5) fluid(12, 16)

		border-radius: var(--di-border-radius)

		font-size: var(--di-font-size)
		line-height: var(--di-line-height)

		text-align: left
		text-decoration: none

		cursor: pointer

		&:focus
			outline: none

		&:focus-visible
			background-color: var(--color-primary-trans-10)

		@include hover
			background-color: var(--color-primary-trans-10)
</style>
