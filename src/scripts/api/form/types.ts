import type { ReCaptchaToken } from '@scripts/api/recaptcha/types';

interface FormsBasePayload {
	[key: string]: unknown;
	page: string;
	tokenCaptcha: ReCaptchaToken;
}
export interface AskFormPayload extends FormsBasePayload {
	name: string;
	email: string;
	phone: string;
	desc: string;
}
