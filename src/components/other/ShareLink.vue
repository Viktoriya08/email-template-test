<script lang="ts">
// import { useBaseStore } from '@scripts/hooks/stateHooks/useBaseStore';
// import { useBaseStore } from 'src/scripts/composables/store/getBaseStore.ts';
import useBaseStore from '@scripts/store/base';
import { defineComponent } from 'vue';

const { isCookieConfirmed } = useBaseStore();

export default defineComponent({
	name: 'ShareLink',
	setup() {
		const { infoMessage } = useBaseStore();
		return {
			infoMessage,
		};
	},
	computed: {
		link() {
			return window.location.href;
		},
	},
	methods: {
		copyLink(message: string) {
			navigator.clipboard.writeText(this.link);
			this.infoMessage(message);
		},
	},
});
</script>

<template>
	<slot :copy-link="copyLink" />
</template>
