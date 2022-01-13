/*
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2021-08-05 17:32:29
 * @LastEditors: rongcheng
 * @LastEditTime: 2022-01-11 17:03:55
 */
import { defineStore } from 'pinia'
import { store } from '@/store/index.ts'

interface AppState {
  sidebar: {
    opened: boolean
  }
}
// console.log(pinia)

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    sidebar: {
      opened: true
    }
  }),
  getters: {
    getSidebar(): Boolean {
      // this.sidebar.opened = !this.sidebar.opened
      // console.log(this.sidebar.opened)
      return this.sidebar.opened
      // console.log(state.sidebar.opened)
    }
  },
  actions: {
    setSidebar() {
      this.sidebar.opened = !this.sidebar.opened
    }
  }
})

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(store)
}
