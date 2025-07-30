export interface IResponse<T> {
	statusCode: number;
	statusMessage: string;
	timestamp: string;
	version: string;
	path: string;
	error: {
		name: string;
		message: string;
		details?: string | null;
	} | null;
	data: T | null;
}
