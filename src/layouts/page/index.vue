<!--
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2021-07-05 16:45:24
 * @LastEditors: rongcheng
 * @LastEditTime: 2021-08-05 16:41:00
-->
<template>
  <router-view>
    <template #default="{ Component, route }">
      <transition mode="out-in" appear>
        <keep-alive v-if="true">
          <component :is="Component" :key="route.fullPath"></component>
        </keep-alive>
        <component v-else :is="Component"></component>
      </transition>
    </template>
  </router-view>
</template>
<script lang="ts" setup></script>
