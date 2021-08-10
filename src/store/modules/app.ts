/*
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2021-08-05 17:32:29
 * @LastEditors: rongcheng
 * @LastEditTime: 2021-08-05 17:35:42
 */

interface State {
  sidebar: {
    opened: boolean
  }
}

const state: State = {
  sidebar: {
    opened: true
  }
}

const mutations = {
  // eslint-disable-next-line no-shadow
  TOGGLE_SIDEBAR: (state: State) => {
    state.sidebar.opened = !state.sidebar.opened
    // console.log(state.sidebar.opened)
  }
}

const actions = {
  toggleSideBar(context: any) {
    context.commit('TOGGLE_SIDEBAR')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
