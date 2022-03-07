<!--
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2022-02-22 10:06:59
 * @LastEditors: rongcheng
 * @LastEditTime: 2022-03-07 17:59:08
-->
<script setup lang="ts">
import { defineProps, PropType, withDefaults, watch } from 'vue'
// import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import { treeType, columnType } from './index'

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
interface Props {
  height?: string | PropType<string> | null
  size?: string | PropType<string>
  stripe?: boolean | PropType<boolean>
  border?: boolean | PropType<boolean>
  loading: boolean | PropType<boolean>
  treeObject?: treeType | PropType<unknown> | any
  column: columnType[]
  data: any[]
}

const props = withDefaults(defineProps<Props>(), {
  height: null,
  border: false,
  stripe: false,
  loading: true,
  treeObject: () => {
    return {
      defaultExpandAll: false,
      lazy: false,
      rowKey: '',
      load: (row) => {
        console.log(row)
      },
      treeProps: {
        hasChildren: 'hasChildren',
        children: 'children'
      }
    }
  },
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
      :default-expand-all="props.treeObject?.defaultExpandAll"
      :rowKey="props.treeObject?.rowKey"
      :lazy="props.treeObject.lazy"
      :treeProps="props.treeObject.treeProps"
      :load="props.treeObject.load"
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
  </div>
</template>
