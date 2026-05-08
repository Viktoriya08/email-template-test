<script setup lang="ts">
import IconSVG from '@components/utils/templates/ui/IconSVG.vue';
import { computed, ref } from 'vue';

export interface BigPaginationProps {
	total?: number;
	limit?: number;
	maxButtons?: number;
	hideButtons?: boolean;
	hideBreakpoints?: boolean;
	arrowsStyle?: 'default' | 'simple' | 'small';
	theme?: 'default' | 'light';
}

const props = withDefaults(defineProps<BigPaginationProps>(), {
	total: 0,
	limit: 10,
	maxButtons: 5,
	hideButtons: false,
	hideBreakpoints: false,
	arrowsStyle: 'default',
	theme: 'default',
});


const emit = defineEmits(['change']);

const innerValue = ref(1);
const modelValue = defineModel<number>({
	default: 1,
	get(v) {
		return v ?? innerValue.value;
	},
	set(value: number) {
		innerValue.value = value;
		emit('change', value);
		return value;
	},
});

const getArrowIcons = computed(() => (direction: 'left' | 'right') => {
	switch (props.arrowsStyle) {
		case 'default':
			return direction === 'left' ? 'arrow-left' : 'arrow-right';
		case 'simple':
			return direction === 'left' ? 'chevron-left-md' : 'chevron-right-md';
		case 'small':
			return direction === 'left' ? 'chevron-left-sm' : 'chevron-right-sm';
		default:
			return direction === 'left' ? 'arrow-left' : 'arrow-right';
	}
});

const pagesArr = computed(() => {
	return Array.from({ length: Math.ceil(props.total / props.limit) }, (_, i) => i + 1);
});

const middlePages = computed(() => {
	const middle = Math.ceil(props.maxButtons / 2);
	const start = modelValue.value - middle + 1;
	const end = modelValue.value + middle - 1;

	if (start <= 0)
		return pagesArr.value.slice(0, props.maxButtons);

	if (end >= pagesArr.value.length)
		return pagesArr.value.slice(-props.maxButtons);

	return pagesArr.value.slice(start - 1, end);
});

const lastPage = computed(() => {
	return pagesArr.value[pagesArr.value.length - 1];
});

const shouldShowStartPage = computed(() => {
	return !props.hideBreakpoints && middlePages.value[0] > 1;
});

const shouldShowEndPage = computed(() => {
	return !props.hideBreakpoints && middlePages.value[middlePages.value.length - 1] < lastPage.value;
});

const shouldShowLeftBreakpoint = computed(() => {
	return !props.hideBreakpoints && middlePages.value[0] > 2;
});

const shouldShowRightBreakpoint = computed(() => {
	return !props.hideBreakpoints && middlePages.value[middlePages.value.length - 1] < lastPage.value - 1;
});

function setPage(page: number): void {
	if (page < 1 || page > pagesArr.value.length)
		return;
	modelValue.value = page;
}

function setBreakpointPage(direction: 'left' | 'right' = 'right'): void {
	if (direction === 'left')
		setPage(middlePages.value[0] - 1);
	else
		setPage(middlePages.value[middlePages.value.length - 1] + 1);
}
</script>

