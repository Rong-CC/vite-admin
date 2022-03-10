<!--
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2022-03-08 17:41:04
 * @LastEditors: rongcheng
 * @LastEditTime: 2022-03-10 16:32:28
-->
<script lang="ts" setup>
// import { emit } from 'process';
import { reactive, toRefs, computed, useAttrs } from 'vue'

const props = defineProps({
  pageNum: {
    type: [String, Number],
    default: 1
  },
  size: {
    type: [String, Number],
    default: 10
  },
  total: {
    type: [String, Number],
    default: 100
  },
  disabled: {
    type: Boolean,
    default: false
  },
  // 带有背景色的分页
  background: {
    type: String,
    default: ''
  },
  // 分页大小
  small: {
    type: Boolean,
    default: false
  },
  layout: {
    type: String,
    default: 'total, sizes, prev, pager, next,jumper,slot'
  }
})
const attrs = useAttrs()
const emit = defineEmits<{
  (e: 'pagination-current-change', value: number): void
  (e: 'pagination-size-change', value: number): void
}>()
const state = reactive({
  pageSize: props.size,
  currentPage: props.pageNum
})

const getProps = computed(() => {
  return {
    ...props,
    ...attrs
  }
})
// console.log(state)
const handleSizeChange = (val) => {
  emit('pagination-size-change', val)
  // state.pageSize = val
}
const handleCurrentChange = (val) => {
  // state.currentPage = val
  emit('pagination-current-change', val)
}
const { pageSize, currentPage } = toRefs(state)
// const data = ...toRefs(state)
// defineExpose({
//   ...toRefs(state)
// })
</script>

<template>
  <el-pagination
    v-model:currentPage="currentPage"
    v-model:page-size="pageSize"
    v-bind="getProps"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  >
    <template #slot="data">
      <div>{{ data }}</div>
    </template>
  </el-pagination>
</template>
