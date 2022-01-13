/*
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2022-01-11 17:15:42
 * @LastEditors: rongcheng
 * @LastEditTime: 2022-01-11 17:15:42
 */
import type { RouteLocationNormalized, RouteRecordNormalized } from 'vue-router'

export function getRawRoute(route: RouteLocationNormalized): RouteLocationNormalized {
  if (!route) return route
  const { matched, ...opt } = route
  return {
    ...opt,
    matched: (matched
      ? matched.map((item) => ({
          meta: item.meta,
          name: item.name,
          path: item.path
        }))
      : undefined) as RouteRecordNormalized[]
  }
}
