// import type { MaskType } from '@scripts/consts/masks';
// import { decimalMask, integerMask, phoneMask } from '@scripts/consts/masks';
//
// export const getMask = {
// 	computed: {
// 		getMask() {
// 			return (maskName: MaskType) => {
// 				switch (maskName) {
// 					case 'phoneMask':
// 						return phoneMask;
// 					case 'decimalMask':
// 						return decimalMask;
// 					case 'integerMask':
// 						return integerMask;
// 					default:
// 						return null;
// 				}
// 			};
// 		},
// 	},
// };

import type { MaskType } from '@scripts/consts/masks';
import { codeMask, dataMask, decimalMask, integerMask, phoneMask, priceMask } from '@scripts/consts/masks';
import { computed } from 'vue';

export function useMask() {
	const getMask = computed(() => (maskName?: MaskType) => {
		switch (maskName) {
			case 'priceMask':
				return priceMask;
			case 'phoneMask':
				return phoneMask;
			case 'decimalMask':
				return decimalMask;
			case 'integerMask':
				return integerMask;
			case 'codeMask':
				return codeMask;
			case 'dataMask':
				return dataMask;
			default:
				return null;
		}
	});

	return {
		getMask,
	};
}
