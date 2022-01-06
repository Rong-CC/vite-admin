/*
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2021-07-02 15:34:17
 * @LastEditors: rongcheng
 * @LastEditTime: 2022-01-06 14:03:45
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Mian from '../layouts/default/index.vue'

export const LAYOUT = () => import('@/layouts/default/BlankLayout.vue')
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
    component: Mian,
    children: []
  },
  {
    path: '/virtual',
    name: 'Virtual',
    // redirect: '/List',
    meta: {
      title: '虚拟列表',
      hideMenu: false,
      icon: 'el-icon-s-unfold'
      // hideChildrenInMenu: false
    },
    component: Mian,
    children: []
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
        name: 'Index', // name
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
        component: LAYOUT
        // children: [
        //   {
        //     path: 'form-1',
        //     name: 'Form-1',
        //     meta: {
        //       title: '列表菜单2-1',
        //       // icon: 'el-icon-s-unfold',
        //       hideMenu: false // 菜单隐藏
        //     },
        //     component: () => import('../views/userForm/index.vue')
        //   }
        // ]
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
