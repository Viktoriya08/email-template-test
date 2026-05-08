import type { ReCaptchaInstance } from './types';

declare global {
	interface Window {
		grecaptcha: ReCaptchaInstance;
		captchaOnLoad: () => void;
	}
}
