export type Chartype = {
  id: number | string
  title: string // 标题
  label?: string // 标签
  time: string, // 时间
  image: string, // 预览图地址
  createId: string, // 创建者
  release: boolean, // false 未发布 | true 已发布
  createUserId: number, // 项目创建用户的 id
  created: boolean // 是否为当前用户创建的项目
}

export type ChartList = Chartype[]