<!--
 * @Description: 菜单item
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2022-01-05 15:45:36
 * @LastEditors: rongcheng
 * @LastEditTime: 2022-01-11 10:52:07
-->
<template>
  <div class="menu-wrapper">
    <template v-if="!menuHasChildren(item) && getShowMenu">
      <el-menu-item :index="resolvePath(item.path, 1)">
        <el-icon :size="16">
          <Postcard />
        </el-icon>
        <template #title>
          <!-- <i :class="[item.meta.icon || (item.meta && item.meta.icon)]"></i> -->
          <span>{{ item.meta?.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <el-sub-menu
      v-if="menuHasChildren(item) && getShowMenu"
      :index="resolvePath(item.path)"
      :class="{ 'submenu-title-noDropdown': !isNest }"
    >
      <template #title>
        <el-icon :size="16">
          <myMenu />
        </el-icon>
        <span>{{ item.meta?.title }}</span>
      </template>
      <el-menu-item-group>
        <sidebar-item
          v-for="child in item.children"
          :key="child.path"
          :is-nest="true"
          :item="child"
          :base-path="resolvePath(child.path)"
          class="nest-menu"
        >
        </sidebar-item>
      </el-menu-item-group>
    </el-sub-menu>
  </div>
</template>

<script lang="ts">
import { toRefs, reactive, defineComponent, computed, PropType } from 'vue'
import { Menu as myMenu, Postcard } from '@element-plus/icons'
import path from '@/utils/path.ts'
// import { Menu as MenuType } from '@/router/types'
import { Menu } from '../../../../router/types'

export default defineComponent({
  name: 'SidebarItem',
  components: {
    myMenu,
    Postcard
  },
  props: {
    item: {
      type: Object as PropType<Menu>,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    },
    collapse: {
      type: Boolean,
      default: false
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
    const resolvePath = (routePath: any, t?) => {
      if (t) {
        return path.resolve(props.basePath)
      }
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

<style lang="less" scoped></style>
<style lang="less">
/*隐藏文字*/
.el-menu--collapse .menu-wrapper .el-sub-menu .el-sub-menu__title span {
  display: none;
}

/*隐藏 > */
.el-menu--collapse .menu-wrapper .el-sub-menu .el-sub-menu__icon-arrow {
  display: none;
}
</style>
