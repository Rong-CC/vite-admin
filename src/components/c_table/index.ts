/*
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2022-02-22 10:07:04
 * @LastEditors: rongcheng
 * @LastEditTime: 2022-03-07 17:51:20
 *
 */
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'

type formatter = (x: any, y: TableColumnCtx<any>) => number
type filterMethod = (x: number, y: number) => number
type load = (row?: any, treeNode?: any, resolve?: any) => void
type treeProps = {
  hasChildren?: string
  children?: string
}
export interface columnType {
  prop: string // value 值
  label: string // 标题文字值
  sortable?: boolean // 排序
  headerSlot?: string // header插槽
  slot?: string // 插槽
  type?: string // type类型
  minWidth?: string | number // 最小宽度
  fixed?: string // 固定位置
  align?: string // 对齐方式
  columnKey?: string
  filters?: object
  formatter?: formatter
  filterMethod?: filterMethod
}

export interface treeType {
  defaultExpandAll?: boolean // 默认展开
  lazy?: boolean // 开启懒加载
  rowKey?: string | number // tree key值
  load?: load // 加载子节点数据的函数，
  treeProps?: treeProps
}
