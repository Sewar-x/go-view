import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { ResultEnum } from "@/enums/httpEnum"
import { PageEnum, ErrorPageNameMap } from "@/enums/pageEnum"
import { StorageEnum } from '@/enums/storageEnum'
import { axiosPre } from '@/settings/httpSetting'
import { redirectErrorPage, routerTurnByName, isPreview } from '@/utils'
import { getToken } from '@/utils/auth'
import { fetchAllowList } from './axios.config'
import includes from 'lodash/includes'
import { Dialog } from '@/utils'
import type { RequestInstance } from '#/axios.d'


const axiosInstance = axios.create({
  baseURL: `${import.meta.env.PROD ? import.meta.env.VITE_PRO_PATH : ''}${axiosPre}`,
  timeout: ResultEnum.TIMEOUT,
}) as unknown as RequestInstance
const tokensStatus = [ ResultEnum.TOKEN_AUTHENTICATION_TIMEOUT, ResultEnum.TOKEN_INVALID,ResultEnum.TOKEN_REQUIRED]

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 白名单校验
    if (includes(fetchAllowList, config.url)) return config
    // 获取 token
    const token = getToken(StorageEnum.TOKEN_KEY)
    // 重新登录
    if (!token) {
      routerTurnByName(PageEnum.BASE_LOGIN_NAME)
      return config
    }
    //所有请求带上 token
    config.headers = {
      authorization: token
    }
    return config
  },
  (err: AxiosRequestConfig) => {
    Promise.reject(err)
  }
)

// 响应拦截器
axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => {
    // 预览页面错误不进行处理
    if (isPreview()) {
      return Promise.resolve(res.data)
    }
    const { code } = res.data as { code: number }

    if (code === undefined || code === null) return Promise.resolve(res)

    // 成功
    if (code === ResultEnum.SUCCESS) {
      return Promise.resolve(res.data)
    }
   
    // 登录过期
    if (tokensStatus.includes(code)) {
      Dialog({
        message: window['$t']('http.token_overdue_message')
      })
      routerTurnByName(PageEnum.BASE_LOGIN_NAME)
      return Promise.resolve(res.data)
    }

    // 固定错误码重定向
    if (ErrorPageNameMap.get(code)) {
      redirectErrorPage(code)
      return Promise.resolve(res.data)
    }

    // 提示错误
    window['$message'].error(window['$t']((res.data as any).msg))
    return Promise.resolve(res.data)
  },
  (err: AxiosResponse) => {
    const status =  err?.response?.status
    if (tokensStatus.includes(status)) {
      Dialog({
        message: window['$t']('http.token_overdue_message')
      })
      routerTurnByName(PageEnum.BASE_LOGIN_NAME)
    }
    return Promise.reject(err)
  }
)

export default axiosInstance
