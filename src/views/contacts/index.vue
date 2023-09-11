<template>
  <el-container>
    <el-header style="padding-top: 20px">
      <CrudButs
        @handel-create="handelCreate"
        @handel-edit="handelEdit"
        @handel-copy="handelCopy"
        @handel-delete="handelDelete"
      />
    </el-header>
    <el-main>
      <el-table
        ref="singleTable"
        v-loading="listLoading"
        :data="tableData"
        style="width: 100%"
        height="500px"
        row-key="code"
        border
        @selection-change="handleCurrentChange"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          type="index"
          label="row"
          sortable
          width="55"
        />
        <el-table-column property="id" label="id" width="50" />

        <el-table-column property="firstName" label="firstName" width="100" />

        <el-table-column
          property="lastName"
          label="lastName"
          width="100"
        />
        <el-table-column
          property="age"
          label="age"
          width="50"
        />
        <el-table-column
          property="email"
          label="email"
          width="150"
        />
        <el-table-column
          property="avatar"
          label="avatar "
          width="100"
        />
        <el-table-column
          property="phoneNumber"
          label="phoneNumber"
          width="150"
        />
        <el-table-column property="address" label="address" width="200" />
        <el-table-column property="creationDate" label="creationDate " width="300" />

      </el-table>
      <!-- Form -->
      <!-- start new code -->
      <el-dialog
        :title="titleDialog"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="handelCloseOnClickOut"
      >
        <el-form
          ref="dataForm"
          :model="form"
          :inline="true"
          :label-position="labelPosition"
        >
          <el-form-item
            prop="firstName"

            label="firstname"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="form.firstName"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item
            prop="lastName"

            label="lastName "
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="form.lastName"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item
            prop="age"

            label="age "
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="form.age"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item
            prop="email"

            label="email"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="form.email"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item
            prop="avatar"

            label="avatar "
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="form.avatar"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item
            prop="phoneNumber"

            label="phoneNumber"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="form.phoneNumber"
              autocomplete="off"
            />
          </el-form-item>

          <el-form-item
            prop="address"

            label="address"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="form.address"
              autocomplete="off"
            />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button
            @click="dialogFormVisible = false"
          >انصراف</el-button>
          <el-button
            type="primary"
            @click="
              titleDialog === 'ایجاد'
                ? createData()
                : updateData()
            "
          >
            ذخیره
          </el-button>
        </span>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
