<!--
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2022-03-07 10:39:21
 * @LastEditors: rongcheng
 * @LastEditTime: 2022-03-07 18:03:13
-->
<template>
  <div>tree table</div>
  <el-button-group class="ml-4" style="margin-bottom: 20px">
    <el-button type="primary" @click="handleAction">开启tree</el-button>
    <el-button type="primary" @click="handleAction">关闭</el-button>
    <!-- <el-button type="primary" @click="handleHeight">自适应</el-button> -->
  </el-button-group>
  <c-table
    :data="tableData"
    :loading="false"
    :height="height"
    :column="column"
    :treeObject="{
      ...treeObject,
      load: handleLoad
    }"
  ></c-table>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import cTable from '../index.vue'
import { treeType } from '../index'

interface User {
  id: number
  date: string
  name: string
  hasChildren?: boolean
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  children?: User[]
}
interface stateType {
  tableData: User[]
  treeObject: treeType
  height: string
  column?: unknown
}
export default defineComponent({
  components: {
    cTable
  },
  setup() {
    const state = reactive<stateType>({
      treeObject: {
        rowKey: 'id',
        defaultExpandAll: false,
        lazy: true,
        treeProps: {
          children: 'children',
          hasChildren: 'hasChildren'
        }
      },
      tableData: [
        {
          id: 1,
          date: '2016-05-02',
          hasChildren: true,
          name: 'wangxiaohu'
        },
        {
          id: 2,
          date: '2016-05-04',
          name: 'wangxiaohu'
        },
        {
          id: 3,
          date: '2016-05-01',
          name: 'wangxiaohu',
          children: [
            {
              id: 31,
              date: '2016-05-01',
              name: 'wangxiaohu',
              hasChildren: true
            },
            {
              id: 32,
              date: '2016-05-01',
              name: 'wangxiaohu'
            }
          ]
        },
        {
          id: 4,
          date: '2016-05-03',
          name: 'wangxiaohu'
        }
      ],
      height: '400',
      column: [
        {
          label: 'id',
          prop: 'id'
        },
        {
          label: 'date',
          prop: 'date'
        },
        {
          label: 'name',
          headerSlot: 'headerName',
          prop: 'name'
        }
        // {
        //   label: 'address',
        //   prop: 'address'
        // }
      ]
    })
    function handleLoad(row: User, treeNode: unknown, resolve: (date: User[]) => void) {
      console.log(row, treeNode)
      setTimeout(() => {
        resolve([
          {
            id: 34,
            date: '2016-05-01',
            name: 'wangxiaohu'
          },
          {
            id: 35,
            date: '2016-05-01',
            name: 'wangxiaohu'
          }
        ])
      }, 2000)
    }
    const handleAction = (type) => {
      console.log(type)
    }
    return {
      ...toRefs(state),
      handleLoad,
      handleAction
    }
  }
})
</script>
