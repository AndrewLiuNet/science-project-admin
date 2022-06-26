<template>
  <div class="approve">
    <!-- 科研项目立项汇总页面 -->
    <div class="tools">
      <div>
        <span>请选择时间：</span>
         <el-date-picker
           style="width:250px;margin-left:10px;"
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
      </div>
      <div class="tools-btn">
        <el-input
          class="search-name"
          v-model="queryList.searchStr"
          placeholder="请根据名称查询"
          clearable
          @clear="getResearList"
        ></el-input>
        <el-button type="success" plain @click="searchList">查询</el-button>
        <el-button type="success" plain @click="addDialogVisible = true"
          >添 加</el-button
        >
        <!-- <el-button type="danger" plain>删 除</el-button> -->
      </div>
      <!-- 添加模态框 -->
      <el-dialog title="添加" :visible.sync="addDialogVisible" width="50%">
        <el-form
          ref="addForm"
          :rules="rules"
          :model="addForm"
          label-width="100px"
          class="addForm"
        >
          <el-row>
          <el-col :span="12">
               <el-form-item label="选择单位" prop="attrOrginId">
            <el-select v-model="addForm.attrOrginId" placeholder="请选择单位">
              <el-option
                v-for="item in attrOrginOptions"
                :key="item.id"
                :label="item.attrOrginName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          </el-col>
            <el-col :span="12">
                  <el-form-item label="项目" prop="project_name">
                <el-input v-model="addForm.project_name" placeholder="请输入项目"/>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="选择年份"  prop="yearId">
              <el-select v-model="addForm.yearId" placeholder="请选择年份">
                <el-option
                  v-for="item in yearOptions"
                  :key="item.yearId"
                  :label="item.yearName"
                  :value="item.yearId"
                />
              </el-select>
            </el-form-item>
          </el-col>
            <el-col :span="12">
                   <el-form-item label="完成人" prop="completed_by">
                <el-input v-model="addForm.completed_by" placeholder="请输入完成人"/>
            </el-form-item>
          </el-col>
        </el-row>
          <el-row>
            <el-col :span="12"> 
              <!-- <el-form-item label="等级"  >
                 
              </el-form-item>    -->
                <el-form-item label="等级"  prop="award_level">
                     <el-select v-model="addForm.award_level" >
                    <el-option v-for="(item,index) in award_levelOptions" 
                      :key="index"
                      :value="item"
                      :label="item">
                      </el-option>
                    </el-select>
              </el-form-item>
            </el-col>
             <el-col :span="12">    
                <el-form-item label="时间"  prop="award_time">
                   <el-date-picker
                      v-model="addForm.award_time"
                      type="datetime"
                      placeholder="出版时间"
                      align="right"
                       value-format="yyyy-MM-dd HH:mm:ss"
                      :picker-options="pickerOptions"
                  />
                    <!--   --> 
                </el-form-item>
            </el-col>
            <!-- awardTypes -->
            <el-col :span="12">    
                <el-form-item label="奖项类型"  prop="award_time">
                  <el-select v-model="addForm.award_type" >
                    <el-option v-for="(item,index) in awardTypes" 
                    :key="index" 
                    :value="item.awardTypeId"
                    :label="item.typeName"></el-option>
                  </el-select>
                </el-form-item>
            </el-col>
         </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel('addForm')">取 消</el-button>
          <el-button type="primary" @click="addFormSub">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 修改模态框  -->
      <el-dialog title="修改" :visible.sync="editDialogVisible" width="50%">
        <el-form
          ref="eidtForm"
          :rules="rules"
          :model="eidtForm"
          label-width="100px"
          class="addForm"
        >
            <el-row>
          <el-col :span="12">
               <el-form-item label="选择单位" prop="attrOrginId">
            <el-select v-model="eidtForm.attrOrginId" placeholder="请选择单位">
              <el-option
                v-for="item in attrOrginOptions"
                :key="item.id"
                :label="item.attrOrginName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          </el-col>
            <el-col :span="12">
                  <el-form-item label="项目" prop="project_name">
                <el-input v-model="eidtForm.project_name" placeholder="请输入项目"/>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="选择年份"  prop="yearId">
              <el-select v-model="eidtForm.yearId" placeholder="请选择年份">
                <el-option
                  v-for="item in yearOptions"
                  :key="item.yearId"
                  :label="item.yearName"
                  :value="item.yearId"
                />
              </el-select>
            </el-form-item>
          </el-col>
            <el-col :span="12">
                   <el-form-item label="完成人" prop="completed_by">
                <el-input v-model="eidtForm.completed_by" placeholder="请输入完成人"/>
            </el-form-item>
          </el-col>
        </el-row>
          <el-row>
            <el-col :span="12">    
              <el-form-item label="等级"  prop="award_level">
                  <el-select v-model="eidtForm.award_level" >
                  <el-option v-for="(item,index) in award_levelOptions" 
                    :key="index"
                    :value="item"
                    :label="item">
                    </el-option>
                  </el-select>
              </el-form-item>
            
                <!-- <el-form-item label="等级" >
                    <el-input v-model="eidtForm.award_level" placeholder="请输入等级"/>
              </el-form-item> -->
            </el-col>
             <el-col :span="12">    
                <el-form-item label="时间"  prop="award_time">
                   <el-date-picker
                      v-model="eidtForm.award_time"
                      type="datetime"
                      placeholder="出版时间"
                      align="right"
                     value-format="yyyy-MM-dd HH:mm:ss"
                      :picker-options="pickerOptions"
                  />
                </el-form-item>
            </el-col>
         </el-row>
          <el-col :span="12">    
                <el-form-item label="奖项类型"  prop="award_time">
                  <el-select v-model="eidtForm.award_type" >
                    <el-option v-for="(item,index) in awardTypes" 
                    :key="index" 
                    :value="item.awardTypeId"
                    :label="item.typeName"></el-option>
                  </el-select>
                </el-form-item>
            </el-col>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel('eidtForm')">取 消</el-button>
          <el-button type="primary" @click="edtiFormSub">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 页面加载的表格 -->
    <el-card class="data">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column type="index" label="序号" width="55" />
        <el-table-column prop="project_name" label="获奖项目名称" />
        <el-table-column prop="attrOrginName" label="完成单位" />
        <el-table-column prop="completed_by" label="完成人" />
        <!--  -->
        <el-table-column prop="award_level" label="奖种及等级" />
        <el-table-column prop="award_typeName" label="奖项类型" />
         <el-table-column prop="award_time" label="时间" />
        <el-table-column width="220" label="操作">
          <template slot-scope="scope">
            <el-link
              style="margin-left: 20px"
              icon="el-icon-edit"
              type="primary"
              @click="editRowInfo(scope.row)"
              >修改</el-link
            >
            <el-link
              style="margin-left: 20px"
              icon="el-icon-delete"
              type="danger"
              @click="delRowInfo(scope.row.id)"
              >删除</el-link
            >
          </template>
        </el-table-column>
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
import { technologyAward, 
technologyAwardAdd,
technologyAwardEdit,
technologyAwardDel,getAwardTypes} from "@/api/publishedPapers";
import { getYearListData, attrOrginGetList } from "@/api/project";
export default {
  name: "TechnologyAward",
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
                projectTypeId: "",
                beginTime:"",
                endTime:"",
                code:""
      },
         // 时间控件的值
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
      yearOptions: [], // 年份下拉列表值
      attrOrginOptions: [], // 单位下拉列表值
      projectTypeList: [], // 年份下拉列表值
      value: "",
      tableData: [],
      addDialogVisible: false,
      editDialogVisible: false,
      addForm: {
        attrOrginId: null, // 完成单位
        project_name: null, //获奖项目名称
        completed_by: null, //完成人
        award_level:null,
        // award_type_and_grade: null, //奖种及等级
        yearId: null, // 年份
        award_time:null,
        award_type:null
      },
      eidtForm: {},
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
      // 表单校验规则
      rules: {
        project_name: [
          { required: true, message: "请输入项目名称", trigger: "blur" },
        ],
        attrOrginId: [
          { required: true, message: "请选择单位", trigger: "blur" },
        ],
        award_level: [
          { required: true, message: "请输入等级", trigger: "blur" },
        ],
        completed_by: [
          { required: true, message: "请输入项目完成人", trigger: "blur" },
        ],

        yearId: [{ required: true, message: "请选择年份", trigger: "blur" }],
        award_time:[{required:true,message:'请选择时间',trigger:'blur'}]

      },
      awardTypes:[],
      award_levelOptions:[
        '特等奖','一等奖','二等奖','三等奖'
      ]
    };
  },
  mounted() {
    this.getResearList();
    this.getYearsListData();
    this.attrOrginGetList();
    this.getAwardTypes();
  },
  methods: {
   async getAwardTypes(){
       const {data:{list}}  = await getAwardTypes({page:1,rows:100});
       this.awardTypes=list;
    },
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
    cancel(formName){
      if(formName==='addForm'){
           this.addDialogVisible = false 
         
      }else{
        this.editDialogVisible=false;
       
      }
         this.$refs[formName].clearValidate();
    },
    // 获取科技奖励列表
    getResearList() {
      technologyAward(this.queryList).then((res) => {
        this.tableData = res.data.list;
        this.tableData.forEach(e=>{
            e.award_time=this.$moment(e.award_time).format("YYYY-MM-DD HH:mm:ss")
        })
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
    // 添加
    addFormSub() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          technologyAwardAdd(this.addForm).then(res => {
            // // console.log(res);
            this.addForm = {};
            this.$message.success(res.msg);
            this.addDialogVisible = false;
            this.getResearList();
          });
        } else {
          return false;
        }
      });
    },
    // 编辑项目立项表单 前查询
    editRowInfo(row) {
      console.log(row);
      this.eidtForm = { ...row };
      this.editDialogVisible = true;
    },
    // 编辑项目立项表单提交
    edtiFormSub() {
      this.$refs.eidtForm.validate(valid=>{
        if(valid){
            technologyAwardEdit(this.eidtForm).then((res) => {
              this.getResearList();
              this.$message.success("修改成功！");
              this.editDialogVisible = false;
            });
        }else{
          return false;
        }
      })
     
    },
    // 删除单行数据
    async delRowInfo(id) {
      console.log(id);
      const confirmResult = await this.$confirm(
        "是否删除此条信息？",
        "提示信息",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => {
        err;
      });
      if (confirmResult !== "confirm") {
        return this.$message.info({
          message: "已取消",
          duration: 800,
        });
      } else {
        technologyAwardDel({ id: id }).then((res) => {
          console.log(res);
          this.$message.success(res.msg);
          this.getResearList();
        });
      }
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
    box-sizing: border-box;
    border: 1px solid #dcdfe6;
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

.addForm {
  // display: flex;
  // flex-wrap: wrap;
  // justify-content: space-around;
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
.el-select .el-input__inner {
  width: 240px !important;
}
</style>
