<!--
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2022-01-12 18:00:28
 * @LastEditors: rongcheng
 * @LastEditTime: 2022-01-12 18:01:31
-->
<template>
  <div></div>
</template>
<script lang="ts" setup>
import { unref } from 'vue'
import { useRouter } from 'vue-router'

const { currentRoute, replace } = useRouter()

const { params, query } = unref(currentRoute)
// eslint-disable-next-line camelcase
const { path, _redirect_type = 'path' } = params

Reflect.deleteProperty(params, '_redirect_type')
Reflect.deleteProperty(params, 'path')

// eslint-disable-next-line no-underscore-dangle
const _path = Array.isArray(path) ? path.join('/') : path

// eslint-disable-next-line camelcase
if (_redirect_type === 'name') {
  replace({
    name: _path,
    query,
    params
  })
} else {
  replace({
    path: _path.startsWith('/') ? _path : `/${_path}`,
    query
  })
}
</script>
