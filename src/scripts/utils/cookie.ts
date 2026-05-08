import { isDate } from '@scripts/utils/helpers';

export interface CookieOptions {
	'path'?: string;
	'expires'?: Date;
	'domain'?: string;
	'secure'?: boolean;
	'samesite'?: 'strict' | 'lax';
	'max-age'?: number;
};

export function setCookie(name: string, value: string | number | boolean, options: CookieOptions = {}) {
	let cookieValue = value;

	if (isDate(value))
		cookieValue = value.toUTCString();

	if (typeof value === 'boolean')
		cookieValue = value ? 'Y' : 'N';

	const optionsString = Object.entries(options).reduce((acc, [key, value]) => {
		if (value === true)
			return `${acc}; ${key}`;

		if (isDate(value))
			return `${acc}; ${key}=${value.toUTCString()}`;

		return `${acc}; ${key}=${value}`;
	}, '');

	document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(cookieValue)}${optionsString}`;
}

export function deleteCookie(name: string) {
	setCookie(name, '', {
		'max-age': -1,
	});
}

export function getCookie(name: string) {
	const matches = document.cookie.match(new RegExp(
		`(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`,
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}
