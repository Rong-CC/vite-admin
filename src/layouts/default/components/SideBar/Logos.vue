<!--
 * @Description: 头部 logo
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2021-08-05 17:22:10
 * @LastEditors: rongcheng
 * @LastEditTime: 2022-03-07 18:07:41
-->
<template>
  <router-link :to="{ path: '/' }">
    <div class="logo">
      <img
        src="https://v3.cn.vuejs.org/logo.png"
        alt="element-logo"
        class="nav-logo-small"
        data-v-55261868=""
      />
      <h5 class="marginL10">Vue3+EPlus+Ts</h5>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>

<style lang="less" scoped>
.logo {
  font-size: 16px;
  height: 50px;
  line-height: 50px;
  padding-left: 16px;
  overflow: hidden;
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
  cursor: pointer;
  img {
    width: 34px;
    height: 34px;
    vertical-align: middle;
  }
  h5 {
    margin: 0;
    display: inline-block;
    vertical-align: middle;
    font-size: 18px;
    color: #2c3e50;
  }
}
</style>
