<template>
  <div class="approve">
    <!-- 科研项目立项汇总页面 -->
    <div class="tools">
      <div>
        <span>请选择项目类型: </span>
        <el-select
          v-model="projectvalue"
          placeholder="请选择项目类型"
          @change="searchProject"
        >
          <el-option
            v-for="item in projectTypeList"
            :key="item.projectTypeId"
            :label="item.typeName"
            :value="item.projectTypeId"
          />
        </el-select>
      </div>
        <div style="margin-left: 10px;">
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
      </div>
        <el-input
        style="margin-left:10px;"
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
      <el-upload
        style="margin-left: 10px"
        class="upload-demo"
        multiple
        :on-change="changeFile"
        action=""
        ref="uploadFile"
        :auto-upload="false"
      >
        <el-button type="primary" plain>导入Excel文件</el-button>
      </el-upload>
      <div>
        <el-button style="margin-left: 10px" type="primary" plain>
          <a href="/static/科研项目.xlsx" download>下载模板</a></el-button
        >
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
          <el-form-item label="是否结题" prop="isFinish">
            <el-select
              class="inner-input"
              v-model="addForm.isFinish"
              placeholder="请选择"
            >
              <el-option
                v-for="item in isFinishOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="项目名称" prop="project_name">
            <el-input v-model="addForm.project_name" placeholder="请输入项目名称" clearable/>
          </el-form-item>
          <el-form-item label="负责人" prop="person_in_charge">
            <el-input v-model="addForm.person_in_charge"  placeholder="请输入负责人" clearable/>
          </el-form-item>
          <el-form-item label="总经费" prop="total_funds">
            <el-input v-model.number="addForm.total_funds" placeholder="请输入总经费" clearable/>
          </el-form-item>

           <el-form-item label="编号" prop="code">
            <el-input v-model="addForm.code" placeholder="请输入编号" clearable/>
          </el-form-item>
          
           <el-form-item label="是否加密" prop="isEncrypt">
            <el-select v-model="addForm.isEncrypt"  class="inner-input">
                <el-option v-for="item in isEncryptOptions" 
               :key="item.value"
               :value="item.value"
               :label="item.label"></el-option>
                
             </el-select>
            </el-form-item>
          <el-form-item label="项目时间" prop="projectTime">
             <el-date-picker
               v-model="addForm.projectTime" 
                type="datetime"
                placeholder="选择日期时间"
                align="right"
                :picker-options="pickerOptions">
              </el-date-picker>
          </el-form-item>
          <el-row>
              <el-col :span="12">
                   <el-form-item
                      v-if="projectTypeId == '899d1f2f-a39e-11ec-89db-525400a8df07'"
                      label="合作单位"
                      prop="cooperation_AttrOrgin"
                    >
                    <el-input v-model="addForm.cooperation_AttrOrgin" />
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
          ref="editForm"
          :rules="rules"
          :model="eidtForm"
          label-width="100px"
          class="addForm"
        >
          <el-form-item label="选择单位" prop="attrOrginId">
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
          <el-form-item label="是否结题" prop="isFinish" >
            <el-select
              class="inner-input"
              v-model="eidtForm.isFinish"
              placeholder="请选择"
            >
              <el-option
                v-for="item in isFinishOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="项目名称" prop="project_name">
            <el-input v-model="eidtForm.project_name" placeholder="请输入项目名称" clearable/>
          </el-form-item>
          <el-form-item label="负责人" prop="person_in_charge">
            <el-input v-model="eidtForm.person_in_charge" placeholder="请输入负责人" clearable/>
          </el-form-item>
          <el-form-item label="总经费" prop="total_funds">
            <el-input v-model="eidtForm.total_funds" placeholder="请输入总经费" clearable/>
          </el-form-item>
            <el-form-item label="编号" prop="code">
            <el-input v-model="eidtForm.code" placeholder="请输入编号" clearable/>
          </el-form-item>
          
           <el-form-item label="是否加密" prop="isEncrypt">
             <el-select v-model="eidtForm.isEncrypt"    class="inner-input">
               <el-option v-for="item in isEncryptOptions" 
                :key="item.value"
                :value="item.value"
                :label="item.label"></el-option>
                
             </el-select>
          </el-form-item>
          <el-form-item label="项目时间" prop="projectTime">
             <el-date-picker
               v-model="eidtForm.projectTime" 
                type="datetime"
                placeholder="选择日期时间"
                align="right"
                :picker-options="pickerOptions">
              </el-date-picker>
          </el-form-item>
          <el-form-item
            v-if="projectTypeId == '899d1f2f-a39e-11ec-89db-525400a8df07'"
            label="合作单位"
            prop="cooperation_AttrOrgin"
          >
            <el-input v-model="eidtForm.cooperation_AttrOrgin"  clearable/>
          </el-form-item>


        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel('editForm')">取 消</el-button>
          <el-button type="primary" @click="edtiFormSub">确 定</el-button>
        </span>
      </el-dialog>

    </div>
    <!-- 页面加载的表格 -->
    <el-card class="data">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column type="index" label="序号" width="80" align="center" />
        <el-table-column prop="attrOrginName" label="单位" align="center" />
        <el-table-column prop="project_name" label="项目名称" align="center" />
        <el-table-column prop="person_in_charge" label="负责人" align="center"/>
        <el-table-column prop="total_funds" label="总经费" align="center" />
        <el-table-column prop="projectTypeName" label="项目类别" align="center" />
        <el-table-column prop="code" label="编号" align="center" />
        <el-table-column prop="isEncrypt" :formatter="formatIsEncrypt" label="是否加密" align="center" />
        <el-table-column prop="projectTime" :formatter="formatTime" label="项目时间" align="center" />
        <el-table-column v-if="projectTypeId == '899d1f2f-a39e-11ec-89db-525400a8df07'" prop="cooperation_AttrOrgin"
          label="合作单位"
          align="center"
        />
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
  researchProject,
  getProjectTypeList,
  addResearchProject,
  editResearchProject,
  delResearchProject,
  importProject,
} from "@/api/project";
export default {
  name: "NaturalSciences",
  data() {
    return {
      projectvalue: "",
      isSuccess: false,
      fileList: [],
      total: 0,
      queryId: null,
      projectTypeId: "",
      queryList: {
        page: 1,
        rows: 10,
        yearId: "",
        searchStr: "",
        projectTypeId: "",
        beginTime:'',
        endTime:''
      },
      timeArea:[],
      yearOptions: [], // 年份下拉列表值
      attrOrginOptions: [], // 单位下拉列表值
      projectTypeList: [], //
      projectLevel: [],
      value: "",
      tableData: [],
      addDialogVisible: false,
      editDialogVisible: false,
      addForm: {
        attrOrginId: null, // 单位列表
        project_name: null, //项目名称
        person_in_charge: null, //负责人
        total_funds: null, //总经费
        projectTypeId: "", //项目类别 projectTypeName
        isFinish: 0,
        cooperation_AttrOrgin: "",
      },
      isFinishOptions: [
        {
          value: 0,
          label: "延续",
        },
        {
          value: 1,
          label: "结题",
        },
      ],
      isEncryptOptions:[
          { 
          value: 1,
          label: "是",
          },
          { 
          value: 0,
          label: "否",
          }],
      eidtForm: {},
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
          { required: true, message: "请选择单位", trigger: "change" },
        ],
        isFinish: [
          { required: true, message: "请选择是否结题", trigger: "change" },
        ],
        yearId: [{ required: true, message: "请选择年份", trigger: "change" }],
        project_name: [
          { required: true, message: "请输入项目名称", trigger: "blur" },
        ],
        person_in_charge: [
          { required: true, message: "请输入负责人", trigger: "blur" },
        ],
        total_funds: [
          { required: true, message: "请输入总经费", trigger: "change" },
          { type:'number', message: '总经费必须为数字值'}
        ],
        price: [
          {
            required: true,
            message: "请输入项目经费(万元)",
            trigger: "blur",
          },
        ],
         code: [
          {
            required: true,
            message: "请输入项目编号",
            trigger: "blur",
          },
        ],
        isEncrypt: [
          {
            required: true,
            message: "请选择是否加密",
            trigger: "blur",
          },
        ],

        projectTime: [
          { required: true, message: "请选择项目创建时间", trigger: "blur" },
        ],
        cooperation_AttrOrgin: [
          {
            required: true,
            message: "请输入合作单位",
            trigger: "blur",
          },
        ],
      },
      projectParamsTypeId: null,
    };
  },
  mounted() {
    this.getProjectTypeList();
    this.getYearsListData();
    this.attrOrginGetList();
  },
  methods: {
    cancel(formName){

      if(formName==='addForm'){
        this.addDialogVisible=false;
      }else{
         this.editDialogVisible=false;
      }
        this.$refs[formName].clearValidate();
    },
    changeFile(file) {
      let loading = this.$loading({
        lock: true,
        text: "拼命上传中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.2)",
      });
      this.$refs.uploadFile.clearFiles();
      this.isSuccess = false;
      this.fileList.push(file);
      let fileData = new FormData();
      console.log("file");
      fileData.append("file", this.fileList[0].raw);
      if (this.isSuccess == false) {
        importProject(fileData).then((res) => {
          loading.close();
          this.$message.success("添加成功");
          this.getResearList();
        });
      }
      loading.close();
      this.isSuccess = true;
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
    // 获取项目级别列表
    getProjectTypeList() {
      getProjectTypeList().then((res) => {
        this.projectTypeList = res.data;
        if (this.projectTypeList.length > 0) {
          this.projectTypeId = this.projectTypeList[0].projectTypeId;
          this.projectvalue = this.projectTypeList[0].projectTypeId;

          this.getResearList();
        }
      });
    },
    // 获取项目结项列表
    getResearList() {
      if (this.projectTypeId) {
        this.queryList.projectTypeId = this.projectTypeId;
        researchProject(this.queryList).then((res) => {
          this.tableData = res.data.list;
          this.total = res.data.count;
          console.log(res);
        });
      } else {
        console.log("无projectId");
      }
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
      console.log(e);
      this.queryList.yearId = e;

      this.getResearList(this.queryList);
    },
    searchProject(e) {
      console.log(e);
      this.projectTypeId = e;
      this.getResearList(this.queryList);
    },
    // 获取单位列表下拉框
    attrOrginGetList() {
      attrOrginGetList({ page: 1, rows: 100 }).then((res) => {
        this.attrOrginOptions = res.data.list;
        console.log(this.attrOrginOptions);
      });
    },
    // 添加项目立项表单
    addFormSub() {
      this.$refs['addForm'].validate((valid) => {
        this.addForm.projectTypeId = this.projectTypeId;
        if (valid) {
          addResearchProject(this.addForm).then((res) => {
            this.$message.success(res.msg);
            this.addDialogVisible = false;
            this.$refs['addForm'].resetFields()
            // this.getProjectTypeList();
            this.getResearList();
          });
        } else {
          return false;
        }
      });
    },
    // 编辑项目立项表单 前查询
    editRowInfo(row) {
      this.eidtForm = { ...row };
      this.editDialogVisible = true;
    },
    // 编辑项目立项表单提交
    edtiFormSub() {
      this.$refs['editForm'].validate(valid=>{
          if(valid){
              editResearchProject(this.eidtForm).then((res) => {
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
        delResearchProject({ id: id }).then((res) => {
          console.log(res);
          this.$message.success(res.msg);
          // this.getProjectTypeList();
          this.getResearList();
        });
      }
    },
    // 分页器方法
    handleSizeChange(val) {
      this.queryList.page = 1;
      this.queryList.rows = val;
      // this.getProjectTypeList();
      this.getResearList();
    },
    handleCurrentChange(val) {
      this.queryList.page = val;
      // this.getProjectTypeList();
      this.getResearList();
    },
    //条件查询
    searchList() {
      this.getProjectTypeList();
      this.getResearList();
    },
    formatIsEncrypt(row){
        return row.isEncrypt===1?'是':'否'
    },
    formatTime(row){
       return  row.projectTime? this.$moment(row.projectTime).format("YYYY-MM-DD HH:mm:ss"):''
    }
  },
};
</script>
<style scoped lang="scss">
.approve {
  width: 100%;
  .tools {
    width: 100%;
    // padding: 10px;
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
}
.search-name {
  width: 160px;
  margin-right: 10px;
}
.inner-input {
  width: 240px;
}
::v-deep ul.el-upload-list.el-upload-list--text {
  width: 130px !important;
}

::v-deep a.el-upload-list__item-name {
  width: 110px;
}
</style>
