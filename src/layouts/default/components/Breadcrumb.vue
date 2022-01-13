<!--
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2021-08-05 17:07:55
 * @LastEditors: rongcheng
 * @LastEditTime: 2022-01-11 16:50:07
-->
<template>
  <div>
    <el-breadcrumb class="breadcrumb" separator="/">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="item in levelList" :key="item.path">
          <router-link
            v-if="name != item.name"
            :to="{ path: item.redirect ? item.redirect : item.path === '' ? '/' : item.path }"
            >{{ item.meta.title }}</router-link
          >
          <span v-else>{{ item.meta.title }}</span>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { ref, watch, defineComponent } from 'vue'
import { useRoute, useRouter, RouteLocationMatched } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()
    const route = useRoute()
    const name = ref('')
    const levelList = ref<RouteLocationMatched[]>([])
    const getBreadcrumb = () => {
      // only show routes with meta.title
      name.value = route.name as string
      const matched = route.matched.filter((item) => item.meta && item.meta.title)
      levelList.value = matched.filter(
        (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
      )
    }
    watch(
      () => router,
      () => {
        getBreadcrumb()
      },
      {
        immediate: true,
        deep: true
      }
    )
    return {
      name,
      levelList
    }
  }
})
</script>

<style lang="less" scoped>
.breadcrumb {
  height: 30px;
  line-height: 30px;
  padding-left: 20px;
}
/deep/ .el-breadcrumb__inner a,
.el-breadcrumb__inner.is-link {
  font-weight: 400;
}
</style>
