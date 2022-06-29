<template>
  <dv-border-box-12 :color="['#409EFF', '#909399']">
    <div class="container">
      <Default v-show="defaultShow" />
    </div>
  </dv-border-box-12>
</template>

<script>
import Default from './Default'
export default {
  components: {
    Default
  },
  data() {
    return {
      defaultShow: true,
      pageArray: ['default', 'register', 'login']
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
