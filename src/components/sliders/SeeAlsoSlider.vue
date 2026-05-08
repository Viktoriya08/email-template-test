<script setup lang="ts">
import { Navigation, Pagination } from 'swiper/modules';
import type { NavigationOptions, Swiper as SwiperInstance, SwiperOptions } from 'swiper/types';
import { Swiper } from 'swiper/vue';
import { ref } from 'vue';

import '@styles/libs/swiper.sass';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

const slider = ref<SwiperInstance | null>(null);
const modules = [Navigation, Pagination];
const navigation: NavigationOptions = {
	nextEl: '.swiper-button-next',
	prevEl: '.swiper-button-prev',
};

const breakpoints: SwiperOptions['breakpoints'] = {
	320: {
		slidesPerView: 1.2,
	},
	481: {
		slidesPerView: 2,
	},
	768: {
		slidesPerView: 3,
	},
	1440: {
		slidesPerView: 4,
	},
};

function onSwiper(swiper: SwiperInstance) {
	slider.value = swiper;
}
</script>

<template>
	<Swiper
		:modules="modules"
		:slides-per-view="1.2"
		:space-between="8"
		:navigation="navigation"
		:breakpoints="breakpoints"
		:speed="500"
		:loop="true"
		@swiper="onSwiper"
	>
		<template #wrapper-start>
			<slot />
		</template>

	</Swiper>
</template>

<style scoped lang="sass">

</style>
