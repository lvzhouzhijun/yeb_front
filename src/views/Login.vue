<template>
  <div>
    <el-form :rules="rules" ref="loginForm" :model="loginForm" class="loginContainer"
        element-loading-text="正在登陆中......."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0,0,0,0.8)"
      >
      <h3 class="loginTitle">yeb登录</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="loginForm.username" placeholder="请输入用户名"/>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" placeholder="请输入密码" type="password" auto-complete="false" />
      </el-form-item>
      <el-form-item prop="code">
        <el-input type="text" auto-complete="false" v-model="loginForm.code"
                  placeholder="点击图片更换验证码" style="width: 250px;margin-right: 5px" />
       <img :src="captchaUrl" @click="updateCaptcha">
      </el-form-item>
      <el-checkbox v-model="checked" class="loginRemember">记住我</el-checkbox>
      <el-button type="primary" style="width: 100%" @click="submitLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script>


  export default {
    name: "Login.vue",
    data() {
      return {
        captchaUrl: '/captcha?time=' + new Date(),
        loginForm: {
          username: 'admin',
          password: 'abc',
          code: ''
        },
        loading: false,
        checked: true,
        rules: {
          username: [{required:true,message:'请输入用户名',trigger:'blur'}],
          password: [{required:true,message:'请输入密码',trigger:'blur'}],
          code: [{required:true,message:'请输入验证码',trigger:'blur'}]
        }
      }
    },
    methods: {
      // 点击验证码触发的事件
      updateCaptcha(){
        this.captchaUrl= '/captcha?time=' + new Date()
      },
      // 点击登录触发的事件
      submitLogin(){
        this.$refs.loginForm.validate((validate) => {
          // 登录前的校验
          if(validate){
            this.loading = true
            this.postRequest('/login',this.loginForm).then(resp => {
              if(resp){
                this.loading = false
                // 获取请求中的 token
                const tokeStr = resp.obj.tokenHead + resp.obj.token
                // 存储 token
                window.sessionStorage.setItem("tokenStr",tokeStr)
                // 跳转页面
                this.$router.replace('/home')
              }
            })
          }else{
            this.$message.error('请输入所有的表单');
            return false
          }
        })
      }
    }
  }
</script>

<style>
.loginContainer{
  border-radius: 15px;
  background-clip: padding-box;
  margin: 100px auto;
  width: 350px;
  padding: 15px 35px;
  background: #7f95a3;
  border: 1px solid #7f95a3;
  box-shadow: 0 0 25px #cac6c6;
}
  .loginTitle{
    margin: 0px auto 40px auto;
    text-align: center;
  }
  .loginRemember{
    text-align: left;
    margin: 0px 0px 15px 0px;
  }
  .el-form-item__content{
    display: flex;
    align-items: center;
  }
</style>