/*
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2021-07-02 15:40:51
 * @LastEditors: rongcheng
 * @LastEditTime: 2021-07-02 17:41:28
 */
import { createStore } from 'vuex'

const defaultState = {
  count: 0
}

// Create a new store instance.
export default createStore({
  state() {
    return defaultState
  },
  mutations: {
    increment(state: typeof defaultState) {
      // eslint-disable-next-line no-param-reassign
      state.count += 1
    }
  },
  actions: {
    increment(context: any) {
      context.commit('increment')
    }
  },
  getters: {
    double(state: typeof defaultState) {
      return 2 * state.count
    }
  }
})
