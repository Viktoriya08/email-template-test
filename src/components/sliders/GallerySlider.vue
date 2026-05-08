<script lang="ts">
import { Autoplay } from 'swiper/modules';
import type { AutoplayOptions, Swiper as SwiperInstance, SwiperOptions } from 'swiper/types';
import { Swiper } from 'swiper/vue';
import { defineComponent, ref } from 'vue';

import '@styles/libs/swiper.sass';
import 'swiper/scss';
import 'swiper/scss/autoplay';

export default defineComponent({
	name: 'GallerySlider',
	components: {
		Swiper,
	},
	setup() {
		const slider = ref<SwiperInstance | null>(null);

		const onSwiper = (swiper: SwiperInstance) => {
			slider.value = swiper;
		};

		const breakpoints = {
			320: {
				slidesPerView: 1.2,
			},
			481: {
				slidesPerView: 2,
			},
			1440: {
				slidesPerView: 3,
			},
		} as SwiperOptions['breakpoints'];

		return {
			modules: [Autoplay],
			onSwiper,
			breakpoints,
		};
	},
	data() {
		return {
			autoplay: {
				delay: 2000,
				disableOnInteraction: true,
			} as AutoplayOptions,
		};
	},
});
</script>

<template>
	<Swiper
			:modules="modules"
			:slides-per-view="3"
			:breakpoints="breakpoints"
			:space-between="8"
			:speed="1000"
			:loop="true"
			:autoplay="autoplay"
	>
		<template #wrapper-start>
			<slot />
		</template>
	</Swiper>
</template>

<style scoped lang="sass">

</style>
