<script setup lang="ts">
import { ref } from 'vue';
import BaseTabs from '@components/utils/ui/BaseTabs.vue';
import BaseLoader from '@components/utils/ui/BaseLoader.vue';
import transitions from '@scripts/consts/transitions';
import getBaseStore from '@scripts/composables/store/getBaseStore';
import { DatePicker } from 'v-calendar';


// COMPONENTS
const FadeTransition = transitions.FadeTransition;

// STORE
const { showErrorToast, showSuccessToast, showWarningToast, showInfoToast } = getBaseStore();

// DATA
const firstLoaderShown = ref<boolean>(false);
const secondLoaderShown = ref<boolean>(false);

// METHODS
function loaderTestShow(prop: 'firstLoaderShown' | 'secondLoaderShown') {
	if (prop === 'firstLoaderShown')
		firstLoaderShown.value = true;
	else
		secondLoaderShown.value = true;

	setTimeout(() => {
		if (prop === 'firstLoaderShown')
			firstLoaderShown.value = false;
		else
			secondLoaderShown.value = false;
	}, 3000);
}
</script>

<template>
	<div class="pv-blocks pv-blocks--list">
		<slot />

		<div class="pv-block">
			<h3 class="pv-block__title">
				Tabs
			</h3>
			<div class="pv-block__preview">
				<div class="pv-block__items">
					<div class="pv-block__item">
						<BaseTabs :tabs="[{ label: 'Tab 1 Disabled', value: 0, disabled: true }, { label: 'Tab 2', value: 1 }, { label: 'Tab 3', value: 2 }]" />
					</div>
					<div class="pv-block__item">
						<BaseTabs :tabs="['Tab 1', 'Tab 2', 'Tab 3']" color-scheme="light" />
					</div>
					<div class="pv-block__item">
						<BaseTabs :tabs="['Tab 1', 'Tab 2', 'Tab 3']" color-scheme="light" :is-hover="true" />
					</div>
				</div>
			</div>
		</div>

		<div class="pv-block">
			<h3 class="pv-block__title">
				Loaders
			</h3>
			<div class="pv-block__preview">
				<div class="pv-block__items pv-block__items--row">
					<div class="pv-block__item">
						<button class="btn btn--color-primary" @click="loaderTestShow('firstLoaderShown')">
							<span class="btn__text">Show Default Loader</span>
						</button>
						<FadeTransition>
							<BaseLoader v-if="firstLoaderShown" color-scheme="dark" />
						</FadeTransition>
					</div>
					<div class="pv-block__item">
						<button class="btn btn--border-primary" @click="loaderTestShow('secondLoaderShown')">
							<span class="btn__text">Show Additional Loader</span>
						</button>
						<FadeTransition>
							<BaseLoader v-if="secondLoaderShown" color-scheme="dark" />
						</FadeTransition>
					</div>
				</div>
			</div>
		</div>

		<div class="pv-block">
			<h3 class="pv-block__title">
				Toasts
			</h3>
			<div class="pv-block__preview">
				<div class="pv-block__items pv-block__items--row">
					<div class="pv-block__item">
						<button class="btn btn--color-primary" @click="showSuccessToast('All good!')">
							<span class="btn__text">Success</span>
						</button>
					</div>
					<div class="pv-block__item">
						<button class="btn btn--border-primary" @click="showErrorToast('Something wrong')">
							<span class="btn__text">Error</span>
						</button>
					</div>
					<div class="pv-block__item">
						<button class="btn btn--border-primary" @click="showWarningToast('Be careful')">
							<span class="btn__text">Warning</span>
						</button>
					</div>
					<div class="pv-block__item">
						<button class="btn btn--border-primary" @click="showInfoToast('Some info')">
							<span class="btn__text">Info</span>
						</button>
					</div>
				</div>
			</div>
		</div>

		<div class="pv-block">
			<h3 class="pv-block__title">
				Calendar
			</h3>
			<div class="pv-block__preview">
				<div class="pv-block__items pv-block__items--row">
					<div class="pv-block__item">
						<DatePicker></DatePicker>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="sass">

</style>
