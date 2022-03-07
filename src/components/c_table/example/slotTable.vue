<!--
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2022-03-07 10:39:21
 * @LastEditors: rongcheng
 * @LastEditTime: 2022-03-07 14:14:21
-->
<template>
  <div>自定义slot 和自定义头部插槽</div>
  <c-table :data="tableData" :loading="false" :height="height" :column="column">
    <template #headerName="scope">
      <span>{{ scope.column.property }}</span>
      <el-tooltip class="box-item" effect="dark" content="自定义表头" placement="left-start">
        <div>
          <svg
            class="icon"
            width="16"
            height="16"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            data-v-042ca774=""
          >
            <path
              fill="currentColor"
              d="M512 64a448 448 0 110 896 448 448 0 010-896zm0 832a384 384 0 000-768 384 384 0 000 768zm48-176a48 48 0 11-96 0 48 48 0 0196 0zm-48-464a32 32 0 0132 32v288a32 32 0 01-64 0V288a32 32 0 0132-32z"
            ></path>
          </svg>
        </div>
      </el-tooltip>
    </template>
    <template #date="{ row }">
      <el-tag class="ml-2" type="info">{{ row.date }}</el-tag>
    </template>
  </c-table>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import cTable from '../index.vue'

export default defineComponent({
  components: {
    cTable
  },
  setup() {
    const state = reactive({
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
      ],
      height: '400',
      column: [
        {
          label: 'date',
          prop: 'date',
          slot: 'date'
        },
        {
          label: 'name',
          headerSlot: 'headerName',
          prop: 'name'
        },
        {
          label: 'address',
          prop: 'address'
        }
      ]
    })
    return {
      ...toRefs(state)
    }
  }
})
</script>
