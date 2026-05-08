import type { App } from 'vue';

// Store
import { createPinia } from 'pinia';

// Router
// import router from '@scripts/router';

// Plugins
import { setupCalendar } from 'v-calendar';

import Toast from 'vue-toastification';
import '@styles/libs/toast.sass';

// Directives
import useDirectives from '@scripts/directives';
import toastOptions from '@scripts/consts/toastOptions';

export default function registerPlugins(AppInstance: App) {
	AppInstance.use(createPinia())
		.use(Toast, toastOptions)
		.use(setupCalendar, {});
	useDirectives(AppInstance);
}
