import { defineStore } from 'pinia'
import { SystemStoreType, UserInfoType, FetchInfoType } from './systemStore.d'
import { setLocalStorage, getLocalStorage } from '@/utils'
import { StorageEnum } from '@/enums/storageEnum'
import {
  SystemStoreUserInfoEnum,
  SystemStoreEnum,
} from "@/store/modules/systemStore/systemStore.d";
import { setToken } from "@/utils/auth.ts"
const { GO_SYSTEM_STORE } = StorageEnum

const storageSystem: SystemStoreType = getLocalStorage(GO_SYSTEM_STORE)

// 系统数据记录
export const useSystemStore = defineStore({
  id: 'useSystemStore',
  state: (): SystemStoreType => storageSystem || {
    //用户信息
    userInfo: {
      userId: undefined,
      userName: undefined,
      userToken: undefined,
      nickName: undefined
    },
    // 接口信息
    fetchInfo: {
      OSSUrl: undefined
    }
  },
  getters: {
    getUserInfo(): UserInfoType {
      return this.userInfo
    },
    getFetchInfo(): FetchInfoType {
      return this.fetchInfo
    },
  },
  actions: {
    setItem<T extends keyof SystemStoreType, K extends SystemStoreType[T]>(key: T, value: K): void {
      this.$patch(state => {
        state[key] = value
      });
      setLocalStorage(GO_SYSTEM_STORE, this.$state)
      setToken(undefined, value?.userToken)
    }
  }
})