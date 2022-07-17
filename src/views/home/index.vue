<!--
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2021-07-02 15:35:30
 * @LastEditors: rongcheng
 * @LastEditTime: 2022-06-05 14:36:29
-->
<template>
  <div>
    1111
    <List :msg="123"></List>
    <c-date-picker></c-date-picker>
  </div>
  <!-- <PageView></PageView> -->
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import List from '@/components/List/index'
// import PageView from '@/layouts/page/index.vue'
import cDatePicker from '@/components/c_datePicker/index'

export default defineComponent({
  set: () => {},
  components: {
    // PageView,
    List,
    cDatePicker
  }
})
</script>
