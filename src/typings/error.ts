export interface ApiError {
  status: string;
  status_code: number;
  error_message: string;
}

export interface RtkError {
  data: ApiError;
  status: number;
}
