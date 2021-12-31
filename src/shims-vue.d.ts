/*
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2021-07-02 14:35:31
 * @LastEditors: rongcheng
 * @LastEditTime: 2021-12-31 14:38:26
 */
declare module '*.vue' {
  import { DefineComponent } from 'vue'

  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module '*.ts'
