<script lang="ts">
import { Navigation, Pagination } from 'swiper/modules';
import type { NavigationOptions, PaginationOptions, Swiper as SwiperInstance, SwiperOptions } from 'swiper/types';
import { Swiper } from 'swiper/vue';
import { defineComponent, ref } from 'vue';

import '@styles/libs/swiper.sass';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

export default defineComponent({
	name: 'AdvantagesSlider',
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
			modules: [ Navigation, Pagination],
			onSwiper,
			breakpoints,
		};
	},
	data() {
		return {
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			} as NavigationOptions,

			pagination: {
				el: '.swiper-pagination',
				type: 'progressbar',
			} as PaginationOptions
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
			:navigation="navigation"
			:pagination="pagination"
	>
		<template #wrapper-start>
			<slot />
		</template>
		<template #container-end>
			<div class="swiper-navigation">
				<div class="swiper-pagination"></div>

				<div class="swiper-buttons">
					<button class="swiper-button swiper-button-prev" />
					<button class="swiper-button swiper-button-next" />
				</div>
			</div>
		</template>
	</Swiper>
</template>

<style scoped lang="sass">

</style>
