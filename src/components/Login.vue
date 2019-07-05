<template>
  <div>
    <div id="fb-root"></div>
    <div class="img-header">
      <img src="../assets/img/notes.svg">
    </div>
    <el-row>
      <el-col :xs="{span: 18, offset: 3}" :sm="{span: 18, offset: 3}" :md="{span: 8, offset: 8}">
        <div class="form-login">
          <el-form ref="form" :model="form" :rules="rules">
            <el-form-item prop="username">
              <el-input placeholder="請輸入帳號" v-model="form.username">
                <template slot="prepend">帳號</template>
                <template slot="suffix"><router-link to="/signup">註冊會員</router-link></template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" placeholder="請輸入密碼" v-model="form.password">
                <template slot="prepend">密碼</template>
                <template slot="suffix"><router-link to="/forgetpassword">忘記密碼</router-link></template>
              </el-input>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item class="align-left">
                  社群登入：
                  <svg class="icon" aria-hidden="true" @click="FBLogin">
                    <use xlink:href="#icon-Facebook"></use>
                  </svg>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-google"></use>
                  </svg>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item class="align-right">
                  <el-button type="primary" @click="onSubmit('form')">登入</el-button>
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
  export default {
    name: 'Login',
    data() {
      return {
        data: {
          username: 'admin',
          password: 'admin'
        },
        form: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '請輸入帳號', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '請輸入密碼', trigger: 'blur' }
          ]
        },
        FBProfile : {},
        authorized: false
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if(valid && this.form.username == this.data.username && this.form.password == this.data.password) {
            console.log('submit success')
          } else {
            this.$message.error('帳號密碼錯誤');
            return false;
          }
        })
      },
      getFBProfile () {
        // eslint-disable-next-line
        FB.api('/me?fields=name,id,email', function (response) {
          console.log('res in graphAPI', response)
        })
      },
      FBLogin () {
        let vm = this
        // eslint-disable-next-line
        FB.login(function (response) {
          vm.getFBProfile()
          console.log('res', response)
        }, {
          scope: 'email, public_profile',
          return_scopes: true
        })
      },
      statusChangeCallback (response) {
        let vm = this
        if (response.status === 'connected') {
          vm.authorized = true
          vm.getFBProfile()
        } else if (response.status === 'not_authorized') {
          vm.authorized = false
        } else {
          vm.authorized = false
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
a {
  color: #303133;
  text-decoration: none;
  &:hover {
    color: #909399;
  }
  &::before {
    content: "|";
    display: inline-block;
    padding-right: 13px;
    color: #DCDFE6;
  }
}
.icon {
  font-size: 20px;
  margin-right: .5rem;
}

.form-login::v-deep .el-form-item__error {
  left: 70px;
}
</style>
