/*
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2021-07-02 15:34:17
 * @LastEditors: rongcheng
 * @LastEditTime: 2022-03-07 14:48:55
 */

import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { setRouteChange } from '@/logics/mitt/routeChange'
import Mian from '../layouts/default/index.vue'

export const LAYOUT = () => import('@/layouts/default/BlankLayout.vue')
// name: string;
// meta: RouteMeta;
// component?: Component | string;
// components?: Component;
// children?: AppRouteRecordRaw[];
// props?: Recordable;
// fullPath?: string;
export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    // redirect: '/List',
    meta: {
      title: '首页',
      hideMenu: false,
      icon: 'el-icon-s-unfold'
      // hideChildrenInMenu: false
    },
    component: Mian
    // children: []
  },
  // {
  //   path: '/virtual',
  //   name: 'Virtual',
  //   // redirect: '/List',
  //   meta: {
  //     title: '虚拟列表',
  //     hideMenu: false,
  //     icon: 'el-icon-s-unfold'
  //     // hideChildrenInMenu: false
  //   },
  //   component: Mian
  //   // children: []
  // },
  {
    path: '/components',
    name: 'Components',
    // redirect: '/List',
    meta: {
      title: '组件',
      // hideMenu: false,
      icon: 'el-icon-s-unfold'
      // hideChildrenInMenu: false
    },
    component: Mian,
    children: [
      {
        path: 'table',
        name: 'Table', // name
        meta: {
          title: '表格' // 菜单名字
          // icon: 'el-icon-s-unfold'
          // hideChildrenInMenu: false 隐藏子节点
          // hideMenu: true // 菜单隐藏
        },
        component: LAYOUT,
        redirect: 'table-1',
        children: [
          {
            path: 'table-1',
            name: 'table-1',
            meta: {
              // condition: currentActiveMenu && hideTab  显示currentActiveMenu的tabs
              currentActiveMenu: '/components/table', // 显示父级菜单
              hideTab: true, // 隐藏 tabs
              title: '基础表格',
              // icon: 'el-icon-s-unfold',
              hideMenu: false // 菜单隐藏
            },
            component: () => import('@/components/c_table/example/table.vue')
          },
          {
            path: 'table-2',
            name: 'table-2',
            meta: {
              // condition: currentActiveMenu && hideTab  显示currentActiveMenu的tabs
              currentActiveMenu: '/components/table', // 显示父级菜单
              hideTab: true, // 隐藏 tabs
              title: '插槽表格',
              // icon: 'el-icon-s-unfold',
              hideMenu: false // 菜单隐藏
            },
            component: () => import('@/components/c_table/example/slotTable.vue')
          },
          {
            path: 'table-3',
            name: 'table-4',
            meta: {
              // condition: currentActiveMenu && hideTab  显示currentActiveMenu的tabs
              currentActiveMenu: '/components/table', // 显示父级菜单
              hideTab: true, // 隐藏 tabs
              title: '树形表格',
              // icon: 'el-icon-s-unfold',
              hideMenu: false // 菜单隐藏
            },
            component: () => import('@/components/c_table/example/treeTable.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/list',
    name: 'List',
    component: Mian,
    // redirect: '/List/index',
    meta: {
      title: '列表',
      icon: 'el-icon-s-unfold'
    },
    children: [
      {
        path: 'index',
        name: 'index', // name
        meta: {
          title: '列表菜单1' // 菜单名字
          // icon: 'el-icon-s-unfold'
          // hideChildrenInMenu: false 隐藏子节点
          // hideMenu: true // 菜单隐藏
        },
        component: () => import('../views/home/index.vue')
      },
      {
        path: 'upload',
        name: 'Upload', // name
        meta: {
          title: '列表菜单上传' // 菜单名字
          // hideChildrenInMenu: false 隐藏子节点
          // hideMenu: true // 菜单隐藏
        },
        component: () => import('../views/demo/detail/index.vue')
      },
      {
        path: 'form',
        name: 'Form',
        meta: {
          title: '列表菜单2',
          hideMenu: false // 菜单隐藏
        },
        component: LAYOUT,
        children: [
          {
            path: 'form-1',
            name: 'Form-1',
            meta: {
              // condition: currentActiveMenu && hideTab  显示currentActiveMenu的tabs
              currentActiveMenu: '/list/form', // 显示父级菜单
              hideTab: true, // 隐藏 tabs
              title: '列表菜单2-1',
              // icon: 'el-icon-s-unfold',
              hideMenu: false // 菜单隐藏
            },
            component: () => import('../views/userForm/index.vue')
          }
        ]
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to) => {
  // The page has already been loaded, it will be faster to open it again, you don’t need to do loading and other processing
  // to.meta.loaded = !!loadedPageMap.get(to.path);
  // Notify routing changes
  setRouteChange(to)

  return true
})

export default router
