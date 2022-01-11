/*
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2021-07-02 17:38:39
 * @LastEditors: rongcheng
 * @LastEditTime: 2022-01-10 16:26:43
 */
import type { App } from 'vue'
import { createPinia } from 'pinia'

const store = createPinia()

export function setupStore(app: App<Element>) {
  app.use(store)
}
export { store }
