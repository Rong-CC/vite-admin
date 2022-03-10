<!--
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2022-03-07 10:39:21
 * @LastEditors: rongcheng
 * @LastEditTime: 2022-03-10 17:28:55
-->
<template>
  <!-- <div>tree table</div> -->
  <el-button-group class="ml-4" style="margin-bottom: 20px">
    <el-button type="primary" @click="handleAction('all', true)">全部展开</el-button>
    <el-button type="primary" @click="handleAction('all', false)">全部折叠</el-button>
    <!-- <el-button type="primary" @click="handleAction('lazy', treeObject.lazy)">
      {{ treeObject.lazy ? '关闭懒加载' : ' 开启懒加载' }}
    </el-button> -->
    <el-button type="primary" @click="handleAction('lazy', true)">开启懒加载</el-button>
    <el-button type="primary" @click="handleAction('lazy', false)">关闭懒加载</el-button>
    <!-- <el-button type="primary" @click="handleHeight">自适应</el-button> -->
  </el-button-group>
  <c-table
    :data="tableData"
    :loading="false"
    :height="height"
    :column="column"
    :page-object="pageObject"
    :treeObject="{
      ...treeObject,
      load: handleLoad
    }"
  ></c-table>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import cTable from '../index.vue'
import { treeType, pageType } from '../index'

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
  pageObject: pageType
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
        expandRowKeys: [], // 后期手动
        defaultExpandAll: false, // 默认全部展开
        lazy: false,
        treeProps: {
          children: 'children',
          hasChildren: 'hasChildren'
        }
      },
      pageObject: {
        show: false,
        total: 0,
        pageNum: 1,
        size: 10
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
      ]
    })
    state.pageObject.total = state.tableData.length

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
    /**
     * @description:获取tree有children id
     * @param {*} data  tree数据
     * @return {*}
     */
    const treeId = (data: User[]) => {
      const arr = <number[]>[]
      data.forEach((element: User) => {
        if (!!element.children && element.children.length > 0) {
          arr.push(element.id)
          treeId(element.children)
        }
      })
      return arr
    }
    /**
     * @description:  展开/收缩 事件
     * @param {*} status
     * @return {*}
     */
    const setExpandAll = (status) => {
      state.treeObject.defaultExpandAll = status
      if (status) {
        state.treeObject.expandRowKeys = treeId(state.tableData)
      } else {
        state.treeObject.expandRowKeys = []
      }
    }
    const setHandleLazy = (status) => {
      state.treeObject.lazy = status
    }
    /**
     * @description: 点击事件
     * @param {*} status  状态
     * @return {*}
     */
    const handleAction = (event, status?) => {
      event === 'all' && setExpandAll(status)
      event === 'lazy' && setHandleLazy(status)
    }
    return {
      ...toRefs(state),
      handleLoad,
      handleAction
    }
  }
})
</script>
