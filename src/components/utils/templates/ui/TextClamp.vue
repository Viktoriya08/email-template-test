<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'TextClamp',
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

		if (this.parent.scrollHeight > this.parent.offsetHeight)
			this.showLess();

		else this.parent.classList.add('no-clamp');
	},
	methods: {
		showMore() {
			this.parent?.classList.remove('text-clamp-closed');
			this.parent?.classList.add('text-clamp-open');
		},
		showLess() {
			this.parent?.classList.remove('text-clamp-open');
			this.parent?.classList.add('text-clamp-closed');
		},
	},
});
</script>

<template>
	<div class="text-clamp" ref="container">
		<slot :show-more="showMore" :show-less="showLess" />
	</div>
</template>
