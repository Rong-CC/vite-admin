/*
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2021-08-05 17:36:08
 * @LastEditors: rongcheng
 * @LastEditTime: 2022-01-10 18:03:44
 */

// const state = {
//   routes
// }
// console.log(state.routes)
// const mutations = {}

// const actions = {}

// export default {
//   namespaced: true,
//   state,
//   mutations,
//   actions
// }
import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import { store } from '@/store/index.ts'
import { routes } from '@/router/index.ts'

interface AppState {
  routes: Array<RouteRecordRaw>
}
// console.log(pinia)

export const userStore = defineStore({
  id: 'permission',
  state: (): AppState => ({
    routes
  }),
  getters: {
    getStoreRouter(): Array<RouteRecordRaw> {
      return this.routes
    }
  },
  actions: {}
})

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return userStore(store)
}
