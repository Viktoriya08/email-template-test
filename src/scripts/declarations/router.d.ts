import type { Middleware } from '@scripts/router/middleware/types';
import type { BaseLayouts } from '@scripts/router/types';

import 'vue-router';

export {};

declare module 'vue-router' {
	interface RouteMeta {
		name: string;
		layout?: BaseLayouts;
		middleware?: Array<Middleware>;
	}
}
