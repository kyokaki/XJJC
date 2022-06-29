<template>
  <el-container>
    <!-- <Menu /> -->
    <Main />
  </el-container>
</template>

<script>
import { HttpJsonRpcConnector, LotusClient, LightWalletProvider } from 'filecoin.js'
import BigNumber from 'bignumber.js'
import Menu from '@/views/Fil/Menu'
import Main from '@/views/Fil/Main'
export default {
  name: 'Layout',
  components: {
    Menu,
    Main

  },
  data() {
    return {

    }
  },
  created() {
    const glifNodeUrl = 'https://dev.node.glif.io/calibrationapi/lotus/rpc/v0'
    const glifNodeConnection = new HttpJsonRpcConnector({ url: glifNodeUrl })
    const gilfClient = new LotusClient(glifNodeConnection)
    const account = 'test'
    const password = 'testPws'
    // 创建轻钱包
    async function createLightWallet() {
      try {
        const lightWallet = new LightWalletProvider(gilfClient, () => password, account)
        // 创建钱包，返回助记词
        const mnemonic = await lightWallet.createLightWallet(password)
        console.log('mnemonic:', mnemonic)
        // 生成钱包文件
        const encryptedWallet = await lightWallet.keystore.serialize()
        console.log('encryptedWallet:', encryptedWallet)
        // 钱包地址
        const address = await lightWallet.getDefaultAddress()
        console.log('address:', address)
      } catch (error) {
        console.log(error)
      }
    }
    // createLightWallet()

    // 使用钱包转账

    async function sendFromLightWallet() {
      try {
        const mnemonic = 'enhance depth equip call dice wool real obtain black lion often best'
        // 创建轻钱包
        const lightWallet = new LightWalletProvider(gilfClient, () => password, account)
        // 通过助记词密码登录钱包
        await lightWallet.recoverLightWallet(mnemonic, password)

        // 获取钱包地址
        const address = await lightWallet.getDefaultAddress()
        // 转账金额
        const amount = new BigNumber(0.001).multipliedBy(Math.pow(10, 18))
        // To
        const To = 't1323kq3drbqpd6cvfyah22ljwob3wlem65tkhyha'
        console.log('address:', address)
        // 创建转账交易
        const message = await lightWallet.createMessage({
          From: address,
          To: To,
          // 金额
          Value: amount
        })
        // 签名 && 发送
        const signedMessage = await lightWallet.signMessage(message)
        // 开始交易，返回交易ID
        const msgCid = await lightWallet.sendSignedMessage(signedMessage)
        console.log('msgCid:', msgCid)
      } catch (error) {
        console.log(error)
      }
    }
    // sendFromLightWallet()
  },
  methods: {

  }

}
</script>

<style>
.el-container {
  background: rgb(244, 244, 245);
  margin: 0 auto;
  height: 100%;
}
.clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .box-card {
    padding: 10px;
  }
   .el-header{
    background:white
  }
</style>
