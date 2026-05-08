<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';

import InputTemplate from '@components/utils/templates/form/InputTemplate.vue';
import type { IFileData } from '@scripts/composables/useFileData';
import { useFileData } from '@scripts/composables/useFileData';
import type { ErrorObject } from '@vuelidate/core';

export interface InputFileProps {
	accept?: string;
	id?: string;
	multiple?: boolean;
	label?: string;
	placeholder?: string;
	readOnly?: boolean;
	disabled?: boolean;
	required?: boolean;
	name?: string;
	title?: string;
	errors?: string[] | ErrorObject[];
}

type InputFileModelValue = string[] | FileList | null;

const props = withDefaults(defineProps<InputFileProps>(), {
	accept: 'image/*, .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx',
	id: '',
	multiple: false,
	label: '',
	placeholder: 'Прикрепить файл',
	readOnly: false,
	disabled: false,
	required: false,
	name: '',
	title: '',
	errors: () => [],
});

const inputFile = ref<HTMLInputElement>();
const innerValue = ref<InputFileModelValue>(null);
const modelValue = defineModel<InputFileModelValue>({
	get(v) {
		return v ?? innerValue.value;
	},
	set(value: InputFileModelValue) {
		innerValue.value = value;
		return value;
	},
});

const { getFileData } = useFileData();
const valueWithData = computed<IFileData[]>(() => {
	if (!modelValue.value)
		return [];

	if (modelValue.value instanceof FileList) {
		return Array.from(modelValue.value).map(file => ({
			...getFileData.value(file),
		}));
	}

	return modelValue.value.map(file => ({
		...getFileData.value(file),
	}));
});

const shouldShowPlaceholder = computed(() => {
	const isEmpty = !modelValue.value || (modelValue.value instanceof FileList && modelValue.value.length === 0) || (Array.isArray(modelValue.value) && modelValue.value.length === 0);
	return isEmpty || props.multiple;
});

function changeHandler(e: Event) {
	const target: HTMLInputElement = e.target as HTMLInputElement;

	const files: File[] = target.files ? Array.from(target.files) : [];
	if (files.length === 0)
		return;

	const dt = new DataTransfer();
	files.forEach(file => dt.items.add(file));

	if (props.multiple && modelValue.value instanceof FileList)
		Array.from(modelValue.value).forEach(file => dt.items.add(file));

	modelValue.value = dt.files;
	target.value = '';
}

function deleteFile(deletingFile: IFileData) {
	if (deletingFile.type === 'url') {
		modelValue.value = (modelValue.value as string[]).filter(item => item !== deletingFile.url);
		return;
	}

	const { name } = deletingFile;
	const files = Array.from(modelValue.value as FileList).filter(file => file.name !== name);
	const dt = new DataTransfer();
	files.forEach(file => dt.items.add(file));

	modelValue.value = dt.files;
}

function simulateClick(): void {
	inputFile.value?.click();
}

// Drag and drop

const isDrag = ref(false);
const dragCounter = ref(0);

function dropHandler(e: DragEvent) {
	const files = e.dataTransfer?.files ? Array.from(e.dataTransfer.files) : [];
	if (!files || files.length === 0)
		return;

	if (!props.multiple)
		files.splice(1);

	const dt = new DataTransfer();
	files.forEach(file => dt.items.add(file));

	if (props.multiple && modelValue.value instanceof FileList)
		Array.from(modelValue.value).forEach(file => dt.items.add(file));

	modelValue.value = dt.files;
	clearDrag();
}

function dragLeaveHandler() {
	dragCounter.value--;
	if (dragCounter.value === 0)
		isDrag.value = false;
}

function dragEnterHandler() {
	dragCounter.value++;
	isDrag.value = true;
}

function visibilityChangeHandler() {
	if (document.hidden && isDrag.value)
		clearDrag();
}

function clearDrag() {
	isDrag.value = false;
	dragCounter.value = 0;
}

onMounted(() => {
	document.addEventListener('visibilitychange', visibilityChangeHandler);
});

onUnmounted(() => {
	document.removeEventListener('visibilitychange', visibilityChangeHandler);
});
</script>

