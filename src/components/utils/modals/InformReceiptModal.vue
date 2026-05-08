<script lang="ts">
import BaseModal from '@components/utils/modals/BaseModal.vue';
import IconSVG from '@components/utils/templates/ui/IconSVG.vue';
import { defineComponent, provide } from 'vue';
import InformReceiptForm from '@components/forms/InformReceiptForm.vue';

export default defineComponent({
	name: 'InformReceiptModal',
	components: { InformReceiptForm, IconSVG, BaseModal },
	setup() {
		provide('modalId', 'inform-receipt-modal');

		return {};
	},
});
</script>

<template>
	<BaseModal id="inform-receipt-modal" v-slot="{ close }">
		<section class="modal">
			<button class="modal__close" @click="close">
				<IconSVG class="modal__close-icon" name="close" />
			</button>

			<div class="modal__wrapper">
				<h3 class="modal__title title title--h4">Сообщить о поступлении</h3>
				<p class="modal__text">Оставьте заявку на товар. Мы пришлем вам смс, когда товар появится в наличии</p>
				<div class="modal__form">
					<InformReceiptForm />
				</div>
			</div>

		</section>
	</BaseModal>
</template>

<style scoped lang="sass">

</style>
