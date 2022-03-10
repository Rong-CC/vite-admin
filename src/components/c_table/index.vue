<!--
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2022-02-22 10:06:59
 * @LastEditors: rongcheng
 * @LastEditTime: 2022-03-10 17:19:04
-->
<script setup lang="ts">
import { defineProps, PropType, withDefaults, computed, ref } from 'vue'
// import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import { treeType, columnType, pageType } from './index'
import { isFunction } from '@/utils/is'

import cPagination from '../c_pagination/index.vue'
/** *
 *  height   表格高度
 *  size     表格尺寸大小
 *  stripe    开启表格斑马线     true ｜ false
 *  border    开启线条          true ｜ false
 *  loading   开启loading       true ｜ false
 *  treeObject  tree配置参数     参数看 treeType
 *  column      表格列           参数看 columnType
 *  data        表格数据
 */
type ListParams = {
  num?: number | string
  size?: number | string
}
interface Props {
  height?: string | PropType<string> | null
  size?: string | PropType<string>
  stripe?: boolean | PropType<boolean>
  border?: boolean | PropType<boolean>
  loading?: boolean | PropType<boolean>
  treeObject?: treeType | PropType<unknown> | any
  pageObject?: pageType | PropType<pageType> | any
  pageListFn: (e?: ListParams) => void
  column?: columnType[]
  data: any[]
}

const props = withDefaults(defineProps<Props>(), {
  height: null,
  border: false,
  stripe: false,
  loading: true,
  pageListFn: () => {},
  treeObject: () => {},
  pageObject: (): pageType => {
    return {
      show: false, //  显示分页  false 显示  true 隐藏
      total: 0,
      pageNum: 1,
      size: 20
    }
  },
  column: () => [],
  data: () => []
})
const emit = defineEmits(['currentChange', 'pagination-current-change', 'pagination-size-change'])

// defineComponent({
//   pagination: cPagination
// })
const cTableRef = ref<Element | null>(null)
const getProps = computed(() => {
  const propsData = <Props>{ ...props, ...props.treeObject }
  return propsData
})
const isPageShow = () => {
  return !props.pageObject.show
}

// watch(props, (n) => {
//   // props = n
//   // props = n
//   console.log(n)
//   // const { treeObject } = n
//   //  = n.treeObject
//   state.treeObject = n.treeObject
//   // console.log(state.treeObject, '2')
//   // console.log(n, props, 'props', getProps.value)
//   // console.log(defaultExpandAll)
// })
// console.log(props, '222')
// const props = defineProps({
//   // height:  PropType<String>,
//   // size: String as PropType<String>,
//   // stripe: String as PropType<String>,
//   // data: Object as PropType<any>
// })

const getTableInstance = () => {
  return cTableRef.value
}
const currentChange = (val) => {
  emit('currentChange', val)
}

const selectionChange = () => {}
const selectAll = () => {}
const sortChange = () => {}
const handlePaginationSizeChange = (size) => {
  isFunction(props.pageListFn) && props.pageListFn({ size })
  !isFunction(props.pageListFn) && emit('pagination-size-change', size)
}
const handlePaginationCurrentChang = (num) => {
  isFunction(props.pageListFn) && props.pageListFn({ num })
  !isFunction(props.pageListFn) && emit('pagination-current-change', num)
}
// 组件中明确要暴露出去的属性
defineExpose({
  getTableInstance
})
</script>

<template>
  <div>
    <el-table
      v-loading="getProps.loading"
      ref="cTableRef"
      highlight-current-row
      v-bind="getProps"
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
              :name="item.headerSlot"
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
    <c-pagination
      v-if="isPageShow()"
      v-bind="props.pageObject"
      @pagination-current-change="handlePaginationCurrentChang"
      @pagination-size-change="handlePaginationSizeChange"
    ></c-pagination>
  </div>
</template>
