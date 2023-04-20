//新创建项目名称
export type projectCreatedNameType = string | null

// key 使用枚举，可以重复使用，避免错误
export enum ProjectStoreStoreEnum {
    //新创建项目名称
    PROJECT_CREATED_NAME = 'projectCreatedName'
}

// 使用枚举获取key
export interface ProjectStoreStoreType {
    //新创建项目名称
    [ProjectStoreStoreEnum.PROJECT_CREATED_NAME]: projectCreatedNameType
}