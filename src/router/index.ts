/*
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2021-07-02 15:34:17
 * @LastEditors: rongcheng
 * @LastEditTime: 2021-12-31 15:11:17
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Mian from '../layouts/default/index.vue'

export const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   redirect: '/List',
  //   component: Mian
  // },
  {
    path: '/List',
    name: 'List',
    component: Mian,
    redirect: '/List/index',
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('../views/home/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
