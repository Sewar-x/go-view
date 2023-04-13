import { ref, reactive } from 'vue'
import { goDialog, httpErrorHandle } from '@/utils'
import { projectListApi, deleteProjectApi, changeProjectReleaseApi } from '@/api/path'
import { Chartype, ChartList } from '../../../index.d'
import { DialogEnum } from '@/enums/pluginEnum'
import { ResultEnum } from '@/enums/httpEnum'
import { ListConfigEnum } from '@/enums/listEnum'
import useListInit from '@/hooks/useListInit.hook'
// 数据初始化
export const useDataListInit = () => {
  const {
    loading,
    paginat,
    list,
    fetchList,
    changeSize,
    changePage,
    deleteHandle
  } = useListInit({
    getApi: projectListApi,
    deleteApi: deleteProjectApi
  })

  // 获取列表数据
  fetchList({}, (data) => {
    //回调处理返回数据格式
    list.value = data.map((e: any) => {
      const { id, projectName, state, createTime, indexImage, createUserId } = e
      return {
        id: id,
        title: projectName,
        createId: createUserId,
        time: createTime,
        image: indexImage,
        release: state !== -1
      }
    })
  })

  // 发布处理
  const releaseHandle = async (cardData: Chartype, index: number) => {
    const { id, release } = cardData
    const res = await changeProjectReleaseApi({
      id: id,
      // [-1未发布, 1发布]
      state: !release ? 1 : -1
    })
    if (res && res.code === ResultEnum.SUCCESS) {
      list.value = []
      fetchList()
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
    fetchList,
    releaseHandle,
    changeSize,
    changePage,
    deleteHandle
  }
}
