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
              ref="Activeform"
              :model="Activeform"
              class="register-form"
              autocomplete="on"
              :inline="true"
              label-position="top"
            >
              <el-form-item prop="firstName" label="Activation Code" class="label-form">
                <el-input
                  ref="firstName"
                  v-model="Activeform.code"
                  name="code"
                  type="text"
                  tabindex="1"
                  autocomplete="off"
                />
              </el-form-item>

              <br>
              <el-form-item prop="email" label="user email">
                <el-input
                  ref="email"
                  v-model="Activeform.email"
                  placeholder="abc@abc.com"
                  name="email"
                  type="text"
                  tabindex="1"
                  autocomplete="off"
                />
              </el-form-item>

              <el-button
                :loading="loading"
                type="primary"
                style="width: 90%; margin-bottom: 30px"
                @click.native.prevent="handleActive"
              >Register</el-button>

            </el-form>
          </div>

        </el-card>
      </el-col>
    </el-row>

  </div>

</template>

<script>
import { Isactive } from '../../api/user'
export default {
  name: 'Register',
  data() {
    return {
      loading: false,
      Activeform: {
        email: '',
        code: ''
      }

      //   loading: false

    }
  },
  created() {

  },
  methods: {
    handleActive() {
      // this.$refs.dataForm.validate(async(valid) => {
      //   if (valid) {
      // await
      this.loading = true
      const email = this.Activeform.email
      const code = this.Activeform.code
      //   console.log(this.Activeform)
      // var id = this.$store.getters.id
      Isactive(email, code).then((response) => {
        console.log(response)
        if (response.meta.message === 'UserIsActive') {
          this.$router.push('/login')
        } else {
          this.$notify({
            title: 'error',
            message: 'user does not esist',
            type: 'error',
            duration: 5000
          })
        }
        this.loading = false

        this.$notify({
          title: 'موفق',
          message: 'success',
          type: 'success',
          duration: 5000
        })

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
      /* background: linear-gradient(90deg, rgba(106,148,198,0.8379726890756303) 3%, rgba(51,200,46,0.3449754901960784) 49%, rgba(88,91,99,0.8603816526610644) 97%);
       */
       background: linear-gradient(90deg, rgba(219, 220, 221, 0.838) 3%, rgba(173, 197, 172, 0.345) 49%, rgba(88,91,99,0.8603816526610644) 97%);

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
      color: blue ;
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

