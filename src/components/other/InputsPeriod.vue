<script setup lang="ts">
import InputText from '@components/utils/form/InputText.vue';


</script>

<template>
	<div class="inputs-period">
		<InputText
			id="start-period"
			class="inputs-period__el"
			label="Начало периода"
			placeholder="12.05.2024"
			type="numeric"
			mask-type="dataMask"
		/>
		<InputText
			id="finish-period"
			class="inputs-period__el"
			label="Конец периода"
			placeholder="12.05.2024"
			type="numeric"
			mask-type="dataMask"
		/>
	</div>

</template>

<style scoped lang="sass">
.inputs-period
	display: flex
	gap: 8px

	&__el 
		@include media("max", "tablet")
			flex-grow: 1
</style>
