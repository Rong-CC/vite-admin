/*
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2021-07-02 15:34:17
 * @LastEditors: rongcheng
 * @LastEditTime: 2021-08-05 17:49:59
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Mian from '../layouts/default/index.vue'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Mian // 懒加载组件
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
