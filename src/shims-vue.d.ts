/*
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2021-07-02 14:35:31
 * @LastEditors: rongcheng
 * @LastEditTime: 2022-01-11 10:03:01
 */
declare module '*.vue' {
  import { DefineComponent } from 'vue'

  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module '*.ts'
declare module '*.module.less' {
  const classes: {
    readonly [key: string]: string
  }
}
