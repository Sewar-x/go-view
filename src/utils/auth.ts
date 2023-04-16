
import { createIframe, destroyIframe } from '@/utils/utils'
import { StorageEnum } from '@/enums/storageEnum'
import { SystemEnum } from '@/enums/systemEnum'
import { setCookie, getCookie, clearCookie } from '@/utils/storage'

// oa 中单点登录使用 token 可能存在两个 key 值，需要循环使用两个 key 获取 cookies 中的 token
// 旧 OA 使用 SIAMJWT, 新 OA 使用 SIAMTGT 和 LtpaToken
export const OATokenKeys = ['SIAMTGT', 'SIAMJWT']
// OA 系统中会使用'SIAMTGT', 'SIAMJWT' 换取该 token 进行登录, 在内嵌 oa 页面中必须使用 LtpaToken  进行跳转登录 oa
export const OALoginToken = 'LtpaToken'
/**
 * 设置 Token 信息
 * @param {*} param
 */
export const setTokenInfo = (token: string, ticketName: string, ticketValue: string): void => {
    setCookie(StorageEnum.TOKEN_KEY, token)
    setOAToken(ticketName, ticketValue)
}

/**
 * 移除 Token 信息
 */
export const removeAuthToken = () => {
    removeToken()
    removeOAToken()
}

/**
 * 获取 Token
 * @param {*} key
 * @returns
 */
export const getToken = (key: string | undefined): string | undefined => {
    return getCookie(key || StorageEnum.TOKEN_KEY)
}

/**
 * 设置 Token
 * @param {*} token
 * @returns
 */
export const setToken = (token: string) => {
    return setCookie(StorageEnum.TOKEN_KEY, token)
}

/**
 * 移除 Token
 * @returns
 */
export const removeToken = () => {
    return clearCookie(StorageEnum.TOKEN_KEY)
}

interface OATokenType {
    key: string | null,
    oaToken: string | null,
}
/**
 * 获取 Token, 由于 OA 使用三个 token，因此需要遍历获取 token
 * @returns
 */
export const getOAToken = (): OATokenType => {
    let key = null
    let oaToken = null

    for (const keys of OATokenKeys) {
        oaToken = getCookie(keys, {
            domain: '.tcl.com'
        })
        if (oaToken) {
            key = keys
            break
        }
    }

    return {
        key,
        oaToken
    }
}

/**
 * 设置 OA token
 * @param {*} StorageEnum.TOKEN_KEY
 * @param {*} token
 * @returns
 */
export const setOAToken = (key: string, token: string) => {
    return setCookie(key, token, {
        expires: new Date(new Date().getTime() + 1 * 60 * 60 * 1000),
        domain: '.tcl.com'
    })
}

/**
 * 清空所有 oa token
 */
export const removeOAToken = () => {
    OATokenKeys.forEach(key => clearCookie(key, {
        domain: '.tcl.com'
    }))
}

/**
 * 获取新 oa token:LtpaToken, 通过创建 iframe,重定向获取 oa 登录 token
 */
export const getOALoginToken = () => {
    // 存在 token 或 开发环境下不获取
    const { oaToken } = getOAToken()
    if (getToken(OALoginToken) || !oaToken || (process.env.NODE_ENV === 'development')) return
    const dom = document.body
    const iframe = createIframe(
        dom,
        SystemEnum.OA_URL,
        () => setTimeout(() => {
            destroyIframe(iframe)
        }, 500),
        () => destroyIframe(iframe),
        true,

    )
}
