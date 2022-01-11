<!--
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2021-08-05 17:42:36
 * @LastEditors: rongcheng
 * @LastEditTime: 2022-01-11 10:38:24
-->
<template>
  <div class="sidebar-container has-logo">
    <Logo />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        router
        :default-active="activeMenu"
        :collapse="isCollapse"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in getStoreRouter"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
// import { useStore, mapGetters } from 'vuex'
import { useAppStore } from '@/store/modules/app.ts'
import { userStore } from '@/store/modules/permission.ts'

import SidebarItem from './SideBarItem.vue'
import Logo from './Logos.vue'

export default defineComponent({
  components: { Logo, SidebarItem },
  // computed: {
  //   ...mapGetters(['sidebar', 'routes'])
  // },
  setup() {
    const store = useAppStore()
    const { getStoreRouter } = userStore()
    console.log(getStoreRouter, '2')
    const route = useRoute()
    const activeMenu = computed(() => {
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    })
    // const isCollapse = computed(() => !store.getters.sidebar.opened)
    // const isCollapse = false
    const isCollapse = computed(() => !store.$state.sidebar.opened)
    // console.log(mapState(['permission']), 'mapState');
    // const routes = computed(() => user.!s.routes)
    // console.log(routes, '22')
    const handleOpen = () => {
      // to do
    }
    const handleClose = () => {
      // to do
    }
    return {
      handleOpen,
      handleClose,
      isCollapse,
      getStoreRouter,
      activeMenu
    }
  }
})
</script>
