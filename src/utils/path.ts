/*
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2022-01-05 11:06:33
 * @LastEditors: rongcheng
 * @LastEditTime: 2022-01-05 11:16:04
 */

// 解析文件路径。类似于path.resolve
function resolve(...paths) {
  let resolvePath = ''
  let isAbsolutePath = false
  // eslint-disable-next-line no-plusplus
  for (let i = paths.length - 1; i > -1; i--) {
    const path = paths[i]
    if (isAbsolutePath) {
      break
    }
    if (!path) {
      // eslint-disable-next-line no-continue
      continue
    }
    resolvePath = `${path}/${resolvePath}`
    isAbsolutePath = path.charCodeAt(0) === 47
  }
  if (/^\/+$/.test(resolvePath)) {
    resolvePath = resolvePath.replace(/(\/+)/, '/')
  } else {
    resolvePath = resolvePath
      .replace(/(?!^)\w+\/+\.{2}\//g, '')
      .replace(/(?!^)\.\//g, '')
      .replace(/\/+$/, '')
  }
  return resolvePath
}
export default {
  resolve
}
