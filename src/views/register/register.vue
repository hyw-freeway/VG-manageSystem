<template>
  <div class="login-container">

    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">注册界面</h3>
      </div>

      <!-- <div
        class="avatar-uploader"
        @click="onChange"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" alt>
        <img v-if="!imageUrl" src="@/assets/1.png" class="avatar" alt />
        <i v-else class="el-icon-plus avatar-uploader-icon" />
      </div>
      <image-cropper
        v-show="imagecropperShow"
        :key="imagecropperKey"
        :width="300"
        :height="300"
        :pid=1
        url="/api/article/uploading"
        lang-type="en"
        @close="close"
        @crop-upload-success="cropSuccess"
      /> -->

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-form-item prop="email">
        <span class="svg-container">
          <svg-icon icon-class="email" />
        </span>
        <el-input
          ref="email"
          v-model="loginForm.email"
          placeholder="邮箱"
          name="email"
          type="text"
          tabindex="3"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip
        v-model="capsTooltip"
        content="Caps lock is On"
        placement="right"
        manual
      >
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="密码"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleRegister"
      >注册</el-button>

      <div style="position: relative">

        <div class="tips">
          <span>Username : admin</span>
          <span />
        </div>
        <div class="tips">
          <span style="margin-right: 18px">Username : editor</span>
          <span />
        </div>
     
        <el-button class="toLogin-button" type="primary" @click="toLogin">
          登录
        </el-button>
      </div>
    </el-form>

    <el-dialog title="Or connect with" :visible.sync="showDialog">
      Can not be simulated on local, so please combine you own business
      simulation! ! !
      <br>
      <br>
      <br>
      <social-sign />
    </el-dialog>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import ImageCropper from '@/components/ImageCropper'
import { register } from '@/api/user'
import { Message } from 'element-ui'
// import SocialSign from './components/SocialSignin'

export default {
  name: 'Register',
  // components: { SocialSign },
  components: { ImageCropper },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      // imagecropperShow: false,
      // imagecropperKey: 0,
      image: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191',
      email: '',
      loginForm: {
        username: '',
        password: '',
        email: '',
        enabled: true
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      // imageUrl: '',
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {

    // cropSuccess(resData) {
    //   this.imagecropperShow = false
    //   this.imagecropperKey = this.imagecropperKey + 1
    //   this.imageUrl = '/api/article/image/'+resData
    // },
    // close() {
    //   this.imagecropperShow = false
    // },
    toLogin() {
      this.$router.push('Login')
    },
    // beforeUpload() {
    //   //   const isJPG = file.type === 'image/jpeg';
    //   //   const isLt2M = file.size / 1024 / 1024 < 2;
    //   //   if (!isJPG) {
    //   //   this.$message.error('上传头像图片只能是 JPG 格式!');
    //   //   }
    //   //   if (!isLt2M) {
    //   //   this.$message.error('上传头像图片大小不能超过 2MB!');
    //   //   }
    //   //   return isJPG && isLt2M;
    // },
    // onChange(file, fileList) {
    //   this.imagecropperShow = true
    //   var _this = this
    //   var event = event || window.event
    //   var file = event.target.files[0]
    //   var reader = new FileReader()
    //   // 转base64
    //   reader.onload = function(e) {
    //     _this.imageUrl = e.target.result // 将图片路径赋值给src
    //     console.log(_this.imageUrl)
    //   }
    //   reader.readAsDataURL(file)
    // },
    // handleChange(res, file) {
    //   // this.imageUrl = URL.createObjectURL(file.raw);
    // },

    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && key >= 'A' && key <= 'Z'
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleRegister() {
      if (this.loginForm.password === '' || this.loginForm.username === '' || this.loginForm.email === '') {
        Message('账号或密码或邮箱不能为空')
      } else {
        
        console.log(this.loginForm)
        register(this.loginForm).then((res) => {
          console.log(res)
          if (res.status == 'success') {
              Message("注册成功，请重新登录")
            this.$router.push('Login')
          } 
          else if(res.msg=="用户名重复，注册失败!"){
              Message("用户名重复，请联系管理员")
          }
          else {
            Message('注册失败，请重新注册')
          }
        })
      }
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }

  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 170px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 80px;
    bottom: 6px;
  }
  .toLogin-button{
      position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}

.avatar-uploader {
  border: 1px dashed rgba(255, 255, 255, 0.1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 88px;
  height: 88px;
  border-radius:50%;
  background-color: #283443;
   margin: 0 auto 20px auto;
}
.avatar-uploader:hover {
  border-color: #409eff;
  width: 88px;
  height: 88px;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 88px;
  height: 88px;
  line-height: 88px;
  text-align: center;
}
.avatar {
  width: 88px ;
  height: 88px;
  display: block;
}
</style>
