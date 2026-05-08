<script setup lang="ts">
import IconSVG from '@components/utils/templates/ui/IconSVG.vue';
import { onUnmounted, ref } from 'vue';

const video = ref<HTMLVideoElement>();
const isPlaying = ref(false);
const isErrored = ref(false);

onUnmounted(() => {
	video.value?.removeEventListener('play', playHandler);
	video.value?.removeEventListener('pause', pauseHandler);
});

function canPlayHandler(event: Event) {
	video.value = event.target as HTMLVideoElement;

	video.value.addEventListener('play', playHandler);

	video.value.addEventListener('pause', pauseHandler);
}

function ErrorHandler() {
	isErrored.value = true;
}

function playHandler() {
	isPlaying.value = true;
}

function pauseHandler() {
	isPlaying.value = false;
}

function clickHandler() {
	if (isPlaying.value)
		video.value?.pause();
	else
		video.value?.play();
}
</script>

<template>
	<div class="video" :class="{ 'video--playing': isPlaying }" @click="clickHandler">
		<slot :can-play-handler="canPlayHandler" :error-handler="ErrorHandler" />
		<slot v-if="!isErrored" name="btn">
			<button class="video__play btn btn--play btn--play-m btn--color-primary">
				<IconSVG class="video__play-icon btn__icon" :name="isPlaying ? 'pause' : 'play'" />
			</button>
		</slot>
		<slot v-else name="error">
			<span class="video__error">Ошибка загрузки видео</span>
		</slot>
	</div>
</template>

<style scoped lang="sass">
.video
	--v-button-border-radius: var(--radius-s)
	--v-button-color: var(--color-primary-600)
	--v-button-hover-color: var(--color-primary-700)
	--v-button-icon-color: var(--color-neutral-100)
	position: relative
	isolation: isolate
	overflow: hidden
	border-radius: var(--radius-m)
	cursor: pointer 

	@include media("max", "tablet")
		border-radius: var(--radius-s)

	&__play
		position: absolute
		top: 50%
		left: 50%
		z-index: var(--z-index-above)

		display: flex
		align-items: center
		justify-content: center

		border-radius: var(--v-button-border-radius)
		background-color: var(--v-button-color)

		color: var(--v-button-icon-color)

		transform: translate(-50%, -50%)

		transition: background-color .3s ease, opacity .3s ease

		cursor: pointer

		@include hover
			background-color: var(--v-button-hover-color)

		&-icon
			color: currentcolor

	&__error
		position: absolute
		top: 50%
		left: 50%
		z-index: var(--z-index-above)

		color: var(--color-white)
		font-size: var(--font-size-text-s)
		line-height: var(--line-height-s)

		text-align: center
		text-transform: uppercase

		transform: translate(-50%, -50%)

	&--playing
		@include hover
			& .video
				&__play
					opacity: 1

		& .video
			&__play
				opacity: 0

</style>
