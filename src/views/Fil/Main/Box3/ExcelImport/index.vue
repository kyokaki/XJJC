<template>
  <div class="box-container">
    <div class="inner-box-title">
      <el-tag effect="plain">Excel Import</el-tag>
    </div>
    <div class="inner-box-body">
      <el-link type="primary">
        <a href=" ./batch_transfer_excel_template.xlsx " class="excel-template">Excel Template Download：batch_transfer_excel_template.xlsx</a>
      </el-link>
      <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
      <el-button type="primary" @click="goBack('default')">返回</el-button>
    </div>

  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import { mapActions } from 'vuex'
import BigNumber from 'bignumber.js'
export default {
  name: 'Login',
  components: {
    UploadExcelComponent
  },
  data() {
    return {
      form: {
        batchTransfer: undefined
      },
      sendArray: []
    }
  },
  watch: {
    'sendArray': function(newVal) {
      console.log('go to 执行转账', newVal)
      this.$bus.$emit('input_sendArray', this.sendArray)
    }
  },
  created() {

  },
  methods: {

    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      this.sendArray = [...results]
      console.log('#######sendArray####', this.sendArray)
    },
    ...mapActions({ setFil: 'fil/setFil' }),
    toBatchTransfer() {
      this.$bus.$emit('batch-transfer', this.sendArray)
    },
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
    goBack(pageName) {
      this.$bus.$emit('change-show-3', pageName)
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
