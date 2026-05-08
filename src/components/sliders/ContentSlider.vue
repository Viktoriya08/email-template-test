<script setup lang="ts">
import { Navigation, Pagination } from 'swiper/modules';
import type { NavigationOptions, PaginationOptions, Swiper as SwiperInstance } from 'swiper/types';
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
const pagination: PaginationOptions = {
	el: '.swiper-pagination',
};
function onSwiper(swiper: SwiperInstance) {
	slider.value = swiper;
}
</script>

<template>
	<Swiper
		:modules="modules"
		:slides-per-view="1"
		:space-between="8"
		:navigation="navigation"
		:pagination="pagination"
		:speed="500"
		:loop="true"
		@swiper="onSwiper"
	>
		<template #wrapper-start>
			<slot />
		</template>

		<template #container-end>
			<div class="swiper-buttons">
				<div class="swiper-button swiper-button-prev" />
				<div class="swiper-button swiper-button-next" />
			</div>

			<div class="swiper-pagination" />
		</template>
	</Swiper>
</template>

<style scoped lang="sass">

</style>
