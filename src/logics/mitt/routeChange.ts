/*
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2022-01-11 18:01:22
 * @LastEditors: rongcheng
 * @LastEditTime: 2022-01-12 13:41:33
 */
/**
 * Used to monitor routing changes to change the status of menus and tabs. There is no need to monitor the route, because the route status change is affected by the page rendering time, which will be slow
 */

import type { RouteLocationNormalized } from 'vue-router'
import mitt from '@/utils/mitt.ts'
import { getRawRoute } from '@/utils'

const emitter = mitt()

// eslint-disable-next-line symbol-description
const key = Symbol()

let lastChangeTab: RouteLocationNormalized

export function setRouteChange(lastChangeRoute: RouteLocationNormalized) {
  const r = getRawRoute(lastChangeRoute)
  emitter.emit(key, r)
  lastChangeTab = r
}

export function listenerRouteChange(
  callback: (route: RouteLocationNormalized) => void,
  immediate = true
) {
  emitter.on(key, callback)
  // eslint-disable-next-line no-unused-expressions
  immediate && lastChangeTab && callback(lastChangeTab)
}

export function removeTabChangeListener() {
  emitter.clear()
}
