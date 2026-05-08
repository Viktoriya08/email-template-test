import { defineStore } from 'pinia';
import useBaseStore from '@scripts/store/base';
import { formsApi } from '@scripts/api/form';
import type { AxiosError } from 'axios';
import type { ErrorResponse } from '@scripts/api/types';
import type {
	AskFormPayload,
} from '@scripts/api/form/types';
import { recaptchaApi } from '@scripts/api/recaptcha';
import type { FormState } from '@scripts/store/form/types';
import type { ReCaptchaInstance, ReCaptchaToken, SiteKey } from '@scripts/api/recaptcha/types';
import type { DocumentLinks } from '@scripts/api/contents/types';
import { contentsApi } from '@scripts/api/contents';

const useFormStore = defineStore('form', {
	state: (): FormState => ({
		siteKey: '',
		tokenCaptcha: '',
		grecaptcha: null,
		legalDocs: {
			privacyPolicy: '',
			personalData: '',
		},
	}),
	actions: {
		requestLegalDocs(): Promise<DocumentLinks> {
			const useMainStore = useBaseStore();
			useMainStore.startLoading('requestLegalDocs');

			return new Promise((resolve, reject) => {
				contentsApi
					.readDocuments()
					.then((response) => {
						this.legalDocs = response.data;
						resolve(response.data);
					})
					.catch((error: AxiosError<ErrorResponse>) => {
						reject(useMainStore.getError(error));
					})
					.finally(() => {
						useMainStore.stopLoading('requestLegalDocs');
					});
			});
		},

		requestSiteKey(): Promise<SiteKey> {
			const baseStore = useBaseStore();
			baseStore.startLoading('requestSiteKey');

			return new Promise((resolve, reject) => {
				recaptchaApi
					.readSiteKey()
					.then((response) => {
						this.siteKey = response.data;
						resolve(response.data);
					})
					.catch((error: AxiosError<ErrorResponse>) => {
						reject(baseStore.getError(error));
					})
					.finally(() => {
						baseStore.stopLoading('requestSiteKey');
					});
			});
		},

		requestCheckCaptcha(): Promise<true> {
			const baseStore = useBaseStore();
			baseStore.startLoading('requestCheckCaptcha');

			return new Promise((resolve, reject) => {
				recaptchaApi
					.checkToken({
						tokenCaptcha: this.tokenCaptcha,
					})
					.then((response) => {
						resolve(response.data);
					})
					.catch((error: AxiosError<ErrorResponse>) => {
						reject(baseStore.getError(error));
					})
					.finally(() => {
						baseStore.stopLoading('requestCheckCaptcha');
					});
			});
		},

		async getReCaptcha(): Promise<ReCaptchaToken> {
			const baseStore = useBaseStore();
			baseStore.startLoading('getReCaptcha');

			let captcha = this.tokenCaptcha;

			if (!captcha) {
				if (!window.grecaptcha) {
					if (!this.siteKey)
						await this.requestSiteKey();

					await recaptchaApi.initRecaptcha(this.siteKey).then((response) => {
						this.grecaptcha = response;
					});
				}

				await (this.grecaptcha as ReCaptchaInstance).execute(this.siteKey).then((token: string) => {
					this.tokenCaptcha = token;
					captcha = token;
				});
			}

			baseStore.stopLoading('getReCaptcha');
			return captcha;
		},

		async requestAskForm(
			data: Omit<AskFormPayload, 'tokenCaptcha' | 'page'>,
		): Promise<null> {
			const baseStore = useBaseStore();
			baseStore.startLoading('requestAskForm');

			const payload: AskFormPayload = {
				page: window.location.href,
				tokenCaptcha: await this.getReCaptcha(),
				...data,
			} as AskFormPayload;

			return new Promise((resolve, reject) => {
				formsApi
					.sendAskForm(payload)
					.then((response) => {
						resolve(response.data);
					})
					.catch((error: AxiosError<ErrorResponse>) => {
						reject(baseStore.getError(error));
					})
					.finally(() => {
						baseStore.stopLoading('requestAskForm');
					});
			});
		},
	},
});

export default useFormStore;
