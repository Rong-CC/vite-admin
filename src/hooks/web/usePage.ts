/*
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2022-01-10 14:14:28
 * @LastEditors: rongcheng
 * @LastEditTime: 2022-01-11 10:56:13
 */
import type { RouteLocationRaw, Router } from 'vue-router'

// import { PageEnum } from '@/enums/usePage'
import { unref } from 'vue'

import { useRouter } from 'vue-router'
import { isString } from '@/utils/is.ts'
import { REDIRECT_NAME } from '@/router/constant.ts'

// eslint-disable-next-line no-use-before-define
export type RouteLocationRawEx = Omit<RouteLocationRaw, 'path'> & { path: PageEnum }
// eslint-disable-next-line no-shadow
enum PageEnum {
  // basic login path
  BASE_LOGIN = '/login',
  // basic home path
  BASE_HOME = '/dashboard',
  // error page path
  ERROR_PAGE = '/exception',
  // error log page path
  ERROR_LOG_PAGE = '/error-log/list'
}

function handleError(e: Error) {
  console.error(e)
}

// page switch
export function useGo(_router?: Router) {
  let router
  if (!_router) {
    router = useRouter()
  }
  const { push, replace } = _router || router
  function go(opt: PageEnum | RouteLocationRawEx | string = PageEnum.BASE_HOME, isReplace = false) {
    if (!opt) {
      return
    }
    if (isString(opt)) {
      // eslint-disable-next-line no-unused-expressions
      isReplace ? replace(opt).catch(handleError) : push(opt).catch(handleError)
    } else {
      const o = opt as RouteLocationRaw
      // eslint-disable-next-line no-unused-expressions
      isReplace ? replace(o).catch(handleError) : push(o).catch(handleError)
    }
  }
  return go
}

/**
 * @description: redo current page
 */
export const useRedo = (_router?: Router) => {
  const { push, currentRoute } = _router || useRouter()
  const { query, params = {}, name, fullPath } = unref(currentRoute.value)
  function redo(): Promise<boolean> {
    return new Promise((resolve) => {
      if (name === REDIRECT_NAME) {
        resolve(false)
        return
      }
      if (name && Object.keys(params).length > 0) {
        // eslint-disable-next-line no-underscore-dangle
        params._redirect_type = 'name'
        params.path = String(name)
      } else {
        // eslint-disable-next-line no-underscore-dangle
        params._redirect_type = 'path'
        params.path = fullPath
      }
      push({ name: REDIRECT_NAME, params, query }).then(() => resolve(true))
    })
  }
  return redo
}
