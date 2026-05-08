<script setup lang="ts">
import InputSelect from '@components/utils/form/InputSelect.vue';
import Multiselect from '@vueform/multiselect';
import type { ErrorObject } from '@vuelidate/core';

export interface ExampleSelectProps {
	id?: string;
	searchable?: boolean;
	label?: string;
	placeholder?: string;
	readOnly?: boolean;
	disabled?: boolean;
	required?: boolean;
	title?: string;
	loading?: boolean;
	labelSelect?: string;
	valueProp?: string;
	canClear?: boolean;
	mode?: 'single' | 'multiple' | 'tags';
	options?: string[] | Array<Record<string, unknown>>;
	groups?: boolean;
	errors?: string[] | ErrorObject[];
}

withDefaults(defineProps<ExampleSelectProps>(), {
	id: '',
	searchable: false,
	label: '',
	placeholder: '',
	readOnly: false,
	disabled: false,
	required: false,
	title: '',
	loading: false,
	labelSelect: '',
	valueProp: '',
	canClear: true,
	mode: 'single',
	options: () => [],
	groups: false,
	errors: () => [],
});

const modelValue = defineModel<string | string[]>();
</script>

<template>
	<InputSelect :id="id" :label="label" :errors="errors">
		<Multiselect
			v-model="modelValue"
			class="input-select"
			:class="[{ 'is-error': errors.length }, { 'is-readonly': readOnly }]"
			:title="title"
			:placeholder="placeholder"
			:options="options"
			:mode="mode"
			:groups="groups"
			:hide-selected="false"
			:caret="!loading"
			:searchable="searchable"
			:disabled="disabled || readOnly"
			:loading="loading"
			:label="labelSelect"
			:value-prop="valueProp"
			:can-clear="canClear"
			no-results-text="Ничего не найдено"
		/>
	</InputSelect>
</template>

<style scoped lang="sass"></style>
