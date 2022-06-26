<template>
  <div class="approve">
    <!-- 科研项目立项汇总页面 -->
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
      <div class="tools-btn">

      </div>
    </div>
    <!-- 页面加载的表格 -->
    <el-card class="data">
      <el-table :data="tableData" show-summary style="width: 100%">
      
        <el-table-column prop="attrOrginName"  label="单位">
        </el-table-column>
        
        <el-table-column prop="0funds"  label="国家自然科学基金项目">
        </el-table-column>

        
        <el-table-column prop="1funds"  label="国家社会科学基金项目">
        </el-table-column>

          <el-table-column prop="2funds"  label="事业费项目">
        </el-table-column>

           <el-table-column prop="3funds"  label="装备局内科研项目">
        </el-table-column>

         <el-table-column prop="4funds"  label="横向项目">
        </el-table-column>

         <el-table-column prop="5funds"  label="装备技术基础项目">
        </el-table-column>

         <el-table-column prop="6funds"  label="其他项目">
        </el-table-column>

            <el-table-column prop="7funds"  label="全军军事理论项目">
        </el-table-column>

            <el-table-column prop="8funds"  label="学校科研计划项目">
        </el-table-column>

            <el-table-column prop="9funds"  label="新立武器装备预研项目">
        </el-table-column>



        <!-- <template v-for="(item, index) in tableDataItem">
          <el-table-column :label="item.projectTypeName" :key="index">
            {{ item.fund }}
          </el-table-column>
        </template> -->

      </el-table>
      <el-pagination
        background
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="queryList.rows"
        :page-sizes="[10, 30, 50]"
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
  researchFunds,
} from "@/api/project";
export default {
  name: "researchManpower",
  data() {
    return {
      timeArea:'',
      total: 0,
      queryId: null,
      queryList: {
        page: 1,
        rows: 10,
        yearId: "",
        searchStr: "",
        beginTime:"",
        endTime:""
      },
      yearOptions: [], // 年份下拉列表值
      attrOrginOptions: [], // 单位下拉列表值
      projectTypeList: [], // 年份下拉列表值
      projectLevel: [], // 年份下拉列表值
      value: "",
      tableData: [],
      tableDataItem: [],
      addDialogVisible: false,
      editDialogVisible: false,
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
      researchFunds(this.queryList).then((res) => {
        let newArr=[];
        for(let i=0;i<res.data.list.length;i++){
           let obj={}
            obj['attrOrginName']=res.data.list[i].attrOrginName;
                for(let p=0;p<res.data.list[0].fundsList.length;p++){
                     obj[p+'funds']=res.data.list[i].fundsList[p].fund
                }

         newArr.push(obj);
        // console.log("=====");
        // console.log(newArr);
        this.tableData = newArr;
        // this.tableDataItem = this.tableData[0].fundsList;
        this.total = newArr.length;
        // console.log(res);
       }
       console.log("++++++++++++++++++")
       console.log(newArr)
      })
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
  width: 100 !important;
  .tools {
    width: 100% !important;
    padding: 20px !important;
    display:flex !important;
    justify-content:flex-start !important;
  }
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
.tools-btn {
  margin-left:50px !important;
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
<style>
/* .el-select .el-input__inner {
  width: 240px !important;
} */
</style>
