import type { MaskOptions } from 'maska';

type MaskType = 'priceMask' | 'phoneMask' | 'decimalMask' | 'integerMask' | 'codeMask' | 'dataMask';

const priceMask: MaskOptions = {
	mask: '0',
	tokens: {
		0: {
			pattern: /\d/,
			multiple: true,
		},
	},
	// preProcess: (val: string) => val.replace(/[₽\s]/g, ''),
	// postProcess: (val: string) => {
	// 	if (!val)
	// 		return '';
	//
	// 	const valNum = Number.parseFloat(val);
	//
	// 	return valNum.toLocaleString('ru-RU', {
	// 		style: 'currency',
	// 		currency: 'RUB',
	// 		minimumFractionDigits: 0,
	// 	});
	// },
};

const phoneMask: MaskOptions = {
	mask: '+7 (###) ###-##-##',
	eager: true,
};

const codeMask: MaskOptions = {
	mask: '######',
	eager: true,
};

const dataMask: MaskOptions = {
	mask: '##.##.####',
	eager: true,
};

const decimalMask: MaskOptions = {
	mask: '0.9',
	eager: true,
	tokens: {
		0: {
			pattern: /\d/,
			multiple: true,
		},
		9: {
			pattern: /\d/,
			optional: true,
			multiple: true,
		},
	},
};

const integerMask: MaskOptions = {
	mask: '0',
	tokens: {
		0: {
			pattern: /\d/,
			multiple: true,
		},
	},
};

export { priceMask, phoneMask, decimalMask, integerMask, codeMask, dataMask };
export type { MaskType };

