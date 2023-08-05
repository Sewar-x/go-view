import { http } from '@/api/http'
import { httpErrorHandle } from '@/utils'
import { RequestHttpEnum, ModuleTypeEnum } from '@/enums/httpEnum'
import { LoginResult } from './system'
// * 登录
export const loginApi = async (data: object) => {
  try {
    const res =  await http(RequestHttpEnum.POST)<LoginResult>(`${ModuleTypeEnum.SYSTEM}/login`, data)
    return res
  } catch (err) {
    httpErrorHandle(err?.response?.data?.msg)
  }
}

// * 登出
export const logoutApi = async () => {
  try {
    return await http(RequestHttpEnum.GET)(`${ModuleTypeEnum.SYSTEM}/logout`)
  } catch (err) {
    httpErrorHandle()
  }
}

// * 获取 oss 上传接口
export const ossUrlApi = async (data: object) => {
  try {
    return await http(RequestHttpEnum.GET)<{
      /**
       * bucket 地址
       */
      bucketURL?: string
    }>(`${ModuleTypeEnum.SYSTEM}/getOssInfo`, data)
  } catch (err) {
    httpErrorHandle()
  }
}
