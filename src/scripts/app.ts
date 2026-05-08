import RootComponent from '@components/RootComponent.vue';
import registerPlugins from '@scripts/plugins/app';
import type { Component } from 'vue';
import { createApp, defineAsyncComponent } from 'vue';

import { useViewportHandler } from '@scripts/composables/useViewportHandler';
import useBaseStore from '@scripts/store/base';
import useModalsStore from '@scripts/store/modals';
import { storeToRefs } from 'pinia';

const APP_DATA: Component = {
	setup() {
		const { openModal } = useModalsStore();
		const baseStore = useBaseStore();
		const { successMessage, errorMessage } = baseStore;
		const { isLoading } = storeToRefs(baseStore);
		const { isViewport, viewportUntil } = useViewportHandler();

		return { openModal, successMessage, errorMessage, isLoading, isViewport, viewportUntil };
	},
};

const APP = createApp(APP_DATA);

APP.component('RootComponent', RootComponent)

	// BASE COMPONENTS
	.component(
		'MenuModal',
		defineAsyncComponent(() => import('@components/utils/modals/MenuModal.vue')),
	)
	.component(
		'BaseLoader',
		defineAsyncComponent(() => import('@components/utils/ui/BaseLoader.vue')),
	)
	.component(
		'BaseTabs',
		defineAsyncComponent(() => import('@components/utils/ui/BaseTabs.vue')),
	)
	.component(
		'BorderTabs',
		defineAsyncComponent(() => import('@components/utils/ui/BorderTabs.vue')),
	)
	.component(
		'BasePagination',
		defineAsyncComponent(() => import('@components/utils/ui/BasePagination.vue')),
	)
	.component(
		'BaseTooltip',
		defineAsyncComponent(() => import('@components/utils/ui/BaseTooltip.vue')),
	)
	.component(
		'BaseAccordion',
		defineAsyncComponent(() => import('@components/utils/ui/BaseAccordion.vue')),
	)
	.component(
		'BaseModal',
		defineAsyncComponent(() => import('@components/utils/modals/BaseModal.vue')),
	)
	.component(
		'BaseGallery',
		defineAsyncComponent(() => import('@components/utils/ui/BaseGallery.vue')),
	)
	.component(
		'BaseDropdown',
		defineAsyncComponent(() => import('@components/utils/ui/BaseDropdown.vue')),
	)
	.component(
		'BaseVideo',
		defineAsyncComponent(() => import('@components/utils/ui/BaseVideo.vue')),
	)
	.component(
		'CookieToast',
		defineAsyncComponent(() => import('@components/utils/modals/CookieToast.vue')),
	)

	// Modals components
	.component(
		'InformReceiptModal',
		defineAsyncComponent(() => import('@components/utils/modals/InformReceiptModal.vue')),
	)
	.component(
		'OneClickModal',
		defineAsyncComponent(() => import('@components/utils/modals/OneClickModal.vue')),
	)

	// Form components
	.component(
		'InputText',
		defineAsyncComponent(() => import('@components/utils/form/InputText.vue')),
	)
	.component(
		'InputTextarea',
		defineAsyncComponent(() => import('@components/utils/form/InputTextarea.vue')),
	)
	.component(
		'InputCheckbox',
		defineAsyncComponent(() => import('@components/utils/form/InputCheckbox.vue')),
	)
	.component(
		'InputRadio',
		defineAsyncComponent(() => import('@components/utils/form/InputRadio.vue')),
	)
	.component(
		'InputSwitch',
		defineAsyncComponent(() => import('@components/utils/form/InputSwitch.vue')),
	)
	.component(
		'InputSearch',
		defineAsyncComponent(() => import('@components/utils/form/InputSearch.vue')),
	)
	.component(
		'InputDate',
		defineAsyncComponent(() => import('@components/utils/form/InputDate.vue')),
	)
	.component(
		'InputFile',
		defineAsyncComponent(() => import('@components/utils/form/InputFile.vue')),
	)
	.component(
		'InputRange',
		defineAsyncComponent(() => import('@components/utils/form/InputRange.vue')),
	)

	// Select components
	.component(
		'ExampleSelect',
		defineAsyncComponent(() => import('@components/selects/ExampleSelect.vue')),
	)
	.component(
		'DefaultSelect',
		defineAsyncComponent(() => import('@components/selects/DefaultSelect.vue')),
	)

	// Slider components
	.component(
		'ContentSlider',
		defineAsyncComponent(() => import('@components/sliders/ContentSlider.vue')),
	)
	.component(
		'PartnersSlider',
		defineAsyncComponent(() => import('@components/sliders/PartnersSlider.vue')),
	)
	.component(
		'MainBannerSlider',
		defineAsyncComponent(() => import('@components/sliders/MainBannerSlider.vue')),
	)
	.component(
		'GallerySlider',
		defineAsyncComponent(() => import('@components/sliders/GallerySlider.vue')),
	)
	.component(
		'AdvantagesSlider',
		defineAsyncComponent(() => import('@components/sliders/AdvantagesSlider.vue')),
	)
	.component(
		'MediaGallerySlider',
		defineAsyncComponent(() => import('@components/sliders/MediaGallerySlider.vue')),
	)
	.component(
		'SeeAlsoSlider',
		defineAsyncComponent(() => import('@components/sliders/SeeAlsoSlider.vue')),
	)
	.component(
		'ProductsSlider',
		defineAsyncComponent(() => import('@components/sliders/ProductsSlider.vue')),
	)
	.component(
		'ProductGallery',
		defineAsyncComponent(() => import('@components/sliders/ProductGallery.vue')),
	)

	// Forms components
	.component(
		'FormExample',
		defineAsyncComponent(() => import('@components/forms/FormExample.vue')),
	)
	.component(
		'SearchHeaderForm',
		defineAsyncComponent(() => import('@components/forms/SearchHeaderForm.vue')),
	)
	.component(
		'ModelsSearchForm',
		defineAsyncComponent(() => import('@components/forms/ModelsSearchForm.vue')),
	)
	.component(
		'SpacePartsForm',
		defineAsyncComponent(() => import('@components/forms/SpacePartsForm.vue')),
	)
	.component(
		'CallbackForm',
		defineAsyncComponent(() => import('@components/forms/CallbackForm.vue')),
	)
	.component(
		'TeamForm',
		defineAsyncComponent(() => import('@components/forms/TeamForm.vue')),
	)
	.component(
		'QuestionsForm',
		defineAsyncComponent(() => import('@components/forms/QuestionsForm.vue')),
	)
	.component(
		'EnterPhoneForm',
		defineAsyncComponent(() => import('@components/forms/EnterPhoneForm.vue')),
	)
	.component(
		'EnterEmailForm',
		defineAsyncComponent(() => import('@components/forms/EnterEmailForm.vue')),
	)
	.component(
		'RecoveryPhoneForm',
		defineAsyncComponent(() => import('@components/forms/RecoveryPhoneForm.vue')),
	)
	.component(
		'RecoveryEmailForm',
		defineAsyncComponent(() => import('@components/forms/RecoveryEmailForm.vue')),
	)
	.component(
		'NoEnterForm',
		defineAsyncComponent(() => import('@components/forms/NoEnterForm.vue')),
	)
	.component(
		'ProductForm',
		defineAsyncComponent(() => import('@components/forms/ProductForm.vue')),
	)
	.component(
		'RequestManagerForm',
		defineAsyncComponent(() => import('@components/forms/RequestManagerForm.vue')),
	)

	// Templates components
	.component(
		'TabsTemplate',
		defineAsyncComponent(() => import('@components/utils/templates/ui/TabsTemplate.vue')),
	)
	.component(
		'TextClamp',
		defineAsyncComponent(() => import('@components/utils/templates/ui/TextClamp.vue')),
	)

	// Other components
	.component(
		'UiPreview',
		defineAsyncComponent(() => import('@components/utils/UiPreview.vue')),
	)
	.component(
		'ShareLink',
		defineAsyncComponent(() => import('@components/other/ShareLink.vue')),
	)
	.component(
		'ContactsMap',
		defineAsyncComponent(() => import('@components/other/ContactsMap.vue')),
	)
	.component(
		'InputsPeriod',
		defineAsyncComponent(() => import('@components/other/InputsPeriod.vue')),
	)

	// 	Catalog
	.component(
		'BrandsTabs',
		defineAsyncComponent(() => import('@components/catalog/BrandsTabs.vue')),
	)
	.component(
		'CategoriesToggle',
		defineAsyncComponent(() => import('@components/catalog/CategoriesToggle.vue')),
	)
	.component(
		'BrandsSearch',
		defineAsyncComponent(() => import('@components/catalog/BrandsSearch.vue')),
	)
	.component(
		'Quantity',
		defineAsyncComponent(() => import('@components/catalog/Quantity.vue')),
	)
	.component(
		'BrandAccordion',
		defineAsyncComponent(() => import('@components/catalog/BrandAccordion.vue')),
	)
	.component(
		'CatalogFilters',
		defineAsyncComponent(() => import('@components/catalog/CatalogFilters.vue')),
	)
	.component(
		'CatalogFiltersMob',
		defineAsyncComponent(() => import('@components/catalog/CatalogFiltersMob.vue')),
	)

	// Personal 
	.component(
		'PersonalDataForm',
		defineAsyncComponent(() => import('@components/personal/details/PersonalDataForm.vue')),
	)
	.component(
		'DeliveryAddressForm',
		defineAsyncComponent(() => import('@components/personal/details/DeliveryAddressForm.vue')),
	)
	.component(
		'ChangePasswordForm',
		defineAsyncComponent(() => import('@components/personal/details/ChangePasswordForm.vue')),
	)
	.component(
		'MyOrganizationsForm',
		defineAsyncComponent(() => import('@components/personal/details/MyOrganizationsForm.vue')),
	)
	.component(
		'OrderAccordion',
		defineAsyncComponent(() => import('@components/personal/orders/OrderAccordion.vue')),
	)
	.component(
		'BigPagination',
		defineAsyncComponent(() => import('@components/personal/BigPagination.vue')),
	);

registerPlugins(APP);

export default APP;
