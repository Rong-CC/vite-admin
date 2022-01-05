<!--
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2021-08-05 17:42:36
 * @LastEditors: rongcheng
 * @LastEditTime: 2022-01-05 15:34:11
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
          v-for="route in routes"
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
import { useStore, mapGetters } from 'vuex'
import SidebarItem from './SideBarItem.vue'
import Logo from './Logo.vue'

export default defineComponent({
  components: { Logo, SidebarItem },
  computed: {
    ...mapGetters(['sidebar', 'routes'])
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const activeMenu = computed(() => {
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    })
    const isCollapse = computed(() => !store.getters.sidebar.opened)
    // console.log(mapState(['permission']), 'mapState');
    const routes = computed(() => store.getters.routes)
    console.log(routes, '22')
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
      routes,
      activeMenu
    }
  }
})
</script>
