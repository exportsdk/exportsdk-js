export interface ResponseErrorData {
  message: string;
  status: number;
}

export class ResponseError extends Error {
  readonly status: number;

  constructor(data: ResponseErrorData) {
    super(data.message);
    this.name = 'ResponseError';
    this.status = data.status;
  }
}
