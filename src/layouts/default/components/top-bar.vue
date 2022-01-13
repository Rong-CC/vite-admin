<!--
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2021-08-05 17:08:24
 * @LastEditors: rongcheng
 * @LastEditTime: 2022-01-11 16:48:33
-->
<template>
  <div class="top-bar">
    <div class="collapse" @click="toggleSideBar">
      <el-icon :size="22">
        <Fold v-if="!isCollapse" />
        <Expand v-else />
      </el-icon>
      <i :class="['el-icon-s-unfold', 'hamburger', !isCollapse ? 'is-active' : '']"></i>
    </div>
    <div class="collapse" @click="reload">
      <el-icon :size="22">
        <Refresh />
      </el-icon>
      <!-- <i class="el-icon-refresh refresh"></i> -->
    </div>
    <div class="user-info">
      <el-dropdown>
        <span class="el-dropdown-link">
          <span style="font-size: 16px; font-weight: 500">admin</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="info">个人信息</el-dropdown-item>
            <el-dropdown-item command="out">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="bell">
      <el-popover placement="bottom" width="300" title="系统消息" trigger="hover">
        <p class="line"></p>
        <ul>
          <li>这是一条系统消息</li>
          <li>这是另一条系统消息</li>
        </ul>
        <template #reference>
          <el-badge :value="2" class="item">
            <el-icon>
              <Bell></Bell>
            </el-icon>
          </el-badge>
        </template>
      </el-popover>
    </div>
    <div class="full-screen" @click="handleFullScreen">
      <el-icon>
        <FullScreen></FullScreen>
      </el-icon>
      <!-- <span :class="fullscreen ? 'hero-full-screen-zoom' : 'hero-full-screen'"></span> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, SetupContext } from 'vue'
// import { ElMessage } from 'element-plus'

import { Fold, Expand, Refresh, Bell, FullScreen } from '@element-plus/icons'
import screenfull, { Screenfull } from 'screenfull'
// import { useStore } from 'vuex'
import { useAppStore } from '@/store/modules/app.ts'

export default defineComponent({
  components: {
    Fold,
    Expand,
    Refresh,
    Bell,
    FullScreen
  },
  setup(props: any, context: SetupContext) {
    const store = useAppStore()
    // const isCollapse = ref<boolean>(store.getters.sidebar)
    // computed(() => !store.state.app.sidebar.opened)
    const isCollapse = computed(() => !store.$state.sidebar.opened)

    const fullscreen = ref<boolean>(false)
    const change = () => {
      fullscreen.value = (screenfull as Screenfull).isFullscreen
    }
    const toggleSideBar = () => store.setSidebar()
    // 全屏事件
    const handleFullScreen = (): Boolean => {
      if (!screenfull.isEnabled) {
        return false
      }
      screenfull.toggle()
      return true
    }

    // const handleFullScreen = () => {
    //   if (!screenfull.isEnabled) {
    //     // 如果不允许进入全屏，发出不允许提示
    //     // ElMessage({
    //     //   message: '暂不不支持全屏',
    //     //   type: 'warning'
    //     // })
    //     return false
    //   }
    //   screenfull.toggle()
    // }
    if (screenfull.isEnabled) {
      screenfull.on('change', change)
    }
    const reload = () => {
      context.emit('reload')
    }
    return {
      isCollapse,
      fullscreen,
      handleFullScreen,
      toggleSideBar,
      reload
    }
  }
})
</script>

<style lang="less" scoped>
.top-bar {
  height: 50px;
}
.collapse {
  float: left;
  height: 50px;
  line-height: 50px;
  padding: 0 24px;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }
  i {
    font-size: 24px;
    color: #6a6a6a;
  }
}
.bell {
  float: right;
  padding: 12px 0;
  width: 50px;
  cursor: pointer;
  .el-icon-bell {
    color: #6a6a6a;
    font-size: 24px;
  }
}
.full-screen {
  font-size: 24px;
  float: right;
  padding: 9px 0;
  width: 60px;
  text-align: center;
  cursor: pointer;
  color: #6a6a6a;
  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }
}
.line {
  height: 1px;
  background: #e8e8e8;
  margin-bottom: 5px;
}
ul > li {
  list-style-type: none;
  margin-bottom: 3px;
}
.user-info {
  float: right;
  height: 50px;
  line-height: 48px;
  cursor: pointer;
  font-size: 18px;
}
.refresh,
.hamburger {
  display: inline-block;
  vertical-align: middle;
  width: 24px;
  height: 24px;
}
.hamburger.is-active {
  transform: rotate(180deg);
}
</style>
