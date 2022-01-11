/*
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2022-01-10 14:05:21
 * @LastEditors: rongcheng
 * @LastEditTime: 2022-01-11 09:49:29
 */
import { toRaw, ref, nextTick } from 'vue'
import type { RouteLocationNormalized } from 'vue-router'
import { useRouter } from 'vue-router'
import { useMultipleTabStore } from '/@/store/modules/multipleTab.ts'

export interface MultipleTabState {
  cacheTabList: Set<string>
  tabList: RouteLocationNormalized[]
  lastDragEndIndex: number
}
export function initAffixTabs(): string[] {
  const affixList = ref<RouteLocationNormalized[]>([])

  const tabStore = useMultipleTabStore()
  const router = useRouter()
  /**
   * @description: Filter all fixed routes
   */
  function filterAffixTabs(routes: RouteLocationNormalized[]) {
    const tabs: RouteLocationNormalized[] = []
    // eslint-disable-next-line no-unused-expressions
    routes &&
      routes.forEach((route) => {
        if (route.meta && route.meta.affix) {
          tabs.push(toRaw(route))
        }
      })
    return tabs
  }

  /**
   * @description: Set fixed tabs
   */
  function addAffixTabs(): void {
    const affixTabs = filterAffixTabs(router.getRoutes() as unknown as RouteLocationNormalized[])
    affixList.value = affixTabs

    // eslint-disable-next-line no-restricted-syntax
    for (const tab of affixTabs) {
      tabStore.addTab({
        meta: tab.meta,
        name: tab.name,
        path: tab.path
      } as unknown as RouteLocationNormalized)
    }
  }

  let isAddAffix = false

  if (!isAddAffix) {
    addAffixTabs()
    isAddAffix = true
  }
  return affixList.value.map((item) => item.meta?.title).filter(Boolean) as string[]
}

export function useTabsDrag(affixTextList: string[]) {
  const tabStore = useMultipleTabStore()
  console.log(affixTextList, tabStore)
  // const { multiTabsSetting } = projectSetting
  // const { prefixCls } = useDesign('multiple-tabs')
  nextTick(() => {
    // if (!multiTabsSetting.canDrag) return
    // const el = document.querySelectorAll(
    //   `.${prefixCls} .ant-tabs-nav-wrap > div`
    // )?.[0] as HTMLElement
    // const { initSortable } = useSortable(el, {
    //   filter: (e: ChangeEvent) => {
    //     const text = e?.target?.innerText
    //     if (!text) return false
    //     return affixTextList.includes(text)
    //   },
    //   onEnd: (evt) => {
    //     const { oldIndex, newIndex } = evt
    //     if (isNullAndUnDef(oldIndex) || isNullAndUnDef(newIndex) || oldIndex === newIndex) {
    //       return
    //     }
    //     tabStore.sortTabs(oldIndex, newIndex)
    //   }
    // })
    // initSortable()
  })
}
