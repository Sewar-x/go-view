import Cookies from 'js-cookie'
import { JSONStringify, JSONParse } from './utils'
/**
 * * 存储本地会话数据
 * @param k 键名
 * @param v 键值（无需stringiiy）
 * @returns RemovableRef
 */
export const setLocalStorage = <T>(k: string, v: T) => {
  try {
    window.localStorage.setItem(k, JSONStringify(v))
  } catch (error) {
    return false
  }
}

/**
 * * 获取本地会话数据
 * @param k 键名
 * @returns any
 */
export const getLocalStorage = (k: string) => {
  const item = window.localStorage.getItem(k)
  try {
    return item ? JSONParse(item) : item
  } catch (err) {
    return item
  }
}

/**
 * * 清除本地会话数据
 * @param name
 */
export const clearLocalStorage = (name: string) => {
  window.localStorage.removeItem(name)
}

/**
 * * 存储临时会话数据
 * @param k 键名
 * @param v 键值
 * @returns RemovableRef
 */
export const setSessionStorage = <T>(k: string, v: T) => {
  try {
    window.sessionStorage.setItem(k, JSONStringify(v))
  } catch (error) {
    return false
  }
}

/**
 * * 获取临时会话数据
 * @returns any
 */
export const getSessionStorage: (k: string) => any = (k: string) => {
  const item = window.sessionStorage.getItem(k)
  try {
    return item ? JSONParse(item) : item
  } catch (err) {
    return item
  }
}

/**
 * * 清除本地会话数据
 * @param name
 */
export const clearSessioStorage = (name: string) => {
  window.sessionStorage.removeItem(name)
}

/**
 * * 设置 cookie
 * @param name 键名
 * @param cvalue 键值
 * @param exdays 过期时间
 */
export const setCookie = Cookies.set

/**
 * * 获取 cookie
 * @param cname 键名
 * @returns string
 */
export const getCookie = Cookies.get
/**
 * * 清除 cookie 
 * @param name 键名
 * @returns string
 */
export const clearCookie = Cookies.remove
