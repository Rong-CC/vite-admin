<!--
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2022-02-22 11:08:14
 * @LastEditors: rongcheng
 * @LastEditTime: 2022-03-07 13:45:30
-->
<template>
  <p>基础表格</p>
  <el-button-group class="ml-4" style="margin-bottom: 20px">
    <el-button type="primary" @click="isBorder = !isBorder"
      >{{ isBorder ? '有' : '无' }}边框</el-button
    >
    <el-button type="primary" @click="isLoading = !isLoading"
      >{{ isLoading ? '关闭' : '开启' }}loading</el-button
    >
    <el-button type="primary" @click="isStripe = !isStripe"
      >{{ isStripe ? '带' : '不带' }}斑马纹表格</el-button
    >
    <el-button type="primary" @click="handleHeight"
      >{{ height ? '固定' : '取消' }}表格高度</el-button
    >
    <!-- <el-button type="primary" @click="handleHeight">自适应</el-button> -->
  </el-button-group>
  <c-table
    :data="tableData"
    :height="height"
    :column="column"
    :stripe="isStripe"
    :border="isBorder"
    :loading="isLoading"
  >
  </c-table>
</template>

<script lang="ts">
// import { ArrowLeft, Edit, Share, Delete, ArrowRight } from '@element-plus/icons-vue'
import { defineComponent, toRefs, reactive } from 'vue'
import cTable from '../index.vue'

export default defineComponent({
  components: {
    cTable
  },
  setup() {
    const state = reactive({
      isBorder: false,
      isLoading: false,
      isStripe: false,
      height: undefined,
      column: [
        {
          label: 'date',
          prop: 'date'
        },
        {
          label: 'name',
          prop: 'name'
        },
        {
          label: 'address',
          prop: 'address'
        }
      ],
      tableData: [
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }
      ]
    })
    const handleHeight = () => {
      if (state.height) {
        ;(state.height as unknown) = undefined
      } else {
        ;(state.height as unknown) = '500'
      }
    }
    return {
      handleHeight,
      ...toRefs(state)
    }
  }
})
</script>
