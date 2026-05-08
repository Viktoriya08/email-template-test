export interface BaseResponse<T> {
	data: T;
	error: null;
	success: boolean;
}

export interface ErrorResponse {
	data: null;
	error: {
		code: number;
		message: string;
	};
	success: boolean;
}
