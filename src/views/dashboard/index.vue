<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">当前用户: {{ name }}</div> -->
 	<el-container>
			<div id="info">
        <el-row>
					<p class="hello">您好！{{username}}</p>	
		    </el-row>
					<p>{{year}}-{{month}}-{{day}}  {{value}}</p>			
			</div>
		</el-container>
  </div>
</template>



<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  data(){
    return{
      username:localStorage.name,
      year:'',
      month:'',
      day:'',
      value:'',
      attrOrginList:[],
      iconList:[
          "el-icon-data-line",
          "el-icon-data-analysis",
          "el-icon-position",
          "el-icon-cpu",
          "el-icon-odometer",
          "el-icon-collection",
          "el-icon-truck",
          "el-icon-wallet",
          "el-icon-s-unfold",
          "el-icon-rank",
           "el-icon-data-line",
          "el-icon-data-analysis",
          "el-icon-position",
          "el-icon-cpu",
          "el-icon-odometer",
          "el-icon-collection",
          "el-icon-truck",
          "el-icon-wallet",
          "el-icon-s-unfold",
          "el-icon-rank",
        ],
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])

  },

  mounted() {

     var data = new Date();
     this.year=data.getFullYear();
	 	  this.month =data.getMonth() < 9 ? "0" + (data.getMonth() + 1) : data.getMonth() + 1;
	 	  this.day = data.getDate() <= 9 ? "0" + data.getDate() : data.getDate();
	 	   var hour=data.getHours()<=9?"0"+data.getHours():data.getHours();
	 	 	var min=data.getMinutes()<=9?"0"+data.getMinutes():data.getMinutes();
	 		var Seconds=data.getSeconds()<=9?"0"+data.getSeconds():data.getSeconds();
	 	  this.value=hour+":"+min+":"+Seconds;
 		  setInterval(()=>{
 			  var data = new Date();
 				  var hour=data.getHours()<=9?"0"+data.getHours():data.getHours();
 	 	 		  var min=data.getMinutes()<=9?"0"+data.getMinutes():data.getMinutes();
 	 			  var Seconds=data.getSeconds()<=9?"0"+data.getSeconds():data.getSeconds();
 				  this.value= hour+":"+min+":"+Seconds;
 			   
 		 	},1000)

    
  },
 
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.dashboard-container{
  margin:0;
  padding:0;
  // border:1px solid red;
   background:url("../../assets/bg1.jpg") no-repeat;
  background-size:cover;
  width: 100%;
  height: calc(100vh - 50px) ;
  position: relative;

}


  #info{
 	  position: absolute;
    top: 10vh;
    left:10vh;
    width: 40%;
    height: 10vh;
    color:white;
    font-size:40px;
    font-weight:500;
    font-family:Arial, Helvetica, sans-serif;
    text-shadow: 0px 2px 2px rgb(0 0 0 / 50%);
  }



@media (min-width: 400px){
    #info{font-size:17px;}
     #info .hello{font-size:27px;}
}

@media (min-width: 800px){
    #info{font-size:20px;}
     #info .hello{font-size:30px;}
}
@media (min-width: 1000px){
    #info{font-size:25px;}
    #info .hello{font-size:35px;}
}
@media (min-width: 1200px){
    #info{font-size:30px;}
     #info .hello{font-size:40px;}
}
@media (min-width: 1400px){
    #info{font-size:35px;}
     #info .hello{font-size:45px;}
}
@media (min-width: 1600px){
    #info{font-size:40px;}
    #info .hello{font-size:50px;}
}
</style>
