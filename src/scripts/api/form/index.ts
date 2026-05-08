import BaseAPI from '@scripts/api';
import type { BaseResponse } from '@scripts/api/types';
import { objectToFormData } from '@scripts/utils/objectToFormData';
import type { AxiosResponse } from 'axios';
import type { AskFormPayload } from '@scripts/api/form/types';

class FormsApi extends BaseAPI {
	protected endpoint = 'form';

	sendAskForm(data: AskFormPayload): Promise<BaseResponse<null>> {
		const body = objectToFormData(data);
		return new Promise((resolve, reject) => {
			this.http
				.post<BaseResponse<null>>(`${this.endpoint}/sendQuestion/`, body)
				.then((response: AxiosResponse<BaseResponse<null>>) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}
}

export const formsApi = new FormsApi();
