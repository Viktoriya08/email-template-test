<script setup lang="ts">
import { computed, reactive, ref } from 'vue';

export interface BaseDropdownProps {
	showOnClick?: boolean;
	theme?: 'default';
	isFixed?: boolean;
}

interface DropdownPosition {
	top?: string;
	left?: string;
	right?: string;
	position: 'fixed' | 'absolute';
}

const props = withDefaults(defineProps<BaseDropdownProps>(), {
	showOnClick: false,
	theme: 'default',
	isFixed: false,
});

const dropdown = ref<HTMLElement>();
const dropdownWillHide = ref(false);
const dropdownHideTimeout = ref<number | null>(null);
const dropdownShown = ref(false);
const dropdownPosition = reactive<DropdownPosition>({
	position: 'absolute',
	top: '100%',
	left: '0',
	right: undefined,
});

const dropdownEvents = computed(() => ({
	mouseleave: startHidingDropdown,
	...(props.showOnClick ? { click: showDropdown } : { mouseenter: showDropdown }),
}));

function showDropdown() {
	if (dropdownShown.value) {
		dropdownWillHide.value = false;
		return;
	}

	if (props.isFixed)
		window.addEventListener('scroll', getPosition);

	getPosition();
	dropdownShown.value = true;
}

function startHidingDropdown() {
	dropdownWillHide.value = true;

	if (dropdownHideTimeout.value)
		clearTimeout(dropdownHideTimeout.value);

	dropdownHideTimeout.value = setTimeout(() => {
		if (dropdownWillHide.value)
			hideDropdown();
	}, 500);
}

function hideDropdown() {
	dropdownWillHide.value = false;
	dropdownShown.value = false;
}

function afterTransitionLeaveHandler() {
	if (props.isFixed)
		window.removeEventListener('scroll', getPosition);
}

function getPosition() {
	const bodyRect = dropdown.value;

	if (!bodyRect) {
		dropdownPosition.position = 'absolute';
		dropdownPosition.top = '100%';
		dropdownPosition.left = '0';
		dropdownPosition.right = undefined;
		return;
	}

	const bodyRectCoords = bodyRect.getBoundingClientRect();
	if (bodyRectCoords.left > window.innerWidth / 2) {
		dropdownPosition.right = props.isFixed ? `${window.innerWidth - bodyRectCoords.right}px` : '0';
		dropdownPosition.left = undefined;
	}
	else {
		dropdownPosition.left = props.isFixed ? `${bodyRectCoords.left}px` : '0';
		dropdownPosition.right = undefined;
	}

	if (props.isFixed) {
		dropdownPosition.position = 'fixed';
		dropdownPosition.top = `${bodyRectCoords.top + bodyRectCoords.height}px`;
	}
	else {
		dropdownPosition.position = 'absolute';
		dropdownPosition.top = '100%';
	}
}
</script>

<template>
	<div
		ref="dropdown"
		v-click-outside="hideDropdown"
		class="dropdown"
		:class="[{ active: dropdownShown }, `dropdown--${theme}`]"
		v-on="dropdownEvents"
	>
		<div class="dropdown__trigger">
			<slot name="trigger" :dropdown-shown="dropdownShown" />
		</div>

		<Transition name="dropdown" @after-leave="afterTransitionLeaveHandler">
			<div v-show="dropdownShown" class="dropdown__body" :style="dropdownPosition">
				<div class="dropdown__content">
					<slot />
				</div>
			</div>
		</Transition>
	</div>
</template>

<style lang="sass">

</style>
