<template>
  <dv-border-box-12 :color="['#409EFF', '#F56C6C']">
    <div class="container">
      <Default v-show="defaultShow" />
      <TextInput v-show="textInputShow" />
      <ExcelImport v-show="excelImportShow" />
    </div>
  </dv-border-box-12>

</template>

<script>
import Default from './Default'
import TextInput from './TextInput'
import ExcelImport from './ExcelImport'
export default {
  components: {
    Default,
    TextInput,
    ExcelImport
  },
  data() {
    return {
      defaultShow: true,
      textInputShow: false,
      excelImportShow: false,
      pageArray: ['default', 'textInput', 'excelImport']
    }
  },
  created() {
    this.$bus.$on('change-show-3', this.changeShow)
  },
  methods: {
    changeShow(pageName) {
      console.log('receive pageName:', pageName)
      this.pageArray.forEach(item => {
        if (item === pageName) {
          this[item + 'Show'] = true
        } else {
          this[item + 'Show'] = false
        }
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
}

</style>
