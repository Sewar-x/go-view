import { httpErrorHandle } from '@/utils'
import { projectListApi, deleteProjectApi, createProjectApi, changeProjectReleaseApi } from '@/api/path'
import { Chartype } from '../../../index.d'
import { ResultEnum } from '@/enums/httpEnum'
import useListInit from '@/hooks/useListInit.hook'
// 数据初始化
export const useDataListInit = () => {
  const {
    loading,
    paginat,
    list,
    changeSize,
    changePage,
    getListHandle,
    createdHandle,
    deleteHandle
  } = useListInit({
    getApi: projectListApi,
    createApi: createProjectApi,
    deleteApi: deleteProjectApi
  })

  /**
   * 格式化列表数据
   * @param data 
   */
  const projectListFormat = (data: Array<any>) => {
    console.log("🚀 ~projectListFormat====", data)
    //回调处理返回数据格式
    list.value = data.map((e: any) => {
      const { id, projectName, state, createTime, indexImage, createUserId } = e
      return {
        id: id,
        title: projectName,
        createId: createUserId,
        time: createTime,
        image: indexImage,
        release: state !== -1,
        ...e
      }
    })
  };


  /**
   * 发布项目
   * @param cardData 
   * @param index 
   * @returns 
   */
  const releaseHandle = async (cardData: Chartype, index: number) => {
    const { id, release } = cardData
    const res = await changeProjectReleaseApi({
      id: id,
      // [-1未发布, 1发布]
      state: !release ? 1 : -1
    })
    if (res && res.code === ResultEnum.SUCCESS) {
      list.value = []
      // 获取列表数据
      getListHandle({}, projectListFormat)
      // 发布 -> 未发布
      if (release) {
        window['$message'].success(window['$t']('global.r_unpublish_success'))
        return
      }
      // 未发布 -> 发布
      window['$message'].success(window['$t']('global.r_publish_success'))
      return
    }
    httpErrorHandle()
  }



  return {
    loading,
    paginat,
    list,
    releaseHandle,
    changeSize,
    changePage,
    getListHandle,
    projectListFormat,
    createdHandle,
    deleteHandle,
  }
}
