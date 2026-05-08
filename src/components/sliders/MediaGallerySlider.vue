<script setup lang="ts">
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import type { NavigationOptions, PaginationOptions, Swiper as SwiperInstance } from 'swiper/types';
import { Swiper } from 'swiper/vue';
import { ref } from 'vue';

import '@styles/libs/swiper.sass';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/thumbs';

const slider = ref<SwiperInstance | null>(null);
const thumbsSwiper = ref<SwiperInstance | null>(null);
const setThumbsSwiper = (swiper: SwiperInstance) => {
	thumbsSwiper.value = swiper;
};
const modules = [Navigation, Pagination, Thumbs];
const navigation: NavigationOptions = {
	nextEl: '.swiper-button-next',
	prevEl: '.swiper-button-prev',
};
const pagination: PaginationOptions = {
	el: '.swiper-pagination',
	type: 'fraction'
};
function onSwiper(swiper: SwiperInstance) {
	slider.value = swiper;
}
</script>

<template>
	<Swiper
		:modules="modules"
		:thumbs="{ swiper: thumbsSwiper }"
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
				<button class="swiper-button swiper-button-modal swiper-button-prev" />
				<button class="swiper-button swiper-button-modal swiper-button-next" />
			</div>

			<div class="swiper-pagination" />
		</template>
	</Swiper>

	<Swiper
		class="modal-gallery__thumbs"
		:modules="[Thumbs]"
		:space-between="0"
		slides-per-view="auto"
		:speed="500"
		:watch-slides-progress="true"
		@swiper="setThumbsSwiper"
	>
		<template #wrapper-start>
			<slot name="thumbs" />
		</template>
	</Swiper>
</template>

<style scoped lang="sass">

</style>
