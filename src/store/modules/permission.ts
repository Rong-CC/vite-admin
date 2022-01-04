/*
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2021-08-05 17:36:08
 * @LastEditors: rongcheng
 * @LastEditTime: 2021-12-31 15:04:53
 */
import { routes } from '@/router/index.ts'

const state = {
  routes
}
console.log(state.routes)
const mutations = {}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
