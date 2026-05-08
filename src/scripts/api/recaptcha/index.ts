import BaseAPI from '@scripts/api';
import { objectToFormData } from '@scripts/utils/objectToFormData';
import type { AxiosResponse } from 'axios';
import type { BaseResponse } from '@scripts/api/types';
import type { CheckCaptchaPayload, ReCaptchaInstance, SiteKey } from '@scripts/api/recaptcha/types';

class RecaptchaApi extends BaseAPI {
	protected endpoint = 'recaptcha';

	readSiteKey(): Promise<BaseResponse<SiteKey>> {
		return new Promise((resolve, reject) => {
			this.http
				.get<BaseResponse<SiteKey>>(`${this.endpoint}/getSiteKey/`)
				.then((response: AxiosResponse<BaseResponse<SiteKey>>) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}

	initRecaptcha(siteKey: SiteKey): Promise<ReCaptchaInstance> {
		return new Promise((resolve, reject) => {
			const script = document.createElement('script');
			script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
			script.async = true;
			script.defer = true;
			script.onerror = () => {
				reject(new Error('Error load recaptcha script'));
			};
			script.onload = () => {
				window.grecaptcha.ready(() => {
					resolve(window.grecaptcha);
				});
			};
			document.head.appendChild(script);
		});
	}

	checkToken(data: CheckCaptchaPayload): Promise<BaseResponse<true>> {
		const body = objectToFormData(data);

		return new Promise((resolve, reject) => {
			this.http
				.post<BaseResponse<true>>(`${this.endpoint}/check/`, body)
				.then((response: AxiosResponse<BaseResponse<true>>) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}
}

export const recaptchaApi = new RecaptchaApi();
