
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
    createApi: (params: ListItemType) => any,
    deleteApi: (params: ListItemType) => any, // 删除列表接口
}


/**
 * 列表相关 hook 
 */
export default (apis: ListInitType) => {
    // loading 加载
    const loading = ref(true)
    // 分页对象
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
    const getListHandle = async (
        apiParams: ListItemType = {},
        callback: (params: any) => any = (() => { })
    ) => {

        loading.value = true
        try {

            const res = await apis.getApi(
                Object.assign({ //合并列表请求默认参数和额外参数
                    page: paginat.page,
                    limit: paginat.limit
                }, apiParams))

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
     * 新增列表数据处理
     * @param params 
     */
    const createdHandle = async (
        apiParams: ListItemType = {},
        callback: (params: any) => any = (() => { })) => {
        loading.value = true
        try {
            const res = await apis.createApi(apiParams)
            if (res && res.data) {
                window['$message'].success(window['$t']('global.created_success'))
                callback && callback(res.data) //调用回调参数，处理返回数据格式
                return true
            } else {
                window["$message"].error(window["$t"]("project.create_failure"));
                return httpErrorHandle()
            }
        } catch (err) {
            httpErrorHandle()
        }
        loading.value = false
    }

    /**
     * 删除列表数据方法
     * @param cardData 列表数据,通过列表数据获取默认参数 id
     * @param params 额外参数
     */
    const deleteHandle = (
        data: ListItemType,
        params: ListItemType = {}
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
                    getListHandle()
                    return
                }
                httpErrorHandle()
            }
        })
    }

    // 修改页数
    const changePage = (_page: number) => {
        paginat.page = _page
        getListHandle()
    }

    // 修改大小
    const changeSize = (_size: number) => {
        paginat.limit = _size
        paginat.page = 1
        getListHandle()
    }


    return {
        loading,
        paginat,
        list,
        changeSize,
        changePage,
        getListHandle, // 获取列表
        createdHandle, // 新增
        deleteHandle // 删除
    }
}