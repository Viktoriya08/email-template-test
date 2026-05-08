<script lang="ts">
import { Navigation, Pagination } from 'swiper/modules';
import type {NavigationOptions, PaginationOptions, Swiper as SwiperInstance, SwiperOptions} from 'swiper/types';
import { Swiper } from 'swiper/vue';
import { defineComponent } from 'vue';

import '@styles/libs/swiper.sass';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

export default defineComponent ({
	name: 'ProductsSlider',
	components: {
		Swiper,
	},
	props: {
		id: {
			type: String,
			default: 'products-slider',
		},
	},
	setup(props) {
		const navigation = {
			prevEl: `#${props.id} .swiper-button-prev`,
			nextEl: `#${props.id} .swiper-button-next`,
		} as NavigationOptions;

		const pagination = {
			el: '.swiper-pagination',
			type: 'progressbar',
		} as PaginationOptions;

		const breakpoints = {
			320: {
				slidesPerView: 1.2,
				spaceBetween: 10,
			},
			481: {
				slidesPerView: 2,
				spaceBetween: 16,
			},
			1024: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
			1440: {
				slidesPerView: 3.5,
				spaceBetween: 20,
			},
			1600: {
				slidesPerView: 4,
				spaceBetween: 40,
			},
		} as SwiperOptions['breakpoints'];

		return {
			navigation,
			pagination,
			breakpoints,
			modules: [Navigation, Pagination],
		};
	},
});

</script>

<template>
	<Swiper
		:modules="modules"
		:slides-per-view="1.2"
		:space-between="10"
		:navigation="navigation"
		:pagination="pagination"
		:breakpoints="breakpoints"
		:speed="500"
	>
		<template #wrapper-start>
			<slot />
		</template>

		<template #container-end>
			<div class="swiper-navigation">
				<div class="swiper-pagination"></div>
			</div>
		</template>

	</Swiper>
</template>

<style scoped lang="sass">

</style>
