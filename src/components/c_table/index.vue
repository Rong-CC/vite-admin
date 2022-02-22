<!--
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2022-02-22 10:06:59
 * @LastEditors: rongcheng
 * @LastEditTime: 2022-02-22 17:47:03
-->
<script setup lang="ts">
import { defineProps, PropType, withDefaults, watch } from 'vue'
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'

type formatter = (x: any, y: TableColumnCtx<any>) => number
type filterMethod = (x: number, y: number) => number
interface columnType {
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
interface Props {
  height?: string | PropType<string> | null
  size?: string | PropType<string>
  stripe?: boolean | PropType<boolean>
  border?: boolean | PropType<boolean>
  loading: boolean | PropType<boolean>
  column: columnType[]
  data: any[]
}
const props = withDefaults(defineProps<Props>(), {
  height: null,
  border: false,
  stripe: false,
  loading: true,
  column: () => [],
  data: () => []
})
watch(props, () => {
  console.log(props, 'props')
})
// console.log(props, '222')
// const props = defineProps({
//   // height:  PropType<String>,
//   // size: String as PropType<String>,
//   // stripe: String as PropType<String>,
//   // data: Object as PropType<any>
// })
const currentChange = () => {}
const selectionChange = () => {}
const selectAll = () => {}
const sortChange = () => {}
</script>

<template>
  <div>
    <el-table
      v-loading="props.loading"
      ref="cTableRef"
      :border="props.border"
      highlight-current-row
      :data="props.data"
      :height="props.height"
      :stripe="props.stripe"
      :size="props.size"
      @current-change="currentChange"
      @selection-change="selectionChange"
      @select-all="selectAll"
      @sort-change="sortChange"
    >
      <template v-for="(item, key) in props.column" :key="key">
        <el-table-column :label="item.label" :prop="item.prop">
          <!-- 头部插槽 -->
          <template v-if="item.headerSlot" #header="scope">
            <slot
              :name="item.slot"
              :row="scope.row"
              :index="scope.$index"
              :column="scope.column"
              :store="scope.store"
            ></slot>
          </template>
          <!-- 内容插槽 -->
          <template v-if="item.slot" #default="scope">
            <slot
              :name="item.slot"
              :row="scope.row"
              :index="scope.$index"
              :column="scope.column"
              :store="scope.store"
            ></slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>
