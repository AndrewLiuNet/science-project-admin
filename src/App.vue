<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="scss">
.el-pagination__sizes  .el-select .el-input__inner {
    width: 100px !important; 
}

 .approve {
  width: 100 !important;
  .tools {
    width: 100% !important;
    padding: 20px !important;
    display:flex !important;
    justify-content:flex-start !important;
  }
}
.tools-btn {
  margin-left:50px !important;
}

</style>
