<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Swiper } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import type { AutoplayOptions, Swiper as SwiperInstance, SwiperOptions } from 'swiper/types';

import 'swiper/scss';
import 'swiper/scss/autoplay';
import '@styles/libs/swiper.sass';

export default defineComponent({
	name: 'PartnersSlider',
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
				slidesPerView: 3,
			},
			481: {
				slidesPerView: 4,
			},
			769: {
				slidesPerView: 6,
			},
			1440: {
				slidesPerView: 8,
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
				delay: 0,
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
			:space-between="32"
			:speed="12000"
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
