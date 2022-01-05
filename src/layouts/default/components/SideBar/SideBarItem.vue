<!--
 * @Description: 菜单item
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2022-01-05 15:45:36
 * @LastEditors: rongcheng
 * @LastEditTime: 2022-01-05 15:50:54
-->
<template>
  <div class="menu-wrapper">
    <template v-if="!menuHasChildren(item) && getShowMenu">
      <el-menu-item :index="resolvePath('')" :class="{ 'submenu-title-noDropdown': !isNest }">
        <i :class="[item.meta.icon || (item.meta && item.meta.icon), 'icon']"></i>
        <template #title
          ><span>{{ item.meta.title }}</span></template
        >
      </el-menu-item>
    </template>

    <el-submenu
      v-if="menuHasChildren(item) && getShowMenu"
      ref="subMenu"
      :index="resolvePath(item.path)"
    >
      <template v-slot:title>
        <i :class="[item.meta && item.meta.icon, 'icon']"></i>
        <span>{{ item.meta.title }}11</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      >
      </sidebar-item>
    </el-submenu>
  </div>
</template>

<script lang="ts">
import { toRefs, reactive, defineComponent, computed } from 'vue'
import path from '@/utils/path.ts'
import type { Menu } from '@/router/types'

export default defineComponent({
  name: 'SidebarItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const state = reactive({
      onlyOneChild: { children: null, path: '', meta: { icon: '', title: '' } }
    })
    const getShowMenu = computed(() => !props.item?.meta?.hideMenu)
    // const getI18nName = computed(() => t(props.item?.name)) // 英文转换
    const getIcon = computed(() => props.item?.meta?.icon)
    function menuHasChildren(menuTreeItem: Menu): boolean {
      return (
        !menuTreeItem.meta?.hideChildrenInMenu &&
        Reflect.has(menuTreeItem, 'children') &&
        !!menuTreeItem.children &&
        menuTreeItem.children.length > 0
      )
    }
    const hasOneShowingChild = (children = [], parent: any) => {
      const showingChildren = children.filter((item: any) => {
        if (item.hidden) {
          return false
        }
        state.onlyOneChild = item
        return true
      })
      if (showingChildren.length === 1) {
        return true
      }
      if (showingChildren.length === 0) {
        state.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }
      return false
    }
    const resolvePath = (routePath: any) => {
      // console.log(props.basePath, T, '-----props.basePath')
      return path.resolve(props.basePath, routePath)
    }
    return {
      getShowMenu,
      getIcon,
      menuHasChildren,
      hasOneShowingChild,
      resolvePath,
      ...toRefs(state)
    }
  }
})
</script>

<style lang="less" scoped>
.icon {
  // margin-bottom: 3px;
  display: inline-block;
  vertical-align: top;
}
</style>
