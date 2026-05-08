<script lang="ts">
import InputSearch from "@components/utils/form/InputSearch.vue";
import {defineComponent} from "vue";

export default defineComponent({
	components: {InputSearch}
})


</script>

<template>
	<form class="form form--search">
		<InputSearch id="header-search" :placeholder="`Номер / название запчасти`" />
	</form>
</template>

<style scoped lang="sass">

</style>
