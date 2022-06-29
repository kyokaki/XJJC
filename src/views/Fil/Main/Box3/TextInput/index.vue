<!--
 * @Description:
 * @Author: Liyajun
 * @Date: 2022-06-17 10:41:57
 * @FilePath: \xjcc-erp-h5\src\views\Fil\Main\Box3\TextInput\index.vue
 * @LastEditTime: 2022-06-17 11:54:35
 * @LastEditors: Liyajun
-->
<template>
  <div class="box-container">
    <div class="inner-box-title">
      <el-tag effect="plain">Text 输入</el-tag>
    </div>
    <div class="inner-box-body">
      <el-form ref="batchTransferForm" :model="form" label-width="25%" size="mini">
        <el-form-item :label="'To'+separator+'Amount'">
          <el-input v-model="form.sendToAndAmount" type="textarea" style="width:80%" clearable rows="10" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="goBack('default')">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import BigNumber from 'bignumber.js'
export default {
  name: 'Login',
  data() {
    return {
      form: {
        sendToAndAmount: undefined
      },
      separator: '::,::',
      sendArray: []
    }
  },
  watch: {
    'form.sendToAndAmount': function(newVal) {
      const temp = newVal.trim()
      const separator = this.separator
      if (temp.length > 0) {
        if (temp.indexOf(separator) > 0) {
          this.sendArray = temp.split(/\s+/).map(item => {
            const list = item.split(separator)
            return {
              to: list[0],
              amount: list[1]
            }
          })
        }
        console.log('#####sendArray#### ', this.sendArray)
      }
    },
    'sendArray': function(newVal) {
      console.log('go to 执行转账', newVal)
      this.$bus.$emit('input_sendArray', this.sendArray)
    }
  },
  created() {

  },
  methods: {
    ...mapActions({ setFil: 'fil/setFil' }),
    goBack(pageName) {
      this.$bus.$emit('change-show-3', pageName)
    }

  }
}
</script>

<style lang="scss" scoped>
  .box-container {
  justify-content: space-around;
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
