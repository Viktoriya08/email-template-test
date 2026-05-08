<script lang="ts">

import { defineComponent } from 'vue';

import InputRange from '@components/utils/form/InputRange.vue';


export default defineComponent({
	name: 'CatalogFilters',
	components: { InputRange },
});
</script>

<template>
	<form class="catalog-filters">
		<div class="catalog-filters__price price-range">
			<InputRange label="Цена" left-prefix="от" right-prefix="до" :model-value="[0,200000]" mask-type="priceMask" />
		</div>

		<slot />
	</form>
</template>

<style scoped lang="sass">

</style>
