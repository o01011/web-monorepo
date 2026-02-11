export type ResponseType<T> = {
  statusCode: number;
  statusMessage: string;
  timestamp: string;
  version: string;
  path: string;
  error: {
    message: string | unknown;
  } | null;
  data: T | null;
};
