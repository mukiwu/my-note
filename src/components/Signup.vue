<template>
  <div>
    <div class="img-header">
      <img src="../assets/img/register.svg">
    </div>
    <el-row>
      <el-col :xs="{span: 18, offset: 3}" :sm="{span: 18, offset: 3}" :md="{span: 8, offset: 8}">
        <div class="form-register">
          <el-form ref="form" :model="form" :rules="rules">
            <el-form-item prop="username">
              <el-input placeholder="格式為 E-mail" v-model="form.username">
                <template slot="prepend">帳號</template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" placeholder="需英數混合，6 個字元以上" v-model="form.password">
                <template slot="prepend">密碼</template>
              </el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
              <el-input type="password" placeholder="請再次輸入密碼" v-model="form.checkPass">
                <template slot="prepend">密碼確認</template>
              </el-input>
            </el-form-item>
            <el-form-item prop="nickname">
              <el-input type="text" placeholder="可使用中文/英文/數字，以及_" v-model="form.nickname">
                <template slot="prepend">暱稱</template>
              </el-input>
            </el-form-item>
            <el-row>
              <el-col :span="24">
                <el-form-item class="align-right">
                  <el-button type="primary" @click="onSubmit('form')">註冊</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
  name: 'register',
  data() {
    let checkUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('帳號不能為空'));
      }
      // eslint-disable-next-line
      let emailRule = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let matchValue = value.match(emailRule);
      if (matchValue == null) {
        callback(new Error('電子郵件地址必須包括 ( @ 和 . )'));
      } else {
        callback()
      }
    };
    let validatePass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('密碼不能為空'));
      }
      let passRule = /^([a-zA-Z]+\d+|\d+[a-zA-Z]+)[a-zA-Z0-9]*$/;
      let matchValue = value.match(passRule);
      if (value.length < 6) {
        callback(new Error('密碼長度太短，請勿低於 6 個字元'))
      } else if (matchValue == null){
        callback(new Error('密碼須為英數混合'))
      } else {
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error('密碼確認不能為空'))
      } else if (value != this.form.password) {
        callback(new Error('兩次密碼輸入不相同'))
      } else {
        callback()
      }
    };
    let checkNickname = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('暱稱不能為空'));
      }
      let nameRule = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
      let matchValue = value.match(nameRule);
      if (matchValue == null) {
        callback(new Error('暱稱含有禁止的字元(只能使用中文、英文、數字，以及 _ '))
      } else {
        callback()
      }
    };
    // eslint-disable-next-line
    let second = () => {
      for( let i = 2; i > 0; i-- ) {
        window.setTimeout(function() {
          console.log(i);
        }, 2000);
      }
    };
    return {
      form: {
        username: '',
        password: '',
        checkPass: '',
        nickname: ''
      },
      rules: {
        username: [
          { validator: checkUsername, trigger: 'blur'}
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        nickname: [
          { validator: checkNickname, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$refs[formName].resetFields();
          this.$message({
            message: '註冊成功，即將跳轉至登入頁面',
            type: 'success'
          });
          setTimeout(() => {
            this.$router.push('/login');
          }, 2000)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>

<style scoped lang="scss">
.form-register::v-deep .el-form-item__error {
  left: 70px;
}
</style>