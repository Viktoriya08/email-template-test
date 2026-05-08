import type { ReCaptchaInstance, ReCaptchaToken, SiteKey } from '@scripts/api/recaptcha/types';
import type { DocumentLinks } from '@scripts/api/contents/types';

export interface FormState {
	siteKey: SiteKey;
	tokenCaptcha: ReCaptchaToken;
	grecaptcha: ReCaptchaInstance | null;
	legalDocs: DocumentLinks;
};
