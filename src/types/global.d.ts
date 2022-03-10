import type { VNode, VNodeChild } from 'vue'

declare type Recordable<T = any> = Record<string, T>
declare type Nullable<T> = T | null
declare type ReadonlyRecordable<T = any> = {
  readonly [key: string]: T
}
declare type Indexable<T = any> = {
  [key: string]: T
}
declare type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}
declare type TimeoutHandle = ReturnType<typeof setTimeout>
declare type IntervalHandle = ReturnType<typeof setInterval>
// declare namespace JSX {
//   // tslint:disable no-empty-interface
//   type Element = VNode
//   // tslint:disable no-empty-interface
//   // type ElementClass = ComponentRenderProxy
//   // interface ElementAttributesProperty {
//   //   $props: any
//   // }
//   // interface IntrinsicElements {
//   //   [elem: string]: any
//   // }
//   // interface IntrinsicAttributes {
//   //   [elem: string]: any
//   // }
// }
type Element = VNode
declare type VueNode = VNodeChild | Element
