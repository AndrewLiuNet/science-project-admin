<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  // mounted() {
  //   document.onkeydown=function (e){      
  //     var currKey=0,evt=e||window.event;   
  //     currKey=evt.keyCode||evt.which||evt.charCode;   
  //     if (currKey == 123) {      
  //            window.event.cancelBubble = true;
  //            window.event.returnValue = false;  
  //         }  
  //     }
  // },
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
