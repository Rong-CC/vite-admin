/*
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2021-07-06 18:11:54
 * @LastEditors: rongcheng
 * @LastEditTime: 2021-07-06 18:12:09
 */
// /*
//  * @Description:
//  * @Author: rongcheng
//  * @@后台人员: xxx
//  * @Date: 2021-07-06 16:15:42
//  * @LastEditors: rongcheng
//  * @LastEditTime: 2021-07-06 16:49:38
//  */
// import type { RouteRecordRaw, RouteMeta } from 'vue-router'
// // import { RoleEnum } from '/@/enums/roleEnum'
// import { defineComponent } from 'vue'
// declare type Recordable<T = any> = Record<string, T>
// enum RoleEnum {
//   // super admin
//   'SUPER' = 'super',
//   // tester
//   'TEST' = 'test'
// }
// export type Component<T extends any = any> =
//   | ReturnType<typeof defineComponent>
//   | (() => Promise<typeof import('*.vue')>)
//   | (() => Promise<T>)

// // @ts-ignore
// export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
//   name: string
//   meta: RouteMeta
//   component?: Component | string
//   components?: Component
//   children?: AppRouteRecordRaw[]
//   props?: Recordable
//   fullPath?: string
// }

// export interface MenuTag {
//   type?: 'primary' | 'error' | 'warn' | 'success'
//   content?: string
//   dot?: boolean
// }

// export interface Menu {
//   name: string

//   icon?: string

//   path: string

//   // path contains param, auto assignment.
//   paramPath?: string

//   disabled?: boolean

//   children?: Menu[]

//   orderNo?: number

//   roles?: RoleEnum[]

//   meta?: Partial<RouteMeta>

//   tag?: MenuTag

//   hideMenu?: boolean
// }

// export interface MenuModule {
//   orderNo?: number
//   menu: Menu
// }

// // export type AppRouteModule = RouteModule | AppRouteRecordRaw;
// export type AppRouteModule = AppRouteRecordRaw
