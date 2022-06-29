<template>
  <div class="box-container">
    <div class="inner-box-title">
      <el-tag effect="plain">创建轻钱包</el-tag>
    </div>
    <div class="inner-box-body">
      <el-form ref="createAccountForm" :model="form" label-width="35%" size="mini">
        <el-form-item label="账号">
          <el-input v-model="form.username" style="width:50%" clearable />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" style="width:50%" type="password" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('createAccountForm')">创建</el-button>
          <el-button type="primary" @click="goBack('default')">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog
      title="账号信息"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <div v-for="(value, key) of lightWalletInfo" :key="key">
        <div> <label :for="key"><el-tag>{{ key }}</el-tag> </label></div><div :id="key"> {{ value }}</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="goToLogin">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { HttpJsonRpcConnector, LotusClient, LightWalletProvider } from 'filecoin.js'
import { getCurrentTime } from '@/utils/date-time'
import { export_json_to_excel } from '@/excel/export2Excel'
export default {
  data() {
    return {
      form: {
        username: undefined,
        password: undefined
      },
      glifNodeUrl: 'https://dev.node.glif.io/calibrationapi/lotus/rpc/v0',
      gilfClient: undefined,
      lightWalletInfo: undefined,
      dialogVisible: false,
      list: [],
      accountExcelMapping: [
        {
          text: 'username',
          value: 'username'
        },
        {
          text: 'password',
          value: 'password'
        },
        {
          text: 'mnemonic',
          value: 'mnemonic'
        },
        {
          text: 'address',
          value: 'address'
        },
        {
          text: 'keystore',
          value: 'keystore'
        }

      ]
    }
  },
  created() {
    const glifNodeConnection = new HttpJsonRpcConnector({ url: this.glifNodeUrl })
    this.gilfClient = new LotusClient(glifNodeConnection)
  },
  methods: {
    goToLogin() {
      this.dialogVisible = false
      this.goBack('login')
    },
    exportExcel() {
      const excelName = 'New Light wallet Account Message' + '_' + getCurrentTime()
      const tHeader = this.accountExcelMapping.map((item) => item.text)
      const filterVal = this.accountExcelMapping.map(
        (item) => item.value
      )
      const data = this.formatJson(filterVal, this.list)
      export_json_to_excel(tHeader, data, excelName)
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]))
    },
    goBack(pageName) {
      this.$bus.$emit('change-show-1', pageName)
    },
    async submitForm(form) {
      // 创建轻钱包
      const lightWalletInfo = await this.createLightWallet(this.form)
      // 提示创建成功，并展示助记词
      if (lightWalletInfo) {
        this.lightWalletInfo = lightWalletInfo
        this.list = [lightWalletInfo]
        this.$notify({
          title: '创建成功',
          message: this.$createElement('i', { style: 'color: green' }, '创建钱包成功，记得保存好助记词！')
        })
        // 导出信息
        this.exportExcel()
        this.dialogVisible = true
      }
    },
    async createLightWallet({ username, password }) {
      try {
        const lightWallet = new LightWalletProvider(this.gilfClient, () => password, username)
        // 创建钱包，返回助记词
        const mnemonic = await lightWallet.createLightWallet(password)
        console.log('mnemonic:', mnemonic)
        // 生成钱包文件
        const keystore = await lightWallet.keystore.serialize()
        console.log('keystore:', keystore)
        // 钱包地址
        const address = await lightWallet.getDefaultAddress()
        console.log('address:', address)
        return {
          username,
          password,
          mnemonic,
          address,
          keystore
        }
      } catch (error) {
        console.log(error)
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
    padding: 5%;
    }
    .inner-box-body {
      flex: 1;

    }
  }
</style>
