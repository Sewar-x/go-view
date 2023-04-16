import { ref } from 'vue'
import { ChartEnum } from '@/enums/pageEnum'
import { fetchPathByName, routerTurnByPath, openNewWindow, previewPath } from '@/utils'
import { Chartype } from '../../../index.d'
import { Dialog } from '@/utils'
export const useModalDataInit = () => {
  const modalShow = ref<boolean>(false)
  const modalData = ref<Chartype | null>(null)

  // 关闭 modal
  const closeModal = () => {
    modalShow.value = false
    modalData.value = null
  }

  // 缩放处理
  const resizeHandle = (cardData: Chartype) => {
    if (!cardData) return
    modalShow.value = true
    modalData.value = cardData
  }

  // 编辑处理
  const editHandle = (cardData: Chartype) => {
    // 数据不存在 或 项目不是当前用户创建的，不能编辑
    if (!cardData || !cardData.created) return
    if (cardData.release) {
      Dialog({
        title: '温馨提示',
        message: '注意哦：您已经发布了该项目，编辑项目将导致您已发布的项目改变喔! 是否继续呢?',
        positiveText: '我就要改',
        negativeText: '不改了',
        isMaskClosable: false,
        onPositiveCallback: () => {
          toEditPage(cardData.id)
        }
      })
    } else {
      toEditPage(cardData.id)
    }
  }

  const toEditPage = (id: string | number) => {
    const path = fetchPathByName(ChartEnum.CHART_HOME_NAME, 'href')
    routerTurnByPath(path, [id], undefined, true)
  }

  // 预览处理
  const previewHandle = (cardData: Chartype) => {
    openNewWindow(previewPath(cardData.id))
  }

  return {
    modalData,
    modalShow,
    closeModal,
    resizeHandle,
    editHandle,
    previewHandle
  }
}
