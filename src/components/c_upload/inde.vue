<!-- <template>
  <div class="uploadExcel">
    <Poptip v-if="preview" trigger="hover" :title="hasUpload ? 'excel内容预览' : 'excel格式预览'" placement="left" width="300">
      <Button icon="ios-cloud-upload-outline" @click="clickHandler">
        {{ title }}
      </Button>
      <input v-if="limitXlsx" ref="hiddenFile" type="file" class="hidden" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" style="display: none;" @change="fileChangeHandler">
      <input v-else ref="hiddenFile" type="file" class="hidden" style="display: none;" @change="fileChangeHandler">
      <div class="preview" slot="content">
        <table>
          <thead><tr><th v-for="(item, index) in previewCols" :key="index">{{ item }}</th></tr></thead>
          <tbody>
            <tr v-for="(item, index) in tableList" :key="index">
              <td v-for="(content, key) in item" :key="`c_${key}`">{{ content }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Poptip>
    <template v-if="!preview">
      <Button v-if="hasIcon" :type="btnType" :size="btnSize" icon="ios-cloud-upload-outline" @click="clickHandler">{{ title }}</Button>
      <Button v-else :type="btnType" :size="btnSize" @click="clickHandler">{{ title }}</Button>
      <input v-if="limitXlsx" ref="hiddenFile" type="file" class="hidden" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" style="display: none;" @change="fileChangeHandler">
      <input v-else ref="hiddenFile" type="file" class="hidden" style="display: none;" @change="fileChangeHandler">
    </template>
    <Poptip v-if="validateErrorMsg.length > 0" class="tips" title="上传格式出错" trigger="hover" placement="right" width="200">
      <Icon class="alert-tips" type="ios-alert-outline" />
      <div class="error" slot="content">
        <span v-for="(content, index) in validateErrorMsg" :key="index">{{ content.message  }}</span>
      </div>
    </Poptip>
  </div>
</template>
<script lang="ts">
import { Component, Vue2, Prop, Watch } from "@ivy/admin2/vue2"
import * as utils from './utils'

@Component({
  inheritAttrs: true
})
export default class Table extends Vue2 {
  @Prop({ default: () => [], required: false }) rules: any[]        // 规则验证
  @Prop({ default: 'Z', required: false }) maxCol: string     // 最大列数
  @Prop({ default: 10000, required: false }) maxRow: number   // 最大行数
  @Prop({ default: false, required: false }) preview: boolean // 是否开启内容预览
  @Prop({ default: 'A', required: false }) startCol: string   // 表格开始列
  @Prop({ default: 'col', required: false }) dataType: string  // 设置数据格式
  @Prop({ default: '上传表格', required: false }) title: string // 按钮名称
  @Prop({ default: 256, required: false }) fileSize: number    // 限定文件大小
  // 保留字段，目前应用意义不大
  @Prop({ default: false, required: false }) colName: boolean  // 是否获取到列的名称(eg: A、B)，仅当colTitle为true的时候生效
  @Prop({ default: true, required: false }) colTitle: boolean  // 是否获取列头title(第一行默认为title，false会把第一行数据过滤)
  @Prop({ default: true }) hasIcon: boolean
  @Prop({ default: 'default' }) btnSize: string
  @Prop({ default: 'default' }) btnType: string
  @Prop({ default: false }) limitXlsx: boolean
  currentFile: any = {}
  validateMessage: any[] = []  // 验证结果集合
  dataList: any[] = []         // 解析结果集合
  hasUpload: boolean = false   // 是否已上传

  get previewCols() {
    if (!this.preview) return
    if (this.dataList.length <= 0) return this.rules && this.rules.map(r => r.col) || []
    if (this.dataType === 'row') {
      let keyIndex = this.colName ? 1 : 0
      return Object.keys(this.dataList[keyIndex]).map(r => this.dataList[keyIndex][r])
    }
    if (this.dataType === 'col') {
      let rowKey = this.colName ? '1' : '0'
      return this.dataList.map(r => r[rowKey])
    }
  }

  get validateErrorMsg() {
    return this.validateMessage.filter(r => !r.validate)
  }

  // 需要优化
  get tableList() {
    if (!this.preview) return
    let list = []
    let keyIndex = this.colName ? 1 : 0
    if (this.dataType === 'row') {
      list = this.dataList.map(el => Object.keys(el).map(r => el[r]))
    }
    if (this.dataType === 'col') {
      this.dataList.map((el, index) => {
        Object.keys(el).map(r => {
          if (typeof list[+r] !== 'object') list[+r] = []
          list[+r][index] = el[r]
        })
      })
    }
    list.splice(0, keyIndex + 1)
    return list
  }

  get maxSize() {
    return (this.fileSize > 1024 ? 1024 : this.fileSize)
  }

  // emit表格结果
  @Watch('dataList', { immediate: false, deep: true })
  onDataListChange(val) {
    this.emitData(val)
  }

  mounted() {
    console.log('fffff', this.hasIcon)
  }

  // 需要优化
  emitData(val) {
    let result = val
    if (!this.colTitle) {
      let res = JSON.parse(JSON.stringify(this.dataList))
      if (this.dataType === 'row') {
        result = res.splice(this.colName ? 2 : 1)
        let len = result.length - 1
        for(let i = len; i >= 0; i--) {
          let validate = Object.keys(result[i]).some(r => !!result[i][r])
          if (!validate) {
            result.splice(i, 1)
          } else {
            break
          }
        }
      }
      if (this.dataType === 'col') {
        result = res.map(el => {
          this.colName ? delete el[0] && delete el[1] : delete el[0]
          el = Object.keys(el).map((key, index) => {
            return { [index]: el[key] }
          })
          return el
        })
      }
    }
    this.$emit('updateData', result, this.currentFile)
  }

  clickHandler() {
    (this.$refs['hiddenFile'] as any).click()
  }

  fileChangeHandler(e) {
    if (!e.target.files) return
    const file = e.target.files[0]
    this.currentFile = file
    e.target.value = null
    if (!file.name || !(file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
      return this.$Message.error('文件格式不正确')
    }
    if (file.size / 1024 > this.maxSize) return this.$Message.error(`文件大小不能超过${this.maxSize}kb`)
    this.getExcelTable(file)
  }

  // 获取表格内容
  async getExcelTable(file) {
    let cont = await utils.getFileContent(file)
    let xlsx = window['XLSX'].read(cont, { type: 'binary' })
    let sheet = xlsx.Sheets[xlsx.SheetNames[0]]
    if (!sheet['!ref']) return this.$Message.error('不允许上传空文件')
    let [, colStart, rowStart, symbol, colEnd, rowEnd] = sheet['!ref'].match(/([A-Z])(\d+)(:*)([A-Z]*)(\d*)/)
    if (colStart !== this.startCol) return this.$Message.error(`表格请从第${this.startCol}列开始`)
    let keys: any = Object.keys(sheet).filter(k => !['!ref', '!margins'].includes(k))
    let rowK: any = [...new Set(keys.map(r => +r.replace(/[A-Z]+/, '')))]
    let colK: any = [...new Set(keys.map(r => r.replace(/\d+/, '')))]
    rowEnd = rowK.length ? Math.max(...rowK) : 0
    colEnd = colK.sort((a, b) => utils.str2AsciiNum(b) - utils.str2AsciiNum(a))[0] || 0
    if (!rowEnd && !colEnd) return this.$Message.error('不允许上传空内容的文件')
    if (this.dataType === 'row') {
      this.dataList = this.tableFormatRow(sheet, rowStart, rowEnd, colStart, colEnd)
    } else {
      this.dataList = this.tableFormatCol(sheet, rowStart, rowEnd, colStart, colEnd)
    }
    this.hasUpload = true
    if (this.rules.length <= 0) return
    this.validater(this.dataList)
  }

  // 数据校验
  validater(data) {
    if (this.dataType === 'row') return this.validateTypeRow(data)
    return this.validateTypeCol(data)
  }

  // dataType === 'row'数据验证
  validateTypeRow(data) {
    let message = this.rules.map(rules => {
      let matchIndex = []
      let col = this.colName ? 1 : 0
      Object.keys(data[col]).forEach(r => {
        if (data[col][r] === rules.col) (matchIndex = [...matchIndex, r])
      })
      if (rules.required && matchIndex.length <= 0) {
        return { validate: false, message: `缺少${rules.col}列` }
      }
      if (rules.empty) return { validate: true }
      let validEmpty = matchIndex.every(key => {
        return data.every(d => !!d[key])
      })
      if (validEmpty) return { validate: true }
      return { validate: false, message: `${rules.col}列不允许存在空值` }
    })
    this.validateMessage = message
    message.forEach(el => {
      if (!el.validate) this.$Message.error(el.message)
    })
  }

  // dataType === 'col'数据格式验证
  validateTypeCol(data: any[]) {
    let message = this.rules.map(rules => {
      let rowKey = this.colName ? '1' : '0'
      let matchaArr = data.filter(r => r[rowKey] === rules.col)
      if (rules.required && matchaArr.length <= 0) {
        return { validate: false, message: `缺少${rules.col}列` }
      }
      if (rules.empty) return { validate: true }
      let validEmpty = matchaArr.every(d => Object.keys(d).every(c => !!d[c]))
      if (validEmpty) return { validate: true }
      return { validate: false, message: `${rules.col}列不允许存在空值` }
    })
    this.validateMessage = message
    message.forEach(el => {
      if (!el.validate) this.$Message.error(el.message)
    })
  }

  // row遍历结果
  tableFormatRow(sheet, rowStart, rowEnd, colStart, colEnd) {
    let table = []
    if (this.colName) {
      let tableColName = {}
      let tableColIndex = 0
      for (let c = colStart; utils.str2AsciiNum(c) <= utils.str2AsciiNum(colEnd); c = utils.nextStr(c)) {
        tableColName[tableColIndex++] = c
      }
      table.push(tableColName)
    }
    for (let r = +rowStart, i = 1; r <= +rowEnd; r++, i++) {
      let row = {}
      let colIndex = 0
      for (let c = colStart; utils.str2AsciiNum(c) <= utils.str2AsciiNum(colEnd); c = utils.nextStr(c)) {
        row[colIndex++] = sheet[c + r] && sheet[c + r].w
      }
      table.push(row)
    }
    return table
  }

  // col遍历结果
  tableFormatCol(sheet, rowStart, rowEnd, colStart, colEnd) {
    let table = []
    for (let c = colStart; utils.str2AsciiNum(c) <= utils.str2AsciiNum(colEnd); c = utils.nextStr(c)) {
      let row = {}
      let colIndex = 0
      if (this.colName) row[colIndex++] = c
      for (let r = +rowStart, i = 1; r <= +rowEnd; r++, i++) {
        row[colIndex++] = sheet[c + r] && sheet[c + r].w
      }
      table.push(row)
    }
    return table
  }

  // 获取校检
  getValidate() {
    return this.validateErrorMsg && !this.validateErrorMsg.length
  }
}
</script>
<style lang="less" scoped>
.uploadExcel {
  display: flex;

  .hidden {
    display: none;
  }

  .preview {
    max-height: 350px;
    overflow: scroll;
    &>table {
      font-family: Consolas,Menlo,Courier,monospace;
      font-size: 12px;
      border-collapse: collapse;
      border-spacing: 0;
      empty-cells: show;
      border: 1px solid #e9e9e9;
      min-width: 100%;
      margin-bottom: 24px;

      th {
        border: 1px solid #e9e9e9;
        padding: 8px 16px;
        text-align: left;
        background: #f7f7f7;
        white-space: nowrap;
        color: #5c6b77;
        font-weight: 600;
      }

      td {
        border: 1px solid #e9e9e9;
        padding: 8px 16px;
        text-align: left;
      }
    }
  }

  .tips {
    .alert-tips {
      color: #ed4014;
      font-size: 20px;
      cursor: pointer;
    }

    .error {
      display: flex;
      flex-direction: column;
      color: #ed4014;
      span {
        padding: 0 0 10px;
      }
    }
  }
}
</style> -->
