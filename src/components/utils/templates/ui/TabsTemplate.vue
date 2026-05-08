<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'TabsTemplate',
	data() {
		return {
			currentTab: '',
		};
	},
	methods: {
		changeTab(value: string) {
			this.currentTab = value;
		},
	},
});
</script>

<template>
	<slot name="tabs" :change-tab="changeTab" :current-tab="currentTab" />
	<slot name="content" :current-tab="currentTab" :change-tab="changeTab" />
</template>

<style scoped lang="sass"></style>
