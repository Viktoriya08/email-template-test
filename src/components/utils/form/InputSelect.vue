<script setup lang="ts">
import InputTemplate from '@components/utils/templates/form/InputTemplate.vue';
import type { ErrorObject } from '@vuelidate/core';

export interface InputSelectProps {
	id?: string;
	label?: string;
	errors?: string[] | ErrorObject[];
}

withDefaults(defineProps<InputSelectProps>(), {
	id: '',
	label: '',
	errors: () => [],
});
</script>

<template>
	<InputTemplate :id="id" :label="label" :errors="errors">
		<template v-if="$slots.label" #label="{ labelValue }">
			<slot name="label" :label-value="labelValue" />
		</template>

		<slot />

		<template v-if="$slots.action" #action>
			<slot name="action" />
		</template>
	</InputTemplate>
</template>

<style lang="sass">



</style>
