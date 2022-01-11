<!--
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2022-01-11 09:56:41
 * @LastEditors: rongcheng
 * @LastEditTime: 2022-01-11 10:19:42
-->
<!--
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2022-01-11 09:56:10
 * @LastEditors: rongcheng
 * @LastEditTime: 2022-01-11 09:56:13
-->
<!--
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2022-01-10 13:21:33
 * @LastEditors: rongcheng
 * @LastEditTime: 2022-01-10 18:05:08
-->
<template>
  <el-tabs type="card" v-show="false">
    <template>
      <el-tab-pane v-for="item in getTabsState" :key="item.query ? item.fullPath : item.path">
        <template #label>
          <span>
            <el-icon><calendar /></el-icon>
            1
          </span>
        </template>
      </el-tab-pane>
    </template>
  </el-tabs>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const getTabsState = ref([
      {
        query: 1,
        fullPath: 3,
        path: 2
      }
    ])
    return {
      getTabsState
    }
  }
})
</script>
