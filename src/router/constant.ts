/*
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2022-01-11 10:55:44
 * @LastEditors: rongcheng
 * @LastEditTime: 2022-01-12 18:08:48
 */
export const REDIRECT_NAME = 'Redirect'

export const PARENT_LAYOUT_NAME = 'ParentLayout'

export const PAGE_NOT_FOUND_NAME = 'PageNotFound'

export const EXCEPTION_COMPONENT = () => import('@/views/sys/exception/Exception.vue')

/**
 * @description: default layout
 */
export const LAYOUT = () => import('@/layouts/default/index.vue')

/**
 * @description: parent-layout
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getParentLayout = (_name?: string) => {
  return () =>
    new Promise((resolve) => {
      resolve({
        name: PARENT_LAYOUT_NAME
      })
    })
}
