<template>
  <div class="first-show">
    <div>
      <div>账号: {{ username }}</div>
      <div>地址: {{ address }}</div>
      <div>余额: {{ amount }}</div>
    </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      username: undefined,
      password: undefined,
      address: undefined,
      amount: undefined,
      keystore: undefined,
      defaultShow: true
    }
  },
  computed: {
    ...mapGetters({
      lightWallet: 'lightWallet'
    })
  },
  created() {
    this.$bus.$on('query_account', this.getAccount)
  },
  methods: {
    getAccount({ username, password, address, keystore, amount }) {
      console.log(username, password, address, keystore, amount)
      this.username = username
      this.password = password
      this.address = address
      this.amount = amount
      this.keystore = keystore
    }
  }
}
</script>

<style lang="scss" scoped>
.first-show {
    width: 100%;
    position: relative;
    padding-left: 20%;
    top: 45%;
    flex-flow: column;
    display: flex;
    overflow: hidden;
  > .title {
    width: 100%;
  }
  > div {

    display: block;
    height: 50%;
  }
}

</style>
