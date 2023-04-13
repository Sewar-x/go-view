/**
 * * 请求失败统一处理
 */
export const httpErrorHandle = (message: String = '') => {
  window['$message'].error(message || window['$t']('http.error_message'))
}