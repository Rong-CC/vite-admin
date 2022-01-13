<!--
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2022-01-11 15:09:49
 * @LastEditors: rongcheng
 * @LastEditTime: 2022-01-12 14:23:44
-->
<template>
  <div v-if="getIsTabs" style="display: inline-block">
    <span>{{ getTitle }}</span>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, PropType, computed } from 'vue'

const props = defineProps({
  tabItem: {
    type: Object as PropType<any>,
    default: null
  },
  isExtra: Boolean
})
const getTitle = computed(() => {
  const { tabItem: { meta } = {} } = props
  return meta && meta.title
})
const getIsTabs = computed(() => !props.isExtra)
// console.log(props)
</script>

<style></style>
