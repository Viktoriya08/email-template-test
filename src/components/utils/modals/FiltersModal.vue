<script lang="ts">
import MenuModal from '@components/utils/modals/MenuModal.vue';
import IconSVG from '@components/utils/templates/ui/IconSVG.vue';
import { defineComponent, provide } from 'vue';
import CatalogFiltersMob from '@components/catalog/CatalogFiltersMob.vue';

export default defineComponent({
	name: 'FiltersModal',
	components: { CatalogFiltersMob, IconSVG, MenuModal },
	setup() {
		provide('modalId', 'filters-modal');

		return {};
	},
});
</script>

<template>
	<MenuModal id="filters-modal" v-slot="{ close }">
		<section class="modal modal--filters">
			<div class="filters-modal">
				<div class="filters-modal__top">
					<button class="filters-modal__close btn btn--transparent" @click="close">
						<span class="btn__text">Закрыть</span>
						<IconSVG class="btn__icon" name="close" />
					</button>
				</div>
			</div>

			<CatalogFiltersMob />

		</section>
	</MenuModal>
</template>

<style scoped lang="sass">

</style>
