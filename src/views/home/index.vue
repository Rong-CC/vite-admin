<!--
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2021-07-02 15:35:30
 * @LastEditors: rongcheng
 * @LastEditTime: 2021-08-05 17:02:28
-->
<template>
  <PageView></PageView>
  <c-date-picker></c-date-picker>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import PageView from '@/layouts/page/index.vue'
import cDatePicker from '@/components/c_datePicker/index.vue'

export default defineComponent({
  components: {
    PageView,
    cDatePicker
  }
})
</script>

<style></style>
