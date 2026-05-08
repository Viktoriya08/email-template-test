<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
	name: 'CategoriesToggle',
	props: {
		btnClass: {
			type: String,
			default: () => null,
		},
	},
	data() {
		return {
			parent: null as HTMLElement | null,
			isShown: false,
		};
	},
	mounted() {
		const container = this.$refs.container as HTMLElement;
		this.parent = container?.firstElementChild as HTMLElement;
		if (!this.parent)
			return;
	},
	methods: {
		toggle() {
			this.parent?.classList.toggle('open');
			this.isShown = !this.isShown;
		},
	},
});
</script>

<template>
	<div ref="container">
		<slot name="list"/>

		<button class="btn" :class="btnClass" @click.prevent="toggle">
			<span class="btn__text">{{ isShown ? 'Скрыть' : 'Показать больше' }}</span>
		</button>
	</div>

</template>

<style scoped lang="sass">

</style>
