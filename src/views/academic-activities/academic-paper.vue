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
          <el-form-item label="选择年份" prop="yearId">
            <el-select v-model="addForm.yearId" placeholder="请选择年份">
              <el-option
                v-for="item in yearOptions"
                :key="item.yearId"
                :label="item.yearName"
                :value="item.yearId"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="出版时间" prop="publication_time">
            <el-date-picker
              v-model="addForm.publication_time"
              type="datetime"
              placeholder="出版时间"
              align="right"
              value-format="yyyy-MM-dd HH:mm:ss"
              :picker-options="pickerOptions"
            />
          </el-form-item>
          <el-form-item label="论文名称" prop="thesis_name">
            <el-input v-model="addForm.thesis_name" placeholder="请输入论文名称"/>
          </el-form-item>
          <el-form-item label="作者" prop="author">
            <el-input v-model="addForm.author" placeholder="请输入作者"/>
          </el-form-item>
          <el-form-item label="发表刊物" prop="publication">
            <el-input  v-model="addForm.publication" placeholder="请输入发表刊物"/>
          </el-form-item>
          <el-form-item label="收录情况" prop="collection">
            <el-input v-model="addForm.collection" placeholder="请输入收录情况"/>
          </el-form-item>
          <!-- <el-form-item label="论文编号" prop="code">
            <el-input v-model="addForm.code" placeholder="请输入论文编号"/>
          </el-form-item> -->
        </el-form>
        <span slot="footer" class="dialog-footer">
             <!-- ('ruleForm') -->
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
          <el-form-item label="出版时间" prop="publication_time">
            <el-date-picker
              v-model="eidtForm.publication_time"
              type="datetime"
              placeholder="出版时间"
              align="right"
              value-format="yyyy-MM-dd HH:mm:ss"
              :picker-options="pickerOptions"
            />
          </el-form-item>
          <el-form-item label="论文名称" prop="thesis_name">
            <el-input v-model="eidtForm.thesis_name" />
          </el-form-item>
          <el-form-item label="作者" prop="author">
            <el-input v-model="eidtForm.author" />
          </el-form-item>
          <el-form-item label="发表刊物" prop="publication">
            <el-input v-model="eidtForm.publication" />
          </el-form-item>
          <el-form-item label="收录情况" prop="collection">
            <el-input v-model="eidtForm.collection" />
          </el-form-item>
           <!-- <el-form-item label="论文编号" prop="code">
            <el-input v-model="eidtForm.code" placeholder="请输入论文编号"/>
          </el-form-item> -->
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
        <el-table-column type="index" label="序号" width="80" align="center" />
        <el-table-column prop="thesis_name" label="论文名称" align="center"/>
        <el-table-column prop="author" label="作者" align="center"/>
        <el-table-column prop="attrOrginName" label="单位" align="center"/>
        <el-table-column prop="publication" label="发表刊物" align="center"/>
        <el-table-column prop="publication_time" label="发表时间" align="center"/>
        <el-table-column prop="collection" label="收录情况" align="center"/>
          <!-- <el-table-column prop="code" label="论文编号" align="center"/> -->
    
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
import { getAcademicPaper, academicPaperAdd,academicPaperEdit,academicPaperDel } from "@/api/joinAcademic";
import { getYearListData, attrOrginGetList } from "@/api/project";
export default {
  name: "AcademicPaper",
  data() {
    return {
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
      timeArea:"",
      total: 0,
      queryId: null,
      pageSize:'',
      currentPage:'',
      queryList: {
        page: 1,
        rows: 10,
        yearId: "",
        recognized_kernel_journals: "",
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
      addForm: {
        attrOrginId: null, // 单位列表
        thesis_name: null, //论文名称
        author: null, //作者
        publication: null, //发表刊物
        collection: null, //收录情况
        yearId: null, // 年份
        publication_time: null, // 日期
        code:null,
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
        attrOrginId: [
          { required: true, message: "请选择单位", trigger: "blur" },
        ],
        yearId: [
          { required: true, message: "请选择年份", trigger: "blur" },
        ],
        publication_time: [
          { required: true, message: "请选择出版时间", trigger: "blur" },
        ],
        thesis_name: [
          { required: true, message: "请输入论文名称", trigger: "blur" },
        ],
        author: [
          {
            required: true,
            message: "请输入作者",
            trigger: "blur",
          },
        ],
        publication: [{ required: true, message: "请输入发表刊物", trigger: "blur" }],
        collection: [
          { required: true, message: "请输入收录情况", trigger: "blur" },
        ],
        code:[
          {required:true,message:'请输入论文编号',trigger:'blur'}
        ]
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
      getAcademicPaper(this.queryList).then((res) => {
        console.log(res)
        this.tableData = res.data.list;
         this.tableData.forEach(e=>{
            e.publication_time=this.$moment(e.publication_time).format("YYYY-MM-DD HH:mm:ss")
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
      console.log(this.addForm);
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          academicPaperAdd(this.addForm).then((res) => {
            // console.log(res);
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
    cancel(formName){
      if(formName==='addForm'){
        this.addDialogVisible=false;
      }else{
        this.editDialogVisible=false
      }
      this.$refs[formName].clearValidate();
    },
    // resetForm(){
    //   this.addDialogVisible = false;
    //   this.editDialogVisible=false;
    //    this.$refs.ruleForm.resetFields();
    // },
    // 编辑项目立项表单 前查询
    editRowInfo(row) {
      console.log(row);
      this.eidtForm = { ...row };
      this.editDialogVisible = true;
    },
    // 编辑项目立项表单提交
    edtiFormSub() {
       this.$refs.eidtForm.validate((valid) => {
         if(valid){
               academicPaperEdit(this.eidtForm).then((res) => {
              this.getResearList();
              this.$message.success("修改成功！");
              this.editDialogVisible = false;
            });
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
        academicPaperDel({ id: id }).then((res) => {
          console.log(res);
          this.$message.success(res.msg);
          this.getResearList();
        });
      }
    },
    // 分页器方法
    handleSizeChange(val) {
      this.queryList.rows=val;

      this.getResearList();
    },
    handleCurrentChange(val) {
      this.queryList.page=val;
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
.upload-demo{
  margin-left:10px;
  // border:1px solid red;
}
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
  display: flex;
  flex-wrap: wrap;
   justify-content: space-between;
  .el-input {
    width: 240px;
  }
  .el-input-number{
    width:240px;
  }
  .el-select{
    width:240px;
  }
}
.search-name {
  width: 220px;
  margin-right: 10px;
}
.inner-input {
  width: 240px;
}
::v-deep .el-dialog input.el-input__inner{
  // width:250px !important;
  // border:1px solid red;
}
</style>