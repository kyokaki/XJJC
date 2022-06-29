<!--
 * @Description:
 * @Author: Liyajun
 * @Date: 2022-06-16 14:32:53
 * @FilePath: \xjcc-erp-h5\src\views\Fil\Main\Box1\index.vue
 * @LastEditTime: 2022-06-17 10:48:03
 * @LastEditors: Liyajun
-->
<template>
  <dv-border-box-12 :color="['#409EFF', '#67C23A']">
    <div class="container">
      <Default v-show="defaultShow" />
      <Register v-show="registerShow" />
      <Login v-show="loginShow" />
    </div>
  </dv-border-box-12>

</template>

<script>
import Default from './Default'
import Register from './Register'
import Login from './Login'
export default {
  components: {
    Default,
    Register,
    Login
  },
  data() {
    return {
      defaultShow: true,
      registerShow: false,
      loginShow: false,
      login: false,
      pageArray: ['default', 'register', 'login']
    }
  },
  created() {
    this.$bus.$on('change-show-1', this.changeShow)
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
