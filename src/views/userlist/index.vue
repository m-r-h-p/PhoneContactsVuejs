<template>
  <el-container>
    <!-- <el-header style="padding-top: 20px;">
      <CrudButs
        @handel-create="handelCreate"
        @handel-edit="handelEdit"
        @handel-copy="handelCopy"
        @handel-delete="handelDelete"
      />
    </el-header> -->
    <el-main>
      <el-table
        ref="singleTable"
        v-loading="listLoading"
        :data="tableData"
        style="width: 100%;"
        height="500"
        row-key="code"
        class="small-table"
        border
        @selection-change="handleCurrentChange"
      >
        <!-- <el-table-column
          type="selection"
          width="55"
        /> -->
        <el-table-column
          type="index"
          label="index"
          width="60"
          sortable
        />
        <el-table-column
          property="email"
          label="email"
          width="150"
        />
        <el-table-column
          property="firstName"
          label="firstName"
          width="150"
        /><el-table-column
          property="lastName"
          label="lastName "
          width="150"
        />
        <el-table-column
          property="age"
          label="age"
          width="100"
        />

        <!-- <el-table-column min-width="80px" label="دسترسی‌ها">
          <template slot-scope="{ row }">
            <el-button style="padding: 10px; margin: 5px; background-color:rgba(255, 0, 0, 0.226)" title="نمایش مجوزها" @click="(dialogFormPermissions = true) && (tableArticles = row.items)">
              <svg-icon icon-class="eye-open" />
            </el-button>
            <el-button style="padding: 10px; margin: 5px; background-color:rgba(0, 155, 0, 0.226)" title="ویرایش مجوزها" @click="(dialogFormVisible = true) && (tableArticles = row.items)">
              <i class="el-icon-thumb" />
            </el-button>
          </template>
        </el-table-column> -->

      </el-table>

    </el-main>
  </el-container>

</template>
<script>
// import CrudButs from '@/views/basic-info/components/crud-buts.vue'
import { getSignalsTable } from '../../api/signals/sginals'
export default {
  name: 'Sginals',
  //   components: { CrudButs },
  data() {
    return {
    //   dialogFormPermissions: false,
    //   dialogFormVisible: false,
    //   handelCloseOnClickOut: false,
    //   titleDialog: 'ایجاد',
      labelPosition: 'top',
      listLoading: false,
      formLabelWidth: '120px',
      tableData: [],
      currentRow: [],
      urlexport: ''
    }
  },
  created() {
    this.getSignalsTable()
  },
  methods: {
    async getSignalsTable() {
      this.listLoading = true
      await getSignalsTable().then((response) => {
        // console.log(response.data.values)
        // console.log(response.meta.message)
        try {
          if (response.meta.message === 'Success') {
            this.listLoading = false
            this.tableData = response.data.values
          } else {
            this.listLoading = true
            this.$notify({
              title: 'error',
              message: 'error',
              type: 'error',
              duration: 5000
            })
          }
        } catch (error) {
          console.error(error)
        }
      })
      this.listLoading = false
    },

    handleCurrentChange(val) {
      this.currentRow = val
    }
  }

}

</script>

<style >

  tr:nth-child(even) {
    background-color: #c5952525;
}

</style>
