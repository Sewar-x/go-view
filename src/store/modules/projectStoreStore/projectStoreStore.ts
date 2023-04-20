import { defineStore } from 'pinia'
import { ProjectStoreStoreType, projectCreatedNameType } from './projectStoreStore.d'

export const useProjectStoreStore = defineStore({
  id: 'useProjectStoreStore',
  state: (): ProjectStoreStoreType => ({
    //新创建项目名称
    projectCreatedName: null
  }),
  getters: {
    //新创建项目名称
    getProjectCreatedName(): projectCreatedNameType {
      return this.projectCreatedName
    }
  },
  actions: {
    //新创建项目名称
    setProjectCreatedName(value: projectCreatedNameType) {
      this.projectCreatedName = value
    }
  }
})