import CrudButs from './components/crud-buts.vue'
import {
  getContactsTable,
  creatContacts,
  deleteContact,
  updateContact

} from '../../api/contacts'
// import {
//   validAlphabetsPE2,
//   validaddress,
//   validMobileNumber,
//   validNumber }
// from '@/utils/validate'
export default {
  name: 'TafsilsBank',
  components: { CrudButs },
  data() {
    var resttt = () => {
      if (this.$refs.dataForm) {
        this.$refs.dataForm.clearValidate()
      }
    }
    // validation
    // var validateAlphabets = (rule, value, callback) => {
    //   if ((value === '') || (value === null)) {
    //     callback()
    //   } else if (!validAlphabetsPE2(value)) {
    //     callback(new Error('لطفا حروف و عدد فارسی  وارد کنید '))
    //   } else {
    //     callback()
    //   }
    // }
    // var validateAddress = (rule, value, callback) => {
    //   if ((value === '') || (value === null)) {
    //     callback()
    //   } else if (!validaddress(value)) {
    //     callback(new Error('لطفا حروف و عدد وارد کنید '))
    //   } else {
    //     callback()
    //   }
    // }
    // var validateMobileNumber = (rule, value, callback) => {
    //   console.log(value)
    //   if ((value === '') || (value === null)) {
    //     callback()
    //   } else if (!validMobileNumber(value)) {
    //     callback(new Error(' لطفا عدد وارد کنید و با 0 شروع میشود '))
    //   } else {
    //     callback()
    //   }
    // }
    // var validateAccountNumber = (rule, value, callback) => {
    //   if ((value === '') || (value === null)) {
    //     callback()
    //   } else if (!validNumber(value)) {
    //     callback(new Error('لطفا عدد وارد کنید '))
    //   } else if (value.length > 20) {
    //     callback(new Error('شماره حساب بیشتر از 20 رقم است'))
    //   } else {
    //     callback()
    //   }
    // }
    // var validateBranchCode = (rule, value, callback) => {
    //   if ((value === '') || (value === null)) {
    //     callback()
    //   } else if (!validNumber(value)) {
    //     callback(new Error('لطفا عدد وارد کنید '))
    //   } else if (value.length > 15) {
    //     callback(new Error(' تعداد کارکتر بیشتر از 20 رقم است'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      resttt,
      disabledCode: false,
      listLoading: true,
      titleDialog: 'ایجاد',
      labelPosition: 'top',

      form: {
        ownerId: this.$store.getters.id,
        firstName: '',
        lastName: '',
        age: '',
        email: '',
        avatar: '',
        phoneNumber: '',
        address: ''
      },
      dialogFormVisible: false,
      formLabelWidth: '120px',
      tableData: [],
      handelCloseOnClickOut: false,
      currentRow: []
      // phoneNamberVD: [
      //   { trigger: ['blur', 'change'], validator: validateMobileNumber },
      //   { max: 11, message: 'کارکتر وارد شده بیشتر از حد مجاز است', trigger: ['blur', 'change'] }
      // ],
      // addressVD: [
      //   { trigger: ['blur', 'change'], validator: validateAddress },
      //   { max: 100, message: 'کارکتر وارد شده بیشتر از حد مجاز است', trigger: ['blur', 'change'] }
      // ],
      // descriptionVD: [
      //   { max: 100, message: 'کارکتر وارد شده بیشتر از حد مجاز است', trigger: ['blur', 'change'] }
      // ],
      // accountNumberVD: [
      //   { trigger: ['blur', 'change'], validator: validateAccountNumber }
      // ],
      // accountTypeVD: [
      //   { trigger: ['blur', 'change'], validator: validateAlphabets },
      //   { max: 25, message: 'کارکتر وارد شده بیشتر از حد مجاز است', trigger: ['blur', 'change'] }
      // ],
      // branchNameVD: [
      //   { trigger: ['blur', 'change'], validator: validateAlphabets },
      //   { max: 25, message: 'کارکتر وارد شده بیشتر از حد مجاز است', trigger: ['blur', 'change'] }
      // ],
      // branchCodeVD: [
      //   { trigger: ['blur', 'change'], validator: validateBranchCode }
      // ]

    }
  },
  created() {
    // this.ownerId = this.$store.getters.id
    this.getContactssTable()
  },
  methods: {
    handleCurrentChange(val) {
      this.currentRow = val
    },
    handelCreate() {
      this.disabledCode = false
      this.titleDialog = 'ایجاد'
      for (const item in this.form) {
        this.form.ownerId = this.$store.getters.id
        this.form[item] = ''
      }
      this.dialogFormVisible = true
      this.resttt()
    },
    handelEdit() {
      if (!(this.currentRow[1] === undefined)) {
        this.$message({
          message: 'فقط یک ردیف را انتخاب کنید',
          type: 'error'
        })
      } else {
        this.disabledCode = true
        if (this.currentRow[0]) {
          this.titleDialog = 'ویرایش'
          for (const item in this.form) {
            this.form.ownerId = this.$store.getters.id
            this.form[item] = this.currentRow[0][item]
          }
          this.dialogFormVisible = true
          this.resttt()
        } else {
          this.$message({
            message: 'یک ردیف انتخاب کنید',
            type: 'warning'
          })
        }
      }
    },
    handelCopy() {
      this.handelEdit()
      this.titleDialog = 'ایجاد'
      this.disabledCode = false
    },
    handelDelete() {
      if (!(this.currentRow[1] === undefined)) {
        this.$message({
          message: 'فقط یک ردیف را انتخاب کنید',
          type: 'error'
        })
      } else {
        if (this.currentRow[0]) {
          const id = this.currentRow[0].id + ''
          // const data = { _method: 'DELETE' }
          this.delesContact(id)
        } else {
          this.$message({
            message: 'یک ردیف انتخاب کنید',
            type: 'warning'
          })
        }
      }
    },
    async getContactssTable() {
      // console.log(this.$store)
      // console.log(this.$store.getters)
      var id = this.$store.getters.id
      // var userId = this.$store.state.user.id
      await getContactsTable(id).then((response) => {
        // console.log(response.data.values)
        const contactsData = response.data.values
        try {
          if (response.meta.message === 'Success') {
            this.listLoading = false
            this.tableData = contactsData
          } else {
            this.listLoading = true
            this.$notify({
              title: 'error',
              message: response.meta.message,
              type: 'error',
              duration: 5000
            })
          }
        } catch (error) {
          console.error(error)
        }
      }).catch(
        err => {
          if (err) {
            console.error(err)
          }
        }
      )
    },
    createData() {
      // this.$refs.dataForm.validate(async(valid) => {
      //   if (valid) {
      // await
      // console.log(this.form)
      // var id = this.$store.getters.id
      creatContacts(this.form).then((response) => {
        if (response.meta.message === 'Success') {
          this.getContactssTable()
          this.dialogFormVisible = false
          this.$notify({
            title: 'ok',
            message: response.meta.message,
            type: 'success',
            duration: 5000
          })
        } else {
          this.dialogFormVisible = false
          this.$notify({
            title: 'error',
            message: response.meta.message,
            type: 'error',
            duration: 5000
          })
        }
      }).catch(error => {
        console.log(error)
      })
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
    },
    updateData() {
      // this.$refs.dataForm.validate(async(valid) => {
      //   if (valid) {

      var id = this.currentRow[0].id + ''

      const data = { ...this.form, id: id }

      updateContact(data).then((response) => {
        console.log(response.meta.message)
        if (response.meta.message === 'Success') {
          this.dialogFormVisible = false
          this.getContactssTable()

          this.$notify({
            title: 'ok',
            message: ' updated Successfull',
            type: 'success',
            duration: 5000
          })
        } else {
          this.dialogFormVisible = false
          this.$notify({
            title: 'error',
            message: response.meta.message,
            type: 'error',
            duration: 5000
          })
        }
      }).catch(error => {
        console.log(error)
      })
      // } else {
      //   console.log('error submit!!')
      //   return false
      // }
      // })
    },
    delesContact(id) {
      this.$confirm('Are you sure to delete?', 'warrning', {
        confirmButtonText: 'ok',
        cancelButtonText: 'cancel',
        type: 'warning'
      })
        .then(async() => {
          await deleteContact(id).then((response) => {
            this.getContactssTable()
            if (response.status === 'ok') {
              this.getContactsTable()
              this.$notify({
                title: ' delete',
                message: response.meta.message,
                type: 'error',
                duration: 5000
              })
            }
          })
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
