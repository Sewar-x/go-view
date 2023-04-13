import type { AxiosRequestConfig, AxiosResponse,Axios } from "axios";
export type ErrorMessageMode = "none" | "modal" | "message" | undefined;
export type SuccessMessageMode = "none" | "message";

export interface RequestOptions {
  // Format request parameter time
  formatDate?: boolean;
  // Whether to process the request result
  isTransformResponse?: boolean;
  // Whether to return native response headers
  // For example: use this attribute when you need to get the response headers
  isReturnNativeResponse?: boolean;
  // Error message prompt type
  errorMessageMode?: ErrorMessageMode;
  // Successful request message prompt
  successMessageMode?: SuccessMessageMode;
  // Whether to add a timestamp
  joinTime?: boolean;
  ignoreCancelToken?: boolean;
  // Whether to send token in header
  withToken?: boolean;
  // 请求重试机制
  retryRequest?: RetryRequest;
}


export interface ExpandRequestOptions extends AxiosRequestConfig {
  requestOptions?: RequestOptions;
}

export interface MyResponseType<T> {
  code: ResultEnum
  data: T
  message: string
}


export interface RequestInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): Promise<MyResponseType<T>>
}