/*
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2021-07-02 17:38:39
 * @LastEditors: rongcheng
 * @LastEditTime: 2021-08-05 17:32:04
 */
import { createStore } from 'vuex'
import app from './modules/app'
import permission from './modules/permission'
import getters from './getters'

export default createStore({
  getters,
  modules: {
    app,
    permission
  }
})