<template>
	<slot>
		<div class="big-pagination">

			<ul class="pagination">
				<li v-if="!hideButtons" class="pagination__item">
					<button class="pagination-button pagination-button--type-navigation" :class="[`pagination-button--theme-${theme}`]" :disabled="modelValue === 1" @click="setPage(modelValue - 1)">
						<IconSVG class="pagination-button__icon" :name="getArrowIcons('left')" />
					</button>
				</li>
				<li v-if="shouldShowStartPage" class="pagination__item">
					<button class="pagination-button pagination-button--type-number" :class="[`pagination-button--theme-${theme}`]" @click="setPage(1)">
						1
					</button>
				</li>
				<li v-if="shouldShowLeftBreakpoint" class="pagination__item">
					<button class="pagination-button pagination-button--type-breakpoint" :class="[`pagination-button--theme-${theme}`]" @click="setBreakpointPage('left')">
						...
					</button>
				</li>
				<li v-for="(page, index) in middlePages" :key="index" class="pagination__item">
					<button class="pagination-button pagination-button--type-number" :class="[`pagination-button--theme-${theme}`, { active: modelValue === page }]" @click="setPage(page)">
						{{ page }}
					</button>
				</li>
				<li v-if="shouldShowRightBreakpoint" class="pagination__item">
					<button class="pagination-button pagination-button--type-breakpoint" :class="[`pagination-button--theme-${theme}`]" @click="setBreakpointPage('right')">
						...
					</button>
				</li>
				<li v-if="shouldShowEndPage" class="pagination__item">
					<button class="pagination-button pagination-button--type-number" :class="[`pagination-button--theme-${theme}`]" @click="setPage(lastPage)">
						10
					</button>
				</li>
				<li v-if="!hideButtons" class="pagination__item">
					<button class="pagination-button pagination-button--type-navigation" :class="[`pagination-button--theme-${theme}`]" :disabled="modelValue === lastPage" @click="setPage(modelValue + 1)">
						<IconSVG class="pagination-button__icon" :name="getArrowIcons('right')" />
					</button>
				</li>
			</ul>

			<div class="pagination-limit">
				<span class="pagination-limit__title">Показывать по</span>
				<ul class="pagination-limit__list">
					<li class="pagination-limit__item"><button class="pagination-limit__item-btn">10</button></li>
					<li class="pagination-limit__item"><button class="pagination-limit__item-btn active">25</button></li>
					<li class="pagination-limit__item"><button class="pagination-limit__item-btn">50</button></li>
					<li class="pagination-limit__item"><button class="pagination-limit__item-btn">100</button></li>
					<li class="pagination-limit__item"><button class="pagination-limit__item-btn">200</button></li>
				</ul>
			</div>
		</div>
	</slot>
</template>

<style lang="sass">
.big-pagination
	display: flex
	flex-wrap: wrap
	align-items: center
	justify-content: space-between
	gap: 24px

	@include media("max", "tablet")
		flex-direction: column

	@include media("max", "mobile-xl")
		align-items: stretch

.pagination-limit
	display: flex
	align-items: center
	gap: fluid(12, 16)

	@include media("max", "mobile-xl")
		justify-content: space-between

	&__text 
		font-weight: 500

	&__list 
		display: flex
		align-items: center
		overflow: hidden
		border-radius: var(--radius-s)
		font-size: var(--font-size-text-m)
		line-height: var(--line-height-text)

	&__item 

		&-btn 
			padding: 5px 10px
			border: none
			background-color: var(--color-neutral-200)
			transition: background-color .3s, color .3s

			@include media("max", "mobile-xl")
				min-width: 36px
				padding: 4px 5px
				
			@include hover 
				background-color: var(--color-neutral-400)

			&.active 
				background-color: var(--color-primary-600)
				color: var(--color-neutral-100)

			&:not(.active)
				cursor: pointer


.pagination
	display: flex
	align-items: center
	justify-content: center
	gap: 8px

	@include media("max", "mobile-xl")
		justify-content: space-between

