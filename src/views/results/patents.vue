<template>
  <div class="approve">
    <!-- 科研项目立项汇总页面 -->
    <div class="tools">
      <div>
        <span>请选择年份进行筛选：</span>
        <el-select
          class="inner-input"
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
        </el-select>
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
        style="margin-left:10px;"
          class="upload-demo"
          multiple
          :on-change="changeFile"
          action=""
          ref="uploadFile"
          :auto-upload="false"
        >   
          <el-button type="primary" plain >导入Excel文件</el-button>
        </el-upload>
         <div>
        <el-button  style="margin-left:10px;" type="primary" plain>  <a
          href="/static/专利.xlsx" download>下载模板</a></el-button>
          </div>
    </div>
    
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
          <el-form-item label="发明单位" prop="attrOrginId">
            <el-select
              class="inner-input"
              v-model="addForm.attrOrginId"
              placeholder="请选择发明单位"
            >
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
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
          <el-form-item label="专利名称" prop="patent_name">
            <el-input
              v-model="addForm.patent_name"
              placeholder="请输入专利名称"
            />
          </el-form-item>
            </el-col>
              <el-col :span="12">
          <el-form-item label="专利类型" prop="patentTypeId">
            <el-select
              class="inner-input"
              v-model="addForm.patentTypeId"
              placeholder="请选择专利类型"
            >
              <el-option
                v-for="item in linTypeList"
                :key="item.patentTypeId"
                :label="item.patentTypeName"
                :value="item.patentTypeId"
              />
            </el-select>
          </el-form-item>
            </el-col>
      </el-row>
        
        <el-row>
            <el-col :span="12">
          <el-form-item label="状态" prop="isApplication">
            <el-select
              class="inner-input"
              v-model="addForm.isApplication"
              placeholder="请选择状态"
            >
              <el-option
                v-for="item in isApplicationOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
            </el-col>
              <el-col :span="12">
          <el-form-item label="发明人" prop="inventor">
            <el-input v-model="addForm.inventor"  placeholder="请输入发明人"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <!-- patent_time -->
           <el-col :span="12">
              <el-form-item label="专利号" prop="patent_number">
                <el-input v-model="addForm.patent_number"   placeholder="请输入专利号"/>
              </el-form-item>
            </el-col>
             <el-col :span="12">
              <el-form-item label="专利时间" prop="patent_time">
                 <el-date-picker
                          v-model="addForm.patent_time"
                          type="datetime"
                          placeholder="请选择专利时间"
                          align="right"
                          :picker-options="pickerOptions">
                        </el-date-picker>
                <!-- <el-input v-model="addForm.patent_time"   placeholder="请输入专利时间"/> -->
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
          <el-form-item label="发明单位" prop="attrOrginId">
            <el-select
              class="inner-input"
              v-model="eidtForm.attrOrginId"
              placeholder="请选择发明单位"
            >
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
          </el-col>  
    </el-row>

              <el-row>
                  <el-col :span="12">
          <el-form-item label="专利名称" prop="patent_name">
            <el-input
              v-model="eidtForm.patent_name"
              placeholder="请输入专利名称"
            />
          </el-form-item>
             </el-col>  
                 <el-col :span="12">
          <el-form-item label="专利类型" prop="patentTypeId">
            <el-select
              class="inner-input"
              v-model="eidtForm.patentTypeId"
              placeholder="请选择专利类型"
            >
              <el-option
                v-for="item in linTypeList"
                :key="item.patentTypeId"
                :label="item.patentTypeName"
                :value="item.patentTypeId"
              />
            </el-select>
          </el-form-item>
                  </el-col>  
                      </el-row>

                <el-row>      
                   <el-col :span="12">  
          <el-form-item label="状态" prop="isApplication">
            <el-select
              class="inner-input"
              v-model="eidtForm.isApplication"
              placeholder="请选择状态"
            >
              <el-option
                v-for="item in isApplicationOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
               </el-col>  
                  <el-col :span="12">  
          <el-form-item label="发明人" prop="inventor">
            <el-input v-model="eidtForm.inventor" placeholder="请输入发明人"/>
          </el-form-item>
            </el-col>  
                 </el-row>
          <el-row >
            <el-col :span="12">
                <el-form-item style="float:left;" label="专利号" prop="patent_number">
                  <el-input v-model="eidtForm.patent_number" placeholder="请输入专利号"/>
                </el-form-item>
            </el-col>
              <el-col :span="12">
                  <el-form-item label="专利时间" prop="patent_time">
                         <el-date-picker
                          v-model="eidtForm.patent_time"
                          type="datetime"
                          placeholder="请选择专利时间"
                          align="right"
                          :picker-options="pickerOptions">
                        </el-date-picker>
                    <!-- <el-input v-model="eidtForm.patent_time"   placeholder="请输入专利时间"/> -->
                  </el-form-item>
                </el-col>

          </el-row>
         
     
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel('eidtForm')">取 消</el-button>
        <el-button type="primary" @click="edtiFormSub">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 页面加载的表格 -->
    <el-card class="data">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="专利名称" align="center" prop="patent_name"> </el-table-column>
        <el-table-column label="专利类型" align="center" prop="patentTypeName">
        </el-table-column>
        <el-table-column label="发明单位" align="center" prop="attrOrginName">
        </el-table-column>
        <el-table-column label="发明人" align="center" prop="inventor"> </el-table-column>
        <el-table-column label="专利号" align="center" prop="patent_number"> </el-table-column>
        <el-table-column width="220" align="center" label="操作">
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
        layout="total, sizes, prev, pager, next,jumper"
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
  
  getPatent,
  getLinTypeList,
  patentAdd,
  patentEdit,
  patentDel,
  importzhuanli
  
} from "@/api/publishedPapers";
import { getYearListData, attrOrginGetList } from "@/api/project";
export default {
  name: "reportAndpublished",
  data() {
    return {
           timeArea:"",
        isSuccess:false,
      fileList:[],
      tableData: [],
      total: 1,
      queryId: null,
      queryList: {
        page: 1,
        rows: 10,
        yearId: "",
        searchStr: "",
      },
      yearOptions: [], // 年份下拉列表值
      attrOrginOptions: [], // 单位下拉列表值
      projectTypeList: [], // 年份下拉列表值
      linTypeList: [], //专利类型下拉列表值
      projectLevel: [], // 年份下拉列表值
      value: "",
      addDialogVisible: false,
      editDialogVisible: false,
      addForm: {
        attrOrginId: null, //发明单位
        patent_name: null, // 专利名称
        patenttype: null, //专利类型
        inventor: null, //发明人
        patent_number: null, //专利号
        isApplication: null, //授权or申请
        yearId: null, // 年份 
        patent_time:null,
        // publication_time: null, // 日期
      },
      isApplicationOption: [
        {
          value: 0,
          label: "申请",
        },
        {
          value: 1,
          label: "授权",
        },
      ],
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
        inventor: [
          { required: true, message: "请输入发明人", trigger: "blur" },
        ],
        patent_number: [
          { required: true, message: "请输入专利号", trigger: "blur" },
        ],
        patent_name: [
          { required: true, message: "请输入专利名称", trigger: "blur" },
        ],
        attrOrginId: [
          { required: true, message: "请选择发明单位", trigger: "change" },
        ],
        patentTypeId: [
          { required: true, message: "请选择专利类型", trigger: "change" },
        ],
        isApplication: [
          { required: true, message: "请选择状态", trigger: "change" },
        ],
        yearId: [{ required: true, message: "请选择年份", trigger: "change" }],
        createTime: [
          { required: true, message: "请选择项目创建时间", trigger: "change" },
        ],
        patent_time:[{ required: true, message: "请选择专利时间", trigger: "change" }],
      },
    };
  },
  mounted() {
    this.getLinTypeList();
    this.getYearsListData();
    this.attrOrginGetList();
    this.getResearList();
  },
  methods: {
    //  changeTime(){
    //    if(this.timeArea){
    //        this.queryList.beginTime=this.timeArea[0];
    //        this.queryList.endTime=this.timeArea[1];
    //    }else{
    //        this.queryList.beginTime=''
    //        this.queryList.endTime=''
    //    }
       
    //     this.getResearList();
    //   },
      
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
                background: "rgba(0, 0, 0, 0.2)"
            });
                this.$refs.uploadFile.clearFiles();
        this.isSuccess=false;
        this.fileList.push(file)
        let fileData=new FormData();
        console.log("file")
        fileData.append("file",this.fileList[0].raw);
       
        if( this.isSuccess==false){
            importzhuanli(fileData).then(res=>{
            if(res.code==200){
              loading.close();
              this.$message.success("添加成功");
             this.getResearList();
            }
             
          })
        }
         loading.close();
         this.isSuccess=true
    },
    // 获取专利类型
    getLinTypeList() {
      getLinTypeList().then((res) => {
        console.log(res);
        this.linTypeList = res.data;
      });
    },
    // 获取咨询报告列表
    getResearList() {
      getPatent(this.queryList).then((res) => {
        this.tableData = res.data.list;
        this.total = res.data.count;
        console.log(this.tableData);
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
          patentAdd(this.addForm).then((res) => {
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
        if(!valid) return false;
        patentEdit(this.eidtForm).then((res) => {
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
        patentDel({ id: id }).then((res) => {
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
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  // padding: 0 40px;
  .el-input {
    width: 240px;
  }
}
// .addForm {
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: space-around;
//   .el-input {
//     width: 240px;
//   }
// }

.search-name {
  width: 220px;
  margin-right: 10px;
}
.inner-input {
  width: 240px;
}
</style>
