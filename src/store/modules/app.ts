/*
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2021-08-05 17:32:29
 * @LastEditors: rongcheng
 * @LastEditTime: 2022-01-10 17:57:36
 */

// interface State {
//   sidebar: {
//     opened: boolean
//   }
// }

// const state: State = {
//   sidebar: {
//     opened: true
//   }
// }

// const mutations = {
//   // eslint-disable-next-line no-shadow
//   TOGGLE_SIDEBAR: (state: State) => {
//     state.sidebar.opened = !state.sidebar.opened
//     // console.log(state.sidebar.opened)
//   }
// }

// const actions = {
//   toggleSideBar(context: any) {
//     context.commit('TOGGLE_SIDEBAR')
//   }
// }

// export default {
//   namespaced: true,
//   state,
//   mutations,
//   actions
// }
// store/modules/app.ts
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
      this.sidebar.opened = !this.sidebar.opened
      console.log(this.sidebar.opened)
      return this.sidebar.opened
      // console.log(state.sidebar.opened)
    }
  },
  actions: {
    toggleSideBar(context: any) {
      context.commit('TOGGLE_SIDEBAR')
    },
    setSidebar() {
      this.sidebar.opened = !this.sidebar.opened
    }
  }
})

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(store)
}
