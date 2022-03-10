<!--
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2021-12-29 09:24:56
 * @LastEditors: rongcheng
 * @LastEditTime: 2021-12-31 14:25:15
-->
<template>
  <div v-for="(item, k) in virtualList" :key="k">
    <p>{{ item.name }}</p>
  </div>
  <h1>{{ msg }}</h1>
  <!-- <el-button>按钮</el-button> -->
</template>
<script lang="ts">
import { reactive } from 'vue'

interface User {
  name: string
  age: number
  sex?: string | null
}

export default {
  props: {
    msg: {
      type: [String, Number]
    }
  },
  setup() {
    const virtualList = reactive<User[]>([
      {
        name: '章三',
        age: 19,
        sex: '22'
      }
    ])

    return {
      virtualList
    }
  }
}
</script>
