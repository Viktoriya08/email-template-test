<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

export interface BaseGalleryProps {
	galleryId: string;
}

const props = defineProps<BaseGalleryProps>();
const lightbox = ref<PhotoSwipeLightbox>();

onMounted(() => {
	lightbox.value = new PhotoSwipeLightbox({
		gallery: `#${props.galleryId}`,
		children: 'a',
		pswpModule: () => import('photoswipe'),
	});
	lightbox.value.init();
});

onUnmounted(() => {
	lightbox.value?.destroy();
});
</script>

<template>
	<slot />
</template>

<style scoped lang="sass"></style>
