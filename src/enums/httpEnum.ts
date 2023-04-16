// 模块 Path 前缀分类
export enum ModuleTypeEnum {
  SYSTEM = 'sys',
  PROJECT = 'project',
}

// 请求结果集
export enum ResultEnum {
  DATA_SUCCESS = 0,
  SUCCESS = 200, //: 请求成功。
  SERVER_ERROR = 500,//：服务器内部错误。
  SERVER_FORBIDDEN = 403, //：拒绝访问，权限不足。
  NOT_FOUND = 404,//：找不到请求的资源。
  TIMEOUT = 60000,
  /**
   * 以下是一些常见的标准的 token 错误码：
   * 401 Unauthorized：没有提供 token 或者提供的 token 无效。
   * 403 Forbidden：提供的 token 是有效的，但用户没有足够的权限访问所请求的资源。
   * 419 Authentication Timeout（或 440 Login Timeout）：token 已过期或超时。\
   * 498 Invalid Token：提供的 token 无效。
   * 499 Token Required：没有提供 token。
   * 500 Internal Server Error：服务器在尝试验证 token 时遇到了内部错误。
   */
  TOKEN_UNAUTHORIZED = 401,//没有提供 token 或者提供的 token 无效。
  TOKEN_AUTHENTICATION_TIMEOUT = 419, //（或 440 Login Timeout）：token 已过期或超时
  TOKEN_INVALID = 498,//提供的 token 无效。
  Token_Required = 499,//没有提供 token。
}

// 数据相关
export enum RequestDataTypeEnum {
  // 静态数据
  STATIC = 0,
  // 请求数据
  AJAX = 1,
  // 数据池
  Pond = 2
}

// 请求主体类型
export enum RequestContentTypeEnum {
  // 普通请求
  DEFAULT = 0,
  // SQL请求
  SQL = 1
}

// 头部
export enum RequestHttpHeaderEnum {
  TOKEN = 'Token',
  COOKIE = 'Cookie'
}

// 请求方法
export enum RequestHttpEnum {
  GET = 'get',
  POST = 'post',
  PATCH = 'patch',
  PUT = 'put',
  DELETE = 'delete'
}

/**
 * @description: 请求间隔
 */
export enum RequestHttpIntervalEnum {
  // 秒
  SECOND = 'second',
  // 分
  MINUTE = 'minute',
  // 时
  HOUR = 'hour',
  // 天
  DAY = 'day'
}

/**
 * @description: 请求间隔名称
 */
export const SelectHttpTimeNameObj = {
  [RequestHttpIntervalEnum.SECOND]: '秒',
  [RequestHttpIntervalEnum.MINUTE]: '分',
  [RequestHttpIntervalEnum.HOUR]: '时',
  [RequestHttpIntervalEnum.DAY]: '天'
}

/**
 * @description: 请求头部类型
 */
export enum RequestBodyEnum {
  NONE = 'none',
  FORM_DATA = 'form-data',
  X_WWW_FORM_URLENCODED = 'x-www-form-urlencoded',
  JSON = 'json',
  XML = 'xml'
}

/**
 * @description: 请求头部类型数组
 */
export const RequestBodyEnumList = [
  RequestBodyEnum.NONE,
  RequestBodyEnum.FORM_DATA,
  RequestBodyEnum.X_WWW_FORM_URLENCODED,
  RequestBodyEnum.JSON,
  RequestBodyEnum.XML
]

/**
 * @description: 请求参数类型
 */
export enum RequestParamsTypeEnum {
  PARAMS = 'Params',
  BODY = 'Body',
  HEADER = 'Header',
}

/**
 * @description: 请求参数主体
 */
export type RequestParamsObjType = {
  [T: string]: string
}
export type RequestParams = {
  [RequestParamsTypeEnum.PARAMS]: RequestParamsObjType
  [RequestParamsTypeEnum.HEADER]: RequestParamsObjType
  [RequestParamsTypeEnum.BODY]: {
    [RequestBodyEnum.FORM_DATA]: RequestParamsObjType
    [RequestBodyEnum.X_WWW_FORM_URLENCODED]: RequestParamsObjType
    [RequestBodyEnum.JSON]: string
    [RequestBodyEnum.XML]: string
  }
}

// 常用的contentTyp类型
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // text
  TEXT = 'text/plain;charset=UTF-8',
  // xml
  XML = 'application/xml;charset=UTF-8',
  // application/x-www-form-urlencoded 一般配合qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  上传
  FORM_DATA = 'multipart/form-data;charset=UTF-8'
}
