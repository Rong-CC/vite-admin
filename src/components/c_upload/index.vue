<template>
  <el-upload
    class="upload-demo"
    action="https://jsonplaceholder.typicode.com/posts/"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    multiple
    :limit="3"
    :on-exceed="handleExceed"
    :file-list="fileList"
  >
    <el-button type="primary">Click to upload</el-button>
    <template #tip>
      <div class="el-upload__tip">jpg/png files with a size less than 500KB.</div>
    </template>
  </el-upload>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: '',
  props: {},
  setup() {
    const data = reactive({
      fileList: []
    })
    const handleRemove = () => {}
    const beforeRemove = () => {}
    const handleExceed = () => {}
    const handlePreview = () => {}
    return {
      ...toRefs(data),
      handlePreview,
      beforeRemove,
      handleRemove,
      handleExceed
    }
  }
})
</script>
<!-- <script lang="ts" setup>

</script> -->
<style lang="scss" scoped></style>
