
<template>
  <div class="first-show">
    <div style="position:absolute">执行转账</div>
    <el-link type="primary" @click="dialogVisible = true">执行转账</el-link>
    <!-- <el-link type="primary" @click="changeShow('excelImport')">执行</el-link> -->
    <el-dialog
      title="执行转账"
      :visible.sync="dialogVisible"
    >
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="sendArray"
        border
        fit
        highlight-current-row
        size="mini"
        empty-text="No data"
      >
        <el-table-column align="center" label="from" prop="from">
          <template slot-scope="{ row }">
            <span>{{ row.from }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="to">
          <template slot-scope="{ row }">
            <span>{{ row.to }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="amount">
          <template slot-scope="{ row }">
            <span>{{ row.amount }}</span>
          </template>
        </el-table-column>

      </el-table>

      <el-form>
        <el-form-item
          style="margin: 10px auto; text-align: center;"
        >
          <el-button type="primary" @click="startBatchTransfer">执行</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>

</template>

<script >
export default {
  data() {
    return {
      account: {
        address: undefined
      },
      sendArray: [],
      listLoading: false,
      tableKey: 0,
      dialogVisible: false
    }
  },
  created() {
    this.$bus.$on('query_account', this.getAccount)
    this.$bus.$on('input_sendArray', this.getSendArray)
    this.$bus.$on('close-dialog', () => {
      this.dialogVisible = false
    })
  },
  methods: {
    startBatchTransfer() {
      if (this.sendArray.length <= 0) {
        return this.$message.error('请先输入转账的对象地址和金额')
      }
      this.$bus.$emit('start-batch-transfer', this.sendArray)
    },
    getSendArray(array) {
      console.log('receive  sendArray### ', array)
      this.sendArray = array.map(item => {
        return {
          from: this.account.address,
          to: item.to,
          amount: item.amount
        }
      })
      console.log('receive  sendArray### ', this.sendArray)
    },
    getAccount(account) {
      console.log('receive  account### ', account)
      this.account.address = account?.address
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
