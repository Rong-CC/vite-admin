/*
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2021-07-06 18:11:54
 * @LastEditors: rongcheng
 * @LastEditTime: 2022-01-12 13:48:13
 */
import type { RouteRecordRaw, RouteMeta } from 'vue-router'
import { defineComponent } from 'vue'

declare type Recordable<T = any> = Record<string, T>

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>)

export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name: string
  meta: RouteMeta
  component?: Component | string
  components?: Component
  // children?: AppRouteRecordRaw[];
  props?: Recordable
  fullPath?: string
}
export interface MenuTag {
  type?: 'primary' | 'error' | 'warn' | 'success'
  content?: string
  dot?: boolean
}
export interface Menu {
  name: string

  icon?: string

  path: string

  // path contains param, auto assignment.
  paramPath?: string

  disabled?: boolean

  children?: Menu[]

  orderNo?: number

  // roles?: RoleEnum[]

  meta?: Partial<RouteMeta>

  tag?: MenuTag

  hideMenu?: boolean
}
