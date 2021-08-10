/*
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2021-08-05 17:40:23
 * @LastEditors: rongcheng
 * @LastEditTime: 2021-08-05 17:41:26
 */
const getters = {
  sidebar: (state: any) => state.app.sidebar,
  routes: (state: any) => state.permission.routes
}
export default getters
