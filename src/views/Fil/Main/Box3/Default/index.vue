<template>
  <div class="first-show">
    <div style="position:absolute">批量录入</div>
    <el-link type="primary" @click="changeShow('textInput')">Text 输入</el-link>
    <el-link type="primary" @click="changeShow('excelImport')">Excel 导入</el-link>
  </div>

</template>

<script >
export default {
  methods: {
    data() {
      return {

      }
    },
    changeShow(pageName) {
      console.log('click pageName:', pageName)
      this.$bus.$emit('change-show-3', pageName)
    }
  }
}
</script>

<style lang="scss" scoped>
.first-show {
  width: 100%;
  height:100%;
  display: flex;
  justify-content: space-around;
}

</style>
