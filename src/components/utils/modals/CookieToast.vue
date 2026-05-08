<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { setCookie } from '@scripts/utils/cookie';
import { useDialog } from '@scripts/composables/useDialog';
import useBaseStore from '@scripts/store/base';

const { checkDialogSupport } = useDialog();
const { isCookieConfirmed } = useBaseStore();

const cookieToast = ref<HTMLDialogElement>();
const cookieShown = ref(false);

onMounted(() => {
	checkDialogSupport(cookieToast.value as HTMLDialogElement);
	checkCookie();
});

function checkCookie() {
	if (!isCookieConfirmed) {
		setTimeout(() => {
			showCookie();
		}, 2000);
	}
}

function showCookie() {
	cookieShown.value = true;
}

function hideCookie() {
	cookieShown.value = false;
}

function confirmCookie() {
	setCookie('cookieConfirmed', true, {
		path: '/',
		expires: new Date(Date.now() + 2592000000),
	});
	hideCookie();
}
</script>

<template>
	<teleport to="#modals-container">
		<transition name="cookie" :duration="450" appear>
			<dialog v-if="cookieShown" ref="cookieToast" :open="cookieShown" class="cookie-toast-wrapper wrapper">
				<div class="cookie-toast">
					<div class="cookie-toast__body">
						<span class="cookie-toast__text">Мы используем файлы cookie для хранения данных. Продолжая пользоваться сайтом, вы предоставляете <a class="link link--color" href="#"><span class="link__text">согласие на обработку этих файлов.</span></a></span>
						<button class="cookie-toast__btn btn btn--color-primary" @click="confirmCookie">
							<span class="btn__text">Ок, я согласен</span>
						</button>
					</div>
				</div>
			</dialog>
		</transition>
	</teleport>
</template>

<style scoped lang="sass">
.cookie-toast-wrapper
	position: fixed
	right: 0
	bottom: 40px
	left: 0
	z-index: var(--z-index-modal)

	display: flex
	justify-content: center

	border: none
	background: none

	pointer-events: none

	@include until-tablet
		bottom: 16px

	@include while-mob-xl
		width: 100%
		bottom: 0

.cookie-toast
	max-width: 937px
	width: 100%
	margin-left: auto
	padding: fluid(16,20) fluid(16,24)
	border-radius: var(--radius-s)

	background-color: var(--color-neutral-100)
	border: 2px solid var(--color-neutral-200)

	pointer-events: all

	&__body
		display: flex
		align-items: center
		justify-content: space-between
		gap: 16px

		@include while-mob-xl
			flex-direction: column

	&__text
		max-width: 616px
		font-size: var(--font-size-text-m)
		line-height: var(--line-height-text)

	&__btn
		flex-shrink: 0

		@include while-mob-xl
			width: 100%

.cookie-enter-active,
.cookie-leave-active
	transition: opacity .3s ease, transform .3s ease

.cookie-enter-from,
.cookie-leave-to
	opacity: 0
	transform: translateY(8px)
</style>