<template>
	<InputTemplate
		:id="id"
		:label="label"
		tag="span"
		:errors="errors"
	>
		<template v-if="$slots.label" #label="{ labelValue }">
			<slot name="label" :label-value="labelValue" />
		</template>

		<label
			tabindex="0"
			class="input-file"
			:class="[{ error: errors.length }, { disabled }, { readonly: readOnly }]"
			@keydown.enter="simulateClick"
			@dragenter.prevent="dragEnterHandler"
			@dragleave.prevent="dragLeaveHandler"
			@drop.prevent="dropHandler"
			@dragover.prevent
		>
			<input
				:id="id"
				ref="inputFile"
				:multiple="multiple"
				:disabled="disabled || readOnly"
				:required="required"
				:title="title"
				:accept="accept"
				:name="name"
				type="file"
				class="input-file__input"
				@change="changeHandler"
			>
			<span v-if="shouldShowPlaceholder" class="input-file__placeholder">{{ isDrag ? 'Перетащите один или несколько файлов в это поле' : placeholder }}</span>
			<template v-else>
				<span
					v-for="file in valueWithData.slice(0, 1)"
					:key="file.name"
					:title="file.name" class="input-file__value"
				>{{ file.name }}</span>
			</template>
		</label>

		<template v-if="$slots.action" #action>
			<slot name="action" />
		</template>

		<template v-if="multiple" #underInput>
			<div class="files-preview">
				<div
					v-for="file in valueWithData"
					:key="file.name"
					:title="file.name"
					class="files-preview__item file-preview"
				>
					<img v-if="file.isImage" class="file-preview__img" :src="file.url" :alt="file.name">
					<span v-if="file.ext" class="file-preview__ext">.{{ file.ext }}</span>
					<span
						v-if="!readOnly"
						aria-hidden="true"
						tabindex="0"
						role="button"
						class="file-preview__del"
						@click="deleteFile(file)"
						@keydown.enter="deleteFile(file)"
					>
						<span class="file-preview__del-icon" />
					</span>
				</div>
			</div>
		</template>
	</InputTemplate>
</template>

<style lang="sass">
.input-file
	--clip-icon-size: 20px

	position: relative

	flex: 1 1 auto

	width: 100%
	min-height: calc(2 * var(--di-border-width) + var(--di-font-size) * var(--di-line-height) + 2 * var(--di-py))
	padding: var(--di-py) calc(var(--di-px) + var(--clip-icon-size) + var(--di-px) / 2) var(--di-py) var(--di-px)

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

	&::after
		content: ''
		position: absolute
		top: 50%
		right: var(--di-px)

		display: inline-block

		size: var(--clip-icon-size)

		background-color: var(--color-neutral-900)
		mask-size: contain

		transform: translateY(-50%)
		transition: color .3s ease

		pointer-events: none

		@include media("max", "mobile-xl")
			background-color: var(--color-neutral-100)

		@include icon('clip')

	&:focus
		outline: none

	&:focus-visible
		border-color: var(--di-border-color-active)

	@include hover
		border-color: var(--di-border-color-hover)

	&.disabled
		border-color: var(--di-border-color-disabled)
		background-color: var(--di-bg-disabled)
		color: var(--di-color-disabled)
		cursor: not-allowed

		&::after
			background-color: var(--di-border-color-disabled)

	&.readonly:not(.disabled)
		cursor: help

	&.error
		border-color: transparent transparent var(--di-border-color-error)
		color: var(--di-color-error)

		&::after
			background-color: var(--di-border-color-error)

	&__input
		position: absolute
		top: 0
		left: 0
		width: 0
		height: 0
		opacity: 0
		appearance: none

	&__placeholder
		color: var(--di-placeholder-color)
		pointer-events: none

	&__value
		display: inline-block
		max-width: 100%
		overflow: hidden
		line-height: 1
		text-overflow: ellipsis
		white-space: nowrap
		pointer-events: none

.files-preview
	display: grid
	grid-auto-rows: 80px
	grid-template-columns: repeat(auto-fill, 80px)
	gap: 8px
	width: 100%

.file-preview
	position: relative
	z-index: var(--z-index-base)

	display: flex
	align-items: flex-end
	justify-content: flex-end

	padding: 8px

	overflow: hidden

	border-radius: var(--radius-m)

	background-color: var(--color-neutral-200)

	&::before
		content: ''
		position: absolute
		top: 0
		left: 0
		z-index: var(--z-index-below)

		display: block

		width: 100%
		height: 100%

		background-color: var(--color-transparent-50)

	&__img
		position: absolute
		top: 0
		left: 0
		z-index: var(--z-index-below-secondary)
		width: 100%
		height: 100%
		object-fit: cover

	&__ext
		color: var(--color-neutral-900)
		font-size: var(--font-size-text-s)
		font-weight: 700
		line-height: 1
		text-transform: uppercase
		user-select: none

	&__del
		position: absolute
		top: 50%
		right: 50%

		display: flex
		align-items: center
		justify-content: center

		size: 28px

		border-radius: var(--radius-m)

		background-color: var(--color-neutral-100)

		color: var(--color-primary-500)

		transform: translate(50%, -50%)
		transition: color .3s ease, background-color .3s ease

		cursor: pointer

		&:focus
			outline: none
			background-color: var(--color-primary-500)
			color: var(--color-neutral-100)

		@include hover
			background-color: var(--color-primary-500)
			color: var(--color-neutral-100)

		&-icon
			display: inline-block
			size: 75%
			background-color: currentcolor
			mask-position: center
			mask-size: contain

			@include icon('close')
</style>
