<template>
  <div class="approve">
    <!-- 新立项目数量页面 -->
    
    <div class="tools">
      <div>
        <span>请选择时间：</span>
         <el-date-picker
          style="width:250px"
            v-model="timeArea"
            type="daterange"
            align="right"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerAreaOptions"
            @change="changeTime"
            :append-to-body="false"
             unlink-panels>
            </el-date-picker>
          <!-- <el-select
            v-model="value"
            placeholder="请选择年份"
            @change="searchYear"
          >
          <el-option
            v-for="item in yearOptions"
            :key="item.yearId"
            :label="item.yearName"
            :value="item.yearId"
          />
        </el-select> -->
        
      </div>
<!-- 
      <div class="tools-btn">
        <el-input
          class="search-name"
          v-model="queryList.searchStr"
          placeholder="请根据名称查询"
        ></el-input>
        <el-button type="success" plain @click="searchList">查询</el-button>
        <el-button type="success" plain @click="addDialogVisible = true"
          >添 加</el-button
        >
        <el-button type="danger" plain>删 除</el-button>
      </div> -->


    </div>


    <!-- 页面加载的表格 -->

    <el-card class="data">

      
      <el-table
      :data="tableData"
      show-summary
      style="width:100%">
      <el-table-column align="center" type="expand">
             <template slot-scope="props">
               <!-- {{props.row.typeNums}} -->
                 <el-table  
                  show-summary
                        :data="props.row.typeNums"
                        :header-cell-style="{'font-size':'12px'}"
                        >
                        <el-table-column align="center"
                          prop="number"
                          label="当前单位项目数量"
                          min-width="32">
                        </el-table-column>

                         <el-table-column align="center"
                          prop="projectTypeName"
                          label="项目类别"
                          min-width="32">
                        </el-table-column>

                        <el-table-column 
                          prop="sumForType" align="center"
                          label="所有单位项目总数" 
                          min-width="32"
                         >
                        </el-table-column>

                 </el-table>
             </template>
      </el-table-column>
       <el-table-column align="center"
        type="index"
         min-width="32"
        label="序号">
      </el-table-column>
      <el-table-column align="center"
        prop="attrOrginName"
        label="单位名称"
         min-width="32">
      </el-table-column>

      <el-table-column align="center"
        prop="sumForAttrOrgin"
        label="单位项目数量"   min-width="32"
        >
      </el-table-column>



    </el-table>

      <el-pagination
        
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="queryList.rows"
        :page-sizes="[10, 20, 30]"
        :current-page.sync="queryList.page"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />


    </el-card>
  </div>
</template>

<script>
import {
  getYearListData,
  attrOrginGetList,
  researchProjectsStatistical,
} from "@/api/project";
export default {
  name: "Comprehensive2",
  data() {
    return {
      timeArea:"",
      total: 0,
      queryId: null,
      queryList: {
        page: 1,
        rows: 10,
        yearId: "",
        searchStr: "",
        attrOrginId: "",
        beginTime:"",
        endTime:""
      },
      yearOptions: [], // 年份下拉列表值
      attrOrginOptions: [], // 单位下拉列表值
      projectTypeList: [], // 年份下拉列表值
      projectLevel: [], // 年份下拉列表值
      value: "",
      tableData: [],
      addDialogVisible: false,
      editDialogVisible: false,
      typeNums:[],
      // 时间控件的值
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
       pickerAreaOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
    };
  },
  mounted() {
    this.getResearList();
    this.getYearsListData();
    this.attrOrginGetList();
  },
  methods: {
      changeTime(){
       if(this.timeArea){
           this.queryList.beginTime=this.timeArea[0];
           this.queryList.endTime=this.timeArea[1];
       }else{
           this.queryList.beginTime=''
           this.queryList.endTime=''
       }
       
        this.getResearList();
      },
    // 获取项目结项列表
    getResearList() {
      researchProjectsStatistical(this.queryList).then((res) => {
        this.tableData = res.data.list;
        this.total = res.data.count;
        console.log(res);
      });
    },
    // 获取年份加载下拉框
    getYearsListData() {
      getYearListData().then((res) => {
        console.log(res.data);
        this.yearOptions = res.data;
      });
    },
    // 根据年份筛选数据
    searchYear(e) {
      // console.log(e);
      this.queryList.yearId = e;
      this.getResearList();
    },
    // 获取单位列表下拉框
    attrOrginGetList() {
      attrOrginGetList({ page: 1, rows: 100 }).then((res) => {
        this.attrOrginOptions = res.data.list;
        console.log(this.attrOrginOptions);
      });
    },
    // 分页器方法
    handleSizeChange(val) {
      this.queryList.page = 1;
      this.queryList.rows = val;
      this.getResearList();
    },
    handleCurrentChange(val) {
      this.queryList.page = val;
      this.getResearList();
    },
    //条件查询
    searchList() {
      this.getResearList();
    },
  },
};
</script>
<style scoped lang='scss'>
.approve {
  width: 100;
  .tools {
    width: 100%;
    padding: 20px;
    display:flex;
    justify-content:flex-start;
  }
}
.tools-btn {
  margin-left:50px;
}
.projectName {
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
}
.el-pagination {
  text-align: center;
  margin: 20px 0 0 0;
}

.addForm {
  display: flex;
  flex-wrap: wrap;
  .el-input {
    width: 240px;
  }
}
.search-name {
  width: 220px;
  margin-right: 10px;
}
</style>
<style >
/* .el-select .el-input__inner {
  width: 240px !important;
} */

/deep/ .el-table ::before{
background-color:none;
}
.el-table {
  margin:0 auto;
  /* border:1px solid red; */
}
</style>
