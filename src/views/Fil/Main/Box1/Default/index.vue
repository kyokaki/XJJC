<!--
 * @Description:
 * @Author: Liyajun
 * @Date: 2022-06-16 15:00:43
 * @FilePath: \xjcc-erp-h5\src\views\Fil\Main\Box1\Default\index.vue
 * @LastEditTime: 2022-06-17 10:48:13
 * @LastEditors: Liyajun
-->
<template>
  <div class="first-show">
    <div style="position:absolute">用户登录</div>
    <el-link type="primary" @click="changeShow('login')">登录</el-link>
    <el-link type="primary" @click="changeShow('register')">注册</el-link>
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
      this.$bus.$emit('change-show-1', pageName)
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
