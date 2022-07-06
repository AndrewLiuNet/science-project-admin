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
          <el-upload
          class="upload-demo"
          multiple
          :on-change="changeFile"
          action=""
          ref="uploadFile"
          :auto-upload="false"
         
        >   
         <el-button type="primary"  plain>导入Excel文件</el-button>
        </el-upload>
         <div>
        <el-button   style="margin-left:10px;" type="primary" plain>  <a
          href="/static/Upload_Academic_work学术著作.xlsx" download>下载模板</a></el-button>
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
          <el-form-item label="专著名称" prop="title_of_monograph">
            <el-input v-model="addForm.title_of_monograph" placeholder="请输入专著名称"/>
          </el-form-item>
          <el-form-item label="第一作者" prop="first_author">
            <el-input v-model="addForm.first_author" placeholder="请输入第一作者"/>
          </el-form-item>
          <el-form-item label="单位" prop="attrOrginId">
            <el-select
              class="inner-input"
              v-model="addForm.attrOrginId"
              placeholder="请选择单位"
            >
              <el-option
                v-for="item in attrOrginOptions"
                :key="item.id"
                :label="item.attrOrginName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="出版社" prop="press">
            <el-input v-model="addForm.press" placeholder="请输入出版社" />
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
          <el-form-item label="书号" prop="book_number">
            <el-input v-model="addForm.book_number" placeholder="请输入书号"/>
          </el-form-item>
          <el-form-item label="备注" prop="remarks">
            <el-input v-model="addForm.remarks" placeholder="请输入备注"/>
          </el-form-item>
          <el-form-item label="选择年份" prop="yearId">
            <el-select
              class="inner-input"
              v-model="addForm.yearId"
              placeholder="请选择年份"
            >
              <el-option
                v-for="item in yearOptions"
                :key="item.yearId"
                :label="item.yearName"
                :value="item.yearId"
              />
            </el-select>
          </el-form-item>
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
          <el-form-item label="专著名称" prop="title_of_monograph">
            <el-input v-model="eidtForm.title_of_monograph" placeholder="请输入专著名称"/>
          </el-form-item>
          <el-form-item label="第一作者" prop="first_author">
            <el-input v-model="eidtForm.first_author" placeholder="请输入第一作者"/>
          </el-form-item>
          <el-form-item label="单位" prop="attrOrginId">
            <el-select
              class="inner-input"
              v-model="eidtForm.attrOrginId"
              placeholder="请选择单位"
            >
              <el-option
                v-for="item in attrOrginOptions"
                :key="item.id"
                :label="item.attrOrginName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="出版社" prop="press">
            <el-input v-model="eidtForm.press" placeholder="请输入出版社"/>
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
          <el-form-item label="书号" prop="book_number">
            <el-input v-model="eidtForm.book_number" placeholder="请输入书号"/>
          </el-form-item>
          <el-form-item label="备注" prop="remarks">
            <el-input v-model="eidtForm.remarks" placeholder="请输入备注"/>
          </el-form-item>
          <el-form-item label="选择年份" prop="yearId">
            <el-select
              class="inner-input"
              v-model="eidtForm.yearId"
              placeholder="请选择年份"
            >
              <el-option
                v-for="item in yearOptions"
                :key="item.yearId"
                :label="item.yearName"
                :value="item.yearId"
              />
            </el-select>
          </el-form-item>
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
        <el-table-column type="index" label="序号" width="80" align="center"/>
        <el-table-column prop="title_of_monograph" label="专著名称" align="center"/>
        <el-table-column prop="first_author" label="第一作者" align="center"/>
        <el-table-column prop="attrOrginName" label="单位" align="center"/>
        <el-table-column prop="press" label="出版社" align="center"/>
        <el-table-column prop="publication_time" label="出版时间" align="center"/>
        <el-table-column prop="book_number" label="书号" align="center"/>
        <el-table-column prop="remarks" label="备注" align="center"/>
        <el-table-column prop="yearName" label="年份" align="center"/>
        <el-table-column width="220" label="操作" align="center">
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

<script src="../utls/jquery.js">
</script>

<script>
import {
  academicWork,
  addAcademicWork,
  editAcademicWork,
  delAcademicWork,
  importAcadmic
} from "@/api/joinAcademic";
import { getYearListData, attrOrginGetList } from "@/api/project";
export default {
  name: "AcademicWork",
  data() {
    return {
      //  loading :false,
      timeArea:"",
      isSuccess:false,
      fileList:[],
      uploadFormProduct:'',
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
      addDialogVisible: false,
      editDialogVisible: false,
      addForm: {
        title_of_monograph: null, // 专著名称
        first_author: null, //第一作者
        attrOrginId: null, //单位
        press: null, //出版社
        publication_time: null, // 出版时间
        book_number: null, // 书号
        remarks: null, // 备注
        yearId: null, // 年份
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
        title_of_monograph: [
          { required: true, message: "请输入专著名称", trigger: "blur" },
        ],
        first_author: [
          { required: true, message: "请输入第一作者", trigger: "blur" },
        ],
        press: [{ required: true, message: "请输入出版社", trigger: "blur" }],
        book_number: [
          { required: true, message: "请输入书号", trigger: "blur" },
        ],
        remarks: [{ required: true, message: "请输入备注", trigger: "blur" }],
        attrOrginId: [
          { required: true, message: "请选择单位", trigger: "change" },
        ],
        yearId: [{ required: true, message: "请选择年份", trigger: "change" }],
        publication_time: [
          { required: true, message: "请选择出版时间", trigger: "change" },
        ],
      },
    };
  },
  mounted() {
    this.getResearList();
    this.getYearsListData();
    this.attrOrginGetList();
  },
  methods: {
    cancel(formName){
        formName==='addForm'?this.addDialogVisible=false:this.editDialogVisible=false;
        this.$refs[formName].clearValidate();
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
     changeFile(file) {
        let loading = this.$loading({
                lock: true,
                text: "拼命上传中",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.2)"
            });
                this.$refs.uploadFile.clearFiles();
        this.isSuccess=false;
        this.fileList.push(file)
        let fileData=new FormData();
        console.log("file")
        fileData.append("file",this.fileList[0].raw);

        if( this.isSuccess==false){
            importAcadmic(fileData).then(res=>{
            if(res.code==200){
              this.$message.success("添加成功");
              loading.close();
              this.getResearList();
            }
             
          }).catch(error=>{
                 this.$message.error("上传失败")
                 loading.close();
          })
        }
          loading.close();
         this.isSuccess=true
    },

    // 获取学术著作列表
    getResearList() {
      academicWork(this.queryList).then((res) => {
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
      this.$refs.addForm.validate((valid) => {
        console.log(this.addForm);
        if (valid) {
          addAcademicWork(this.addForm).then((res) => {
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
    // 编辑项目立项表单 前查询
    editRowInfo(row) {
      console.log(row);
      this.eidtForm = { ...row };
      this.editDialogVisible = true;
    },
    // 编辑项目立项表单提交
    edtiFormSub() {
      this.$refs.eidtForm.validate(validate=>{
        if(!validate) return;
        editAcademicWork(this.eidtForm).then((res) => {
          this.getResearList();
          this.$message.success("修改成功！");
          this.editDialogVisible = false;
        });
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
        delAcademicWork({ id: id }).then((res) => {
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
  justify-content: space-around;
  .el-input {
    width: 240px;
  }
}
.search-name {
  width: 220px;
  margin-right: 10px;
}
.inner-input {
  width: 240px;
}
</style>