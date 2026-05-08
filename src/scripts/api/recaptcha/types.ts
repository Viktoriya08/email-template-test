export type SiteKey = string;

export type ReCaptchaToken = string;

export interface CheckCaptchaPayload {
	[key: string]: unknown;
	tokenCaptcha: ReCaptchaToken;
}

export interface ReCaptchaExecuteOptions {
	action: string;
}

export interface ReCaptchaRenderOptions {
	sitekey: string;
	size: 'invisible';
}

export interface ReCaptchaInstance {
	ready: (cb: () => unknown) => void;
	execute: (siteKey: SiteKey, options?: ReCaptchaExecuteOptions) => Promise<string>;
	render: (id: string, options: ReCaptchaRenderOptions) => unknown;
}
