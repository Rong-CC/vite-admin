<!--
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2021-08-05 16:43:28
 * @LastEditors: rongcheng
 * @LastEditTime: 2022-02-22 18:14:58
-->
<template>
  <el-date-picker
    v-bind="$attrs"
    v-model="value"
    :type="type"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    placeholder="选择日期"
  >
  </el-date-picker>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from 'vue'
import dayjs from 'dayjs'

export default defineComponent({
  props: {
    modelValue: {
      type: [String, Object, Array],
      default: ''
    },
    type: {
      type: String,
      default: 'date'
    },
    valueFormat: {
      type: String,
      default: 'YYYY-MM-DD'
    }
  },
  setup(props, { emit }) {
    const state = reactive({
      value: props.modelValue
    })
    watch(
      () => state.value,
      (val: any) => {
        let formatVal: any = null
        if (Array.isArray(val)) {
          formatVal = [
            dayjs(val[0]).format(props.valueFormat),
            dayjs(val[1]).format(props.valueFormat)
          ]
        } else {
          formatVal = dayjs(val).format(props.valueFormat)
        }
        emit('update:modelValue', formatVal)
      }
    )
    return {
      ...toRefs(state)
    }
  }
})
</script>
<style scoped lang="less"></style>
