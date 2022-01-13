<!--
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2022-01-11 09:56:41
 * @LastEditors: rongcheng
 * @LastEditTime: 2022-01-12 17:45:33
-->
<template>
  <el-tabs
    type="card"
    class="getWrapClass"
    @tab-click="handleTabClick"
    @tab-remove="handleTabRemove"
    v-model="activeKeyRef"
  >
    <template v-for="item in getTabsState" :key="item.query ? item.fullPath : item.path">
      <el-tab-pane :closable="!(item && item?.meta && item?.meta?.affix)" :name="item.path">
        <template #label>
          <tabContent :tabItem="item"></tabContent>
        </template>
      </el-tab-pane>
    </template>
  </el-tabs>
</template>
<script lang="ts">
import { defineComponent, ref, computed, unref } from 'vue'
import { useRouter } from 'vue-router'
import type { RouteLocationNormalized, RouteMeta } from 'vue-router'
import tabContent from './components/TabContent.vue'
import { useGo } from '@/hooks/web/usePage'
import { REDIRECT_NAME } from '@/router/constant'
import { listenerRouteChange } from '@/logics/mitt/routeChange.ts'
import { useMultipleStore } from '@/store/modules/multipleTab'

export default defineComponent({
  components: {
    tabContent
  },
  setup() {
    const router = useRouter()
    const tabStore = useMultipleStore()
    const go = useGo()
    const activeKeyRef = ref('')
    const getTabsState = computed(() => {
      // return tabStore.getTabList.filter((item) => !item.meta?.hideTab)
      return tabStore.getTabList
    })
    const unClose = computed(() => unref(getTabsState).length === 1)
    const handleTabClick = (activated): void => {
      go(activated.paneName, false) // 暂时
    }
    // Close the current tab
    const handleTabRemove = (tab) => {
      if (unref(unClose)) {
        return
      }
      tabStore.closeTabByKey(tab, router)
    }
    listenerRouteChange((route) => {
      const { name } = route
      // || !userStore.getToken 暂时去掉token
      if (name === REDIRECT_NAME || !route) {
        return
      }
      const { path, fullPath, meta = {} } = route
      const { currentActiveMenu, hideTab } = meta as RouteMeta
      // console.log(meta, '22')
      const isHide = !hideTab ? null : currentActiveMenu
      const p = isHide || fullPath || path
      console.log(p, '11111')
      if (activeKeyRef.value !== p) {
        activeKeyRef.value = p as string
      }
      if (isHide) {
        const findParentRoute = router.getRoutes().find((item) => item.path === currentActiveMenu)
        // 暂时先添加 tabs
        findParentRoute && tabStore.addTab(findParentRoute as unknown as RouteLocationNormalized)
      } else {
        tabStore.addTab(unref(route))
      }
      // console.log(tabStore.tabList, 'tab--------')
    })
    return {
      // getWrapClass,
      activeKeyRef,
      handleTabClick,
      handleTabRemove,
      getTabsState
    }
  }
})
</script>
<style>
.getWrapClass .el-tabs__header {
  margin: 0;
}
</style>
