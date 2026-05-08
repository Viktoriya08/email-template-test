import { defineAsyncComponent } from 'vue';

const transitions = {
	FadeTransition: defineAsyncComponent(
		() => import('@components/utils/transitions/FadeTransition.vue'),
	),
	ScaleTransition: defineAsyncComponent(
		() => import('@components/utils/transitions/ScaleTransition.vue'),
	),
};

export default transitions;
