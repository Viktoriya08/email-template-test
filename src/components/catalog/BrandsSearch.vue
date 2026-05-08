<script lang="ts">
import InputSearch from "@components/utils/form/InputSearch.vue";
import {defineComponent} from "vue";

export default defineComponent({
	components: {InputSearch}
})


</script>

<template>
	<div class="brands-search">
		<div class="brands-search__search">
			<form class="form form--search">
				<InputSearch id="brands-search" placeholder="Поиск по марке" />
			</form>
		</div>

		<slot name="content"></slot>
	</div>

</template>

<style scoped lang="sass">

</style>
