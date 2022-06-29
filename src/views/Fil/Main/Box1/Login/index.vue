<template>
  <div class="box-container">
    <div class="inner-box-title">
      <el-tag effect="plain">登录轻钱包</el-tag>
    </div>
    <div class="inner-box-body">
      <el-form ref="loginAccountForm" :model="form" label-width="25%" size="mini">
        <el-form-item label="账号">
          <el-input v-model="form.username" style="width:60%" clearable :disabled="isLogin" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" style="width:60%" type="password" clearable :disabled="isLogin" />
        </el-form-item>
        <el-form-item label="Keystore">
          <el-input v-model="form.keystore" type="textarea" style="width:60%" clearable rows="4" :disabled="isLogin" />
        </el-form-item>
        <el-form-item>
          <el-button v-show="!isLogin" type="primary" @click="loadLightWallet(form)">登录</el-button>
          <el-button v-show="isLogin" type="primary" @click="handlerExit">退出</el-button>
          <el-button v-show="isLogin" type="primary" @click="handlerReflect">刷新</el-button>
          <el-button v-show="isLogin" type="primary" @click="exportPrivateKey">私钥</el-button>
          <el-button v-show="!isLogin" type="primary" @click="goBack('default')">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { HttpJsonRpcConnector, LotusClient, LightWalletProvider } from 'filecoin.js'
import { mapActions } from 'vuex'
import BigNumber from 'bignumber.js'
import { getCurrentTime } from '@/utils/date-time'
import { export_json_to_excel } from '@/excel/export2Excel'
export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: undefined,
        password: undefined,
        keystore: undefined,
        address: undefined
      },
      glifNodeUrl: 'https://dev.node.glif.io/calibrationapi/lotus/rpc/v0',
      gilfClient: undefined,
      lightWalletInfo: undefined,
      isLogin: false,
      lightWallet: undefined,
      sendResults: [],
      tranferRecordExcelMapping: [
        {
          text: 'From',
          value: 'From'
        },
        {
          text: 'To',
          value: 'To'
        },
        {
          text: 'Amount',
          value: 'Amount'
        },
        {
          text: 'MsgCid',
          value: 'MsgCid'
        }
      ]
    }
  },
  created() {
    const glifNodeConnection = new HttpJsonRpcConnector({ url: this.glifNodeUrl })
    this.gilfClient = new LotusClient(glifNodeConnection)
    this.$bus.$on('start-batch-transfer', this.batchTransfer)
  },
  methods: {
    async exportPrivateKey() {
      const lightWallet = this.lightWallet
      const privateKey = await lightWallet.exportPrivateKey(this.form.address)
      console.log('privateKey:', privateKey)
      if (privateKey) {
        var blob = new Blob([JSON.stringify(privateKey)], { type: 'text/plain' })
        var a = document.createElement('a')
        a.download = 'Private Key.txt'
        a.href = window.URL.createObjectURL(blob)
        a.target = '_blank'
        a.style.display = 'none'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      }
    },
    goBack(pageName) {
      this.$bus.$emit('change-show-1', pageName)
    },
    ...mapActions({ setFil: 'fil/setFil' }),
    handlerExit() {
      // this.form.username = undefined
      // this.form.password = undefined
      // this.form.keystore = undefined
      this.isLogin = false
      this.$bus.$emit('query_account', {
        username: undefined,
        password: undefined,
        keystore: undefined,
        amount: undefined,
        address: undefined
      })
    },
    async batchTransfer(array) {
      const lightWallet = this.lightWallet
      let i = 0
      const l = array.length
      for (i; i < l; i++) {
        const item = array[i]
        const requestParam = {
          From: item.from,
          To: item.to,
          Value: new BigNumber(item.amount).multipliedBy(Math.pow(10, 18))
        }
        console.log('#转账参数#', JSON.stringify(requestParam))
        try {
          // 创建转账交易
          const message = await lightWallet.createMessage(requestParam)
          // 签名 && 发送
          const signedMessage = await lightWallet.signMessage(message)
          // 开始交易，返回交易ID
          const msgCid = await lightWallet.sendSignedMessage(signedMessage)
          console.log('msgCid:', msgCid)
          this.sendResults.push({
            From: this.form.address,
            To: item.to,
            Amount: item.amount,
            MsgCid: JSON.stringify(msgCid)
          })
        } catch (e) {
          console.log('转账异常 #requestParam#e#', requestParam, e)
        }
      }
      console.log('#转账完结果#', JSON.stringify(this.sendResults))
      // 导出
      this.exportExcel()
      this.$message.success('批量转账成功，详情请查看导出Excel')
      return this.$bus.$emit('close-dialog')
    },
    exportExcel() {
      const excelName = 'batch_transfer_result' + '_' + getCurrentTime()
      const tHeader = this.tranferRecordExcelMapping.map((item) => item.text)
      const filterVal = this.tranferRecordExcelMapping.map(
        (item) => item.value
      )
      const data = this.formatJson(filterVal, this.sendResults)
      export_json_to_excel(tHeader, data, excelName)
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]))
    },
    async handlerReflect() {
      const amount = await this.queryAmount()
      console.log('amount##########', amount)
      this.$bus.$emit('query_account', {
        username: this.form.username,
        password: this.form.password,
        keystore: this.form.keystore,
        amount: amount,
        address: this.form.address
      })
    },
    async hanlderLogin() {
      this.isLogin = true
      this.setFil({
        key: 'username',
        value: this.form.username
      })
      this.setFil({
        key: 'password',
        value: this.form.password
      })
      this.setFil({
        key: 'keystore',
        value: this.form.keystore
      })
      const amount = await this.queryAmount()
      console.log('amount##########', amount)
      this.$bus.$emit('query_account', {
        username: this.form.username,
        password: this.form.password,
        keystore: this.form.keystore,
        amount: amount,
        address: this.form.address
      })
    },
    async queryAmount() {
      const lightWallet = this.lightWallet
      let amount = lightWallet?.getBalance && await lightWallet.getBalance(this.form.address)
      amount = amount && new BigNumber(amount).dividedBy(Math.pow(10, 18))
      return amount
    },
    async loadLightWallet({ username, keystore, password }) {
      try {
        // 创建轻钱包
        const lightWallet = new LightWalletProvider(this.gilfClient, () => password, username)
        this.lightWallet = lightWallet
        // 通过助记词密码登录钱包
        await lightWallet.loadLightWallet(keystore)
        // 获取钱包地址
        const address = await lightWallet.getDefaultAddress()
        this.form.address = address
        console.log('address:', address)
        const { addresses: originAddress } = JSON.parse(keystore)
        if (originAddress.includes(address)) {
          // 登录成功
          await this.hanlderLogin()
          return this.$message.success('登录成功！')
        } else {
          // 登录失败
          return this.$message.error('登录失败！')
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}

</script>

<style lang="scss" scoped>
  .box-container {
    position:absolute;
    display: flex;
    width: 100%;
    height: 100%;
    flex-flow: column;
    .inner-box-title {
    text-align: center;
    padding: 3%;
    }
    .inner-box-body {
      flex: 1;

    }
  }

</style>
