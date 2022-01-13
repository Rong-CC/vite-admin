<!--
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2021-08-05 17:05:23
 * @LastEditors: rongcheng
 * @LastEditTime: 2022-01-11 16:50:26
-->

<template>
  <div :class="['wrapper', isCollapse ? 'hideSidebar' : '']">
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '210px'">
        <sidebar />
      </el-aside>
      <el-container>
        <el-header height="50px">
          <topbar @reload="handleReload" />
        </el-header>
        <el-main>
          <Tabs></Tabs>
          <breadcrumb />
          <div v-if="isRouterAlive">
            <app-main />
          </div>
        </el-main>
        <el-footer style="line-height: 60px; text-align: center"
          >Vue3 + ts + Element Plus 后台管理系统模板</el-footer
        >
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'
// import { useStore } from 'vuex'
import { useAppStore } from '@/store/modules/app.ts'
import Sidebar from '@/layouts/default/components/SideBar/Index.vue'
import Topbar from './components/top-bar.vue'
import Breadcrumb from '@/layouts/default/components/Breadcrumb.vue'
import AppMain from '@/layouts/default/components/app-main.vue'
import Tabs from './components/Tabs/page.vue'

export default defineComponent({
  components: { Sidebar, Topbar, Breadcrumb, AppMain, Tabs },
  setup() {
    const store = useAppStore()
    console.log(store.$state)
    const isCollapse = computed(() => !store.$state.sidebar.opened)
    const isRouterAlive = ref<boolean>(true)
    const handleReload = () => {
      isRouterAlive.value = false
      nextTick(() => {
        isRouterAlive.value = true
      })
    }
    return {
      isCollapse,
      isRouterAlive,
      handleReload
    }
  }
})
</script>

<style lang="less" scoped>
/deep/ .el-main {
  padding: 0;
}
/deep/ .el-header {
  -webkit-box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  padding-right: 20px;
  padding-left: 0;
}
/deep/ .el-aside {
  box-shadow: rgb(241, 241, 241) 2px 0px 6px;
}
</style>
