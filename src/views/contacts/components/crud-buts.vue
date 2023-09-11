<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" @click="handelCreateBtn" />
    <el-button type="primary" icon="el-icon-edit" @click="handelEditBtn" />
    <el-button type="primary" icon="el-icon-copy-document" @click="handelCopyBtn" />
    <el-button type="primary" icon="el-icon-delete" @click="handeldeleteBtn" />
  </div>

</template>
<script>
export default {
  name: 'CrudButs',
  data() {
    return {
    }
  },
  methods: {
    handelCreateBtn() {
      this.$emit('handel-create')
    },
    handelEditBtn() {
      this.$emit('handel-edit')
    },
    handelCopyBtn() {
      this.$emit('handel-copy')
    },
    handeldeleteBtn() {
      this.$emit('handel-delete')
    }
  }
}
</script>

  <style scoped>
  .el-button{
    min-width:unset;
  }
  </style>

