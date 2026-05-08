<script lang="ts">
import BaseModal from '@components/utils/modals/BaseModal.vue';
import IconSVG from '@components/utils/templates/ui/IconSVG.vue';
import { defineComponent, provide } from 'vue';
import OneClickForm from '@components/forms/OneClickForm.vue';

export default defineComponent({
	name: 'OneClickModal',
	components: { OneClickForm, IconSVG, BaseModal },
	setup() {
		provide('modalId', 'one-click-modal');

		return {};
	},
});
</script>

<template>
	<BaseModal id="one-click-modal" v-slot="{ close }">
		<section class="modal">
			<button class="modal__close" @click="close">
				<IconSVG class="modal__close-icon" name="close" />
			</button>

			<div class="modal__wrapper">
				<h3 class="modal__title title title--h4">Купить в один клик</h3>
				<p class="modal__text">Оставьте заявку на товар. Наш менеджер перезвонит вам в ближайшее время для подтверждения заказа</p>

				<slot name="product" />

				<div class="modal__form">
					<OneClickForm />
				</div>
				<div class="modal__bottom">
					<div class="modal__contacts">
						<span class="modal__contacts-title">Свяжитесь с нами</span>
						<a class="modal__contacts-link link link--color" href="tel:+73517299300">8 351 729-93-00</a>
					</div>
				</div>
			</div>

		</section>
	</BaseModal>
</template>

<style scoped lang="sass">

</style>
