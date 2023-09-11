<template>

  <div class="rgister-container">

    <el-row :gutter="40">
      <!-- <el-col :span="12">

        <div class="register" />
      </el-col> -->
      <el-col :span="24">
        <el-card class="register-card">

          <div class="register-p">
            <el-form
              ref="registerForm"
              :model="registerForm"
              class="register-form"
              autocomplete="on"
              :inline="true"
              label-position="top"
            >
              <el-form-item prop="firstName" label="firstname" class="label-form">
                <el-input
                  ref="firstName"
                  v-model="registerForm.firstName"
                  name="firstName"
                  type="text"
                  tabindex="1"
                  autocomplete="off"
                />
              </el-form-item>
              <el-form-item prop="lastName" label="lastname">
                <el-input
                  ref="lastName"
                  v-model="registerForm.lastName"
                  name="lastName"
                  type="text"
                  tabindex="1"
                  autocomplete="off"
                />
              </el-form-item><br>
              <el-form-item prop="age" label="age">
                <el-input
                  ref="age"
                  v-model="registerForm.age"
                  name="age"
                  type="text"
                  tabindex="1"
                  autocomplete="off"
                />
              </el-form-item>
              <el-form-item prop="phoneNumber" label="mobileuumber">
                <el-input
                  ref="phoneNumber"
                  v-model="registerForm.phoneNumber"
                  placeholder="0912..."
                  name="phoneNumber"
                  type="text"
                  tabindex="1"
                  autocomplete="off"
                />
              </el-form-item>
              <br>
              <el-form-item prop="email" label="email">
                <el-input
                  ref="email"
                  v-model="registerForm.emailAddress"
                  placeholder="abc@abc.com"
                  name="email"
                  type="text"
                  tabindex="1"
                  autocomplete="off"
                />
              </el-form-item>
              <el-form-item prop="password" label="password">
                <el-input
                  ref="password"
                  v-model="registerForm.password"
                  name="password"
                  type="text"
                  tabindex="1"
                  autocomplete="off"
                />
              </el-form-item>
              <!-- <el-form-item prop="re_password" label="تکرار رمز عبور">
                <el-input
                  ref="re_password"
                  v-model="registerForm.re_password"
                  name="re_password"
                  type="text"
                  tabindex="1"
                  autocomplete="off"
                />
              </el-form-item> -->
              <el-button
                :loading="loading"
                type="primary"
                style="width: 90%; margin-bottom: 30px"
                @click.native.prevent="handleRegister"
              >Register</el-button>

            </el-form>
          </div>

        </el-card>
      </el-col>
    </el-row>

  </div>

</template>

<script>
import { Register } from '../../api/user'
export default {
  name: 'Register',
  data() {
    return {
      loading: false,
      registerForm: {
        firstName: '',
        lastName: '',
        age: '',
        password: '',
        emailAddress: '',
        phoneNumber: '',

        loading: false

      }

    }
  },
  created() {

  },
  methods: {
    handleRegister() {
      // this.$refs.dataForm.validate(async(valid) => {
      //   if (valid) {
      // await
      this.loading = true
      console.log(this.registerForm)
      // var id = this.$store.getters.id
      Register(this.registerForm).then((response) => {
        // console.log(response)
        // if (response.meta.message === 'Success') {
        //   this.$router.push('/login')
        // }
        this.loading = false
        this.$notify({
          title: 'موفق',
          message: 'success',
          type: 'success',
          duration: 5000
        })
        this.$router.push('/login')

        // console.log(response.meta)
        // this.getContactssTable()

        // if (response.status === 'ok') {
        // //   this.Register()
        //   this.dialogFormVisible = false
        //   this.$notify({
        //     title: 'موفق',
        //     message: response.meta.message,
        //     type: 'success',
        //     duration: 5000
        //   })
        // } else {
        //   this.dialogFormVisible = false
        //   this.$notify({
        //     title: 'خطا',
        //     message: response.meta.message,
        //     type: 'error',
        //     duration: 5000
        //   })
        // }
      }).catch(error => {
        this.loading = false
        this.$notify({
          title: 'خطا',
          message: 'خطایی رخ داده است',
          type: 'error',
          duration: 5000
        })
        console.log(error)
      })
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
    }
  }

}

</script>

  <style scoped>
  .register{
    /* width: 100%; */
    height:  520px;

    /* background-color: aqua; */
   /* background-image: url("img/boat-ocean.jpg"); */

    border-radius: 4px;
      min-height: 36px;
  }
  .register-p{
    width: 100%;
    overflow: hidden;
    /* background-color: aqua; */
    border-radius: 4px;
    min-height: 100%;
    direction: ltr;
    padding-right: 10%;

  }

  .rgister-container{
    justify-content: center;
    align-items: center;
    flex: 1;
    display: flex;
    height: 100%;
   width: 100%;
   background:rgb(224, 223, 223);

   /* background-image: url("img/boat-ocean.jpg"); */

  overflow: hidden;
      direction: ltr;
  }
  .rgister-container .el-card {
    height: 600px;
    border-radius: 20px;
    padding-top: 0;
    padding-bottom: 30px;
    background: linear-gradient(90deg, rgba(219, 220, 221, 0.838) 3%, rgba(173, 197, 172, 0.345) 49%, rgba(88,91,99,0.8603816526610644) 97%);

     /* background-color: rgba(211, 220, 233, 0.568); */
    border: hidden;
    /* box-shadow: 1px 14px 48px 23px rgb(35, 82, 170); */
  }
  .register-card{
margin-right: 5px;
  }
  .label.el-form-item__label {
      padding: 0px;
      font-size: 0.8rem;
      color: white !important;
  }
  .label-form .label {
    color: sblue ;
  }

  .register-form {
          position: relative;
          width: 100%;
          max-width: 100%;
          padding: 100px 35px;
        padding-left: 120px;
          margin: 0 auto;
          overflow: hidden;
      }
  @media only screen and (max-width: 800px) {
      .login-form{
        display: none;
      }
  }
  </style>