.pagination-button
	--pagination-button-size: fluid(24,32)
	--pagination-button-px: 4px
	--pagination-button-py: 4px
	--pagination-button-gap: 8px
	// -----------------
	--pagination-font-family: var(--font-family-primary)
	--pagination-font-size: var(--font-size-text-m)
	--pagination-line-height: var(--line-height-text)
	--pagination-letter-spacing: inherit
	--pagination-font-weight: 400
	--pagination-text-transform: none
	// -----------------
	--pagination-color: inherit
	--pagination-color-hover: inherit
	--pagination-color-disabled: inherit
	--pagination-color-active: inherit
	--pagination-color-active-hover: inherit
	--pagination-color-active-disabled: inherit
	// -----------------
	--pagination-bg: transparent
	--pagination-bg-hover: transparent
	--pagination-bg-disabled: transparent
	--pagination-bg-active: transparent
	--pagination-bg-active-hover: transparent
	--pagination-bg-active-disabled: transparent
	// -----------------
	--pagination-border-size: 0
	--pagination-border-color: transparent
	--pagination-border-color-hover: transparent
	--pagination-border-color-disabled: transparent
	--pagination-border-color-active: transparent
	--pagination-border-color-active-hover: transparent
	--pagination-border-color-active-disabled: transparent
	// -----------------
	--pagination-outline-size: 2px
	--pagination-outline-color: var(--color-primary-600)
	// -----------------
	--pagination-radius: var(--radius-s)
	// -----------------
	--pagination-icon-size: 100%

	display: inline-flex
	align-items: center
	justify-content: center
	gap: var(--pagination-button-gap)

	size: var(--pagination-button-size)
	padding: var(--pagination-button-py) var(--pagination-button-px)

	border: var(--pagination-border-size) solid var(--pagination-border-color)
	border-radius: var(--pagination-radius)

	background-color: var(--pagination-bg)

	color: var(--pagination-color)

	font-family: var(--pagination-font-family)
	font-size: var(--pagination-font-size)
	font-weight: var(--pagination-font-weight)
	letter-spacing: var(--pagination-letter-spacing)
	line-height: var(--pagination-line-height)

	text-align: center
	text-decoration: none

	text-transform: var(--pagination-text-transform)

	transition: color .3s ease, background-color .3s ease, border-color .3s ease

	cursor: pointer

	&:focus
		outline: none

	&:focus-visible
		outline: var(--pagination-outline-size) solid var(--pagination-outline-color)
		outline-offset: 0

	@include hover
		--pagination-color: var(--pagination-color-hover)
		--pagination-bg: var(--pagination-bg-hover)
		--pagination-border-color: var(--pagination-border-color-hover)

	&:active,
	&.active
		--pagination-color: var(--pagination-color-active)
		--pagination-bg: var(--pagination-bg-active)
		--pagination-border-color: var(--pagination-border-color-active)

		@include hover
			--pagination-color: var(--pagination-color-active-hover)
			--pagination-bg: var(--pagination-bg-active-hover)
			--pagination-border-color: var(--pagination-border-color-active-hover)

		&.disabled,
		&:disabled
			--pagination-color: var(--pagination-color-active-disabled)
			--pagination-bg: var(--pagination-bg-active-disabled)
			--pagination-border-color: var(--pagination-border-color-active-disabled)

	&:disabled,
	&.disabled
		--pagination-color: var(--pagination-color-disabled)
		--pagination-bg: var(--pagination-bg-disabled)
		--pagination-border-color: var(--pagination-border-color-disabled)

		pointer-events: none

	&__icon
		display: block
		flex: none
		size: var(--pagination-icon-size)
		color: currentcolor

	&--theme
		&-default
			--pagination-color: var(--color-neutral-900)
			--pagination-color-hover: var(--color-neutral-100)
			--pagination-color-disabled: var(--color-neutral-500)
			--pagination-color-active: var(--color-neutral-100)
			--pagination-color-active-hover: var(--color-neutral-100)
			--pagination-color-active-disabled: var(--color-neutral-100)
			// -----------------
			--pagination-bg: transparent
			--pagination-bg-hover:  var(--color-primary-500)
			--pagination-bg-disabled: transparent
			--pagination-bg-active: var(--color-primary-600)
			--pagination-bg-active-hover: var(--color-primary-500)
			--pagination-bg-active-disabled: var(--color-neutral-500)

	&--type-navigation
		--pagination-color: var(--color-primary-600)
		--pagination-color-hover: var(--color-primary-500)
		--pagination-color-disabled: var(--color-neutral-500)
		--pagination-color-active: var(--color-primary-700)
		--pagination-color-active-hover: var(--color-primary-500)
		--pagination-color-active-disabled: var(--color-neutral-500)
		// -----------------
		--pagination-bg: transparent
		--pagination-bg-hover:  transparent
		--pagination-bg-disabled: transparent
		--pagination-bg-active: transparent
		--pagination-bg-active-hover: transparent
		--pagination-bg-active-disabled: transparent

</style>
