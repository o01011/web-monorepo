export interface IResponse<T> {
	statusCode: number;
	statusMessage: string;
	timestamp: string;
	version: string;
	path: string;
	error: string | null;
	data: T | null;
}
