
import { ref, reactive } from 'vue'
import { ListConfigEnum } from '@/enums/listEnum'
import { DialogEnum } from '@/enums/pluginEnum'
import { ResultEnum } from '@/enums/httpEnum'
import { Dialog, httpErrorHandle } from '@/utils'

//列表返回数据对象类型
type ListItemType = {
    [key: string]: any;
}

// hook 参数类型
type ListInitType = {
    getApi: (params: ListItemType) => any, // 获取列表接口
    deleteApi: (params: ListItemType) => any, // 删除列表接口
}

// 接口参数类型
type ListParamsInitType = {
    getApiParams?: ListItemType, // 获取列表接口参数
    deleteApiParams?: ListItemType // 删除列表接口参数
}

/**
 * 列表相关 hook 
 */
export default (apis: ListInitType) => {
    const loading = ref(true)

    const paginat = reactive({
        // 当前页数
        page: ListConfigEnum.PAGE,
        // 每页值
        limit: ListConfigEnum.LIMIT,
        // 总数
        count: ListConfigEnum.COUNT
    })

    // 列表数据
    const list = ref<ListItemType>([])

    /**
     * 获取列表方法
     * @param apiParams 获取列表接口参数
     * @param callback  请求回调方法
     * @returns 
     */
    const fetchList = async (
        apiParams: ListParamsInitType = {},
        callback: (params: any) => any = (() => { })
    ) => {

        loading.value = true
        try {

            const res = await apis.getApi(
                Object.assign({ //合并列表请求默认参数和额外参数
                    page: paginat.page,
                    limit: paginat.limit
                }, apiParams.getApiParams))

            setTimeout(() => {
                loading.value = false
            }, 300)

            if (res && res.data) {
                const { count, data } = res as any // 这里的count与data平级，不在Response结构中
                paginat.count = count
                list.value = data
                callback && callback(data) //调用回调参数，处理返回数据格式
                return data
            } else {
                return httpErrorHandle()
            }

        } catch (err) {
            httpErrorHandle()
        }
    }

    /**
     * 删除列表数据方法
     * @param cardData 列表数据,通过列表数据获取默认参数 id
     * @param params 额外参数
     */
    const deleteHandle = (
        data: ListItemType,
        params: ListParamsInitType = {}
    ) => {
        //弹窗提示
        Dialog({
            type: DialogEnum.DELETE,
            promise: true,
            onPositiveCallback: () =>
                new Promise(res => {
                    res(
                        apis.deleteApi(
                            //合并默认参数和额外参数
                            Object.assign({
                                ids: data.id
                            }, params.deleteApiParams)
                        )
                    )
                }),
            //删除成功后回调
            promiseResCallback: (res: any) => {
                if (res.code === ResultEnum.SUCCESS) {
                    window['$message'].success(window['$t']('global.r_delete_success'))
                    fetchList()
                    return
                }
                httpErrorHandle()
            }
        })
    }

    // 修改页数
    const changePage = (_page: number) => {
        paginat.page = _page
        fetchList()
    }

    // 修改大小
    const changeSize = (_size: number) => {
        paginat.limit = _size
        fetchList()
    }


    return {
        loading,
        paginat,
        list,
        fetchList,
        changeSize,
        changePage,
        deleteHandle
    }
}