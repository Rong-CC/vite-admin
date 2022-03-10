<!--
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2022-02-22 11:08:14
 * @LastEditors: rongcheng
 * @LastEditTime: 2022-03-10 17:18:31
-->
<template>
  <p>基础表格</p>
  <el-button-group class="ml-4" style="margin-bottom: 20px">
    <el-button type="primary" @click="isBorder = !isBorder"
      >{{ isBorder ? '无' : '有' }}边框</el-button
    >
    <el-button type="primary" @click="isLoading = !isLoading"
      >{{ isLoading ? '关闭' : '开启' }}loading</el-button
    >
    <el-button type="primary" @click="isStripe = !isStripe"
      >{{ !isStripe ? '带' : '不带' }}斑马纹表格</el-button
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
    :page-object="pageObject"
    :pageListFn="Api"
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
      pageObject: {
        show: false,
        total: 0,
        pageNum: 1,
        size: 10
      },
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
    state.pageObject.total = state.tableData.length
    const getListApi = () => {
      setTimeout(() => {
        state.tableData = [
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
        console.log('list')
      }, 1000)
    }

    const handleHeight = () => {
      if (state.height) {
        ;(state.height as unknown) = undefined
      } else {
        ;(state.height as unknown) = '500'
      }
    }
    const Api = (val) => {
      const { size, num } = val
      getListApi()
      console.log(size, num, '1')
    }
    return {
      handleHeight,
      Api,
      getListApi,
      ...toRefs(state)
    }
  }
})
</script>
