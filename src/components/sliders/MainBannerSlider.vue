<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Swiper } from 'swiper/vue';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import type { AutoplayOptions, NavigationOptions, PaginationOptions, Swiper as SwiperInstance } from 'swiper/types';

import 'swiper/scss';
import 'swiper/scss/autoplay';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import '@styles/libs/swiper.sass';

export default defineComponent({
	name: 'MainBannerSlider',
	components: {
		Swiper,
	},
	setup() {
		const slider = ref<SwiperInstance | null>(null);

		const onSwiper = (swiper: SwiperInstance) => {
			slider.value = swiper;
		};

		return {
			modules: [Autoplay, Navigation, Pagination],
			onSwiper,
		};
	},
	data() {
		return {
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			} as AutoplayOptions,

			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			} as NavigationOptions,

			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			} as PaginationOptions
		};
	},
});
</script>

<template>
	<Swiper
			:modules="modules"
			:slides-per-view="1"
			:space-between="8"
			:navigation="navigation"
			:pagination="pagination"
			:speed="700"
			:loop="true"
			:autoplay="autoplay"
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
