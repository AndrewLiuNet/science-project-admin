<template>
  <div class="approve">
    <!-- 科研项目立项汇总页面 -->
    <div class="tools">
        <div>
          <span>请选择时间:</span>
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
        <el-input
          style="margin-left:10px;"
          class="search-name"
          v-model="queryList.searchStr"
          placeholder="请输入标题"
          clearable
          @clear="getResearList"
        ></el-input>
        <el-button type="success" plain @click="searchList">查询</el-button>
        <el-button type="success" plain @click="addDialogVisibleBtn"
          >添 加</el-button>
        </div>
      <el-dialog
        title="添加"
        :visible.sync="addDialogVisible"
        width="70%"
        :destroy-on-close="true"
      >
        <el-form
          ref="ruleForm"
          :rules="rules"
          :model="addForm"
          label-width="100px"
          class="addForm"
        >
        <el-row>
          <el-col :span="12">
          <el-form-item label="标题" prop="memTitle">
            <el-input v-model="addForm.memTitle" placeholder="请输入标题"/>
          </el-form-item>
          </el-col>
            <el-col :span="12">
          <el-form-item label="时间" prop="memTime">
             <!-- value-format="YYYY-MM-DD HH:mm:ss" -->
            <el-date-picker
              v-model="addForm.memTime"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
               value-format="yyyy-MM-dd HH:mm:ss"
              :picker-options="pickerOptions"
            />
          </el-form-item>
             </el-col>
        </el-row>
         <el-row>
           <el-col :span="12">
              <el-form-item label="年份" prop="yearId">
                  <el-select v-model="addForm.yearId" placeholder="请选择年份">
                    <el-option v-for="(item,index) in yearOptions"
                    :key="index"
                    :value="item.yearId"
                    :label="item.yearName"></el-option>
                  </el-select>
              </el-form-item>
            </el-col>
             <el-col :span="12">
              <el-form-item label="单位" prop="attrOrginId">
                <el-select v-model="addForm.attrOrginId" placeholder="请选择单位">
                  <el-option v-for="(item,index) in attrOrigin" 
                  :key="index"
                  :label="item.attrOrginName"
                  :value="item.id"></el-option>
                </el-select>
            </el-form-item>
           </el-col>
     </el-row>
             <el-form-item label="内容" prop="memContent">
            <div id="demo1" ref="edirRef"></div>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addFormSub">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 修改模态框  -->
      <el-dialog
        title="修改"
        :visible.sync="editDialogVisible"
        width="70%"
        :destroy-on-close="true"
      >
        <el-form
          ref="ruleForm2"
          :rules="rules"
          :model="eidtForm"
          label-width="100px"
          class="addForm"
        >
               <el-row>
          <el-col :span="12">
          <el-form-item label="标题" prop="memTitle">
            <el-input v-model="eidtForm.memTitle" placeholder="请输入标题"/>
          </el-form-item>
          </el-col>
            <el-col :span="12">
          <el-form-item label="时间" prop="memTime">
            <el-date-picker
              v-model="eidtForm.memTime"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
                value-format="yyyy-MM-dd HH:mm:ss"
              :picker-options="pickerOptions"
            />
          </el-form-item>
             </el-col>
        </el-row>
         <el-row>
           <el-col :span="12">
              <el-form-item label="年份" prop="yearId">
                  <el-select v-model="eidtForm.yearId" placeholder="请选择年份">
                    <el-option v-for="(item,index) in yearOptions"
                    :key="index"
                    :value="item.yearId"
                    :label="item.yearName"></el-option>
                  </el-select>
              </el-form-item>
            </el-col>
             <el-col :span="12">
                <el-form-item label="单位" prop="attrOrginId">
                  <el-select v-model="eidtForm.attrOrginId" placeholder="请选择单位">
                    <el-option v-for="(item,index) in attrOrigin" 
                    :key="index"
                    :label="item.attrOrginName"
                    :value="item.id"></el-option>
                  </el-select>
              </el-form-item>
           </el-col>
     </el-row>
          <el-form-item label="内容" prop="memContent">
            <div id="demo2" ref="edirRef2"></div>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="edtiFormSub">确 定</el-button>
        </span>
      </el-dialog>
    </div>

    <!-- 页面加载的表格 -->
    <el-card class="data">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column type="index" label="序号" min-width="16%" align="center"/>
        <el-table-column prop="memTitle" label="标题" min-width="16%" align="center"/>
        <el-table-column prop="memTime" label="时间" min-width="16%" align="center"/>
         <el-table-column prop="attrOrginId" :formatter="getAttr" label="单位" min-width="16%" align="center"/>
          <el-table-column prop="yearId" :formatter="getYear" label="年份" min-width="16%" align="center"/>
        <el-table-column width="220" label="操作" align="center">
          <template slot-scope="scope">
            <el-link
              icon="el-icon-edit"
              type="primary"
              @click="editRowInfo(scope.row)"
              >修改</el-link
            >
            <el-link
              style="margin-left: 10px"
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
import { getMems, deleteMems, addMems, editMems } from "@/api/allEvents";
import { getYears } from "@/api/getYears";
import { attrOrginGetList,attrOriginById } from '@/api/project'
import wangEditor from "wangeditor";
export default {
  name: "AllEvents",
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
        beginTime:"",
        endTime:""
      },
      yearOptions: [], // 年份下拉列表值
      projectTypeList: [], // 年份下拉列表值
      projectLevel: [], // 年份下拉列表值
      value: "",
      tableData: [],
      addDialogVisible: false,
      editDialogVisible: false,
      addForm: {
        memTitle: null, // 标题
        memTime: null, // 时间
        yearId: null, //年份
        memContent: null, // 内容
        yearId:'',
        attrOrginId:''
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
        memTitle: [{ required: true, message: "请输入标题", trigger: "blur" }],
        memTime: [{ required: true, message: "请选择时间", trigger: "change" }],
        yearId: [{ required: true, message: "请选择年份", trigger: "change" }],
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
        attrOrigin:[]
    };
  },
  mounted() {
    this.getResearList();
    this.getYearsListData();
    this.initAttr();
  },
  methods: {

    initAttr(){
      let params={
          "page": 1,
          "rows": 100,
          "yearId": "",
          "searchStr": "",
          "attrOrginId": "",
          "beginTime": "",
          "endTime": ""
        }
      attrOrginGetList(params).then(res=>{
         console.log(res)
          this.attrOrigin=res.data.list
      })
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
    //打开添加模态框，创建富文本
    addDialogVisibleBtn() {
      this.addDialogVisible = true;
      setTimeout(() => {
        //创建模态框容器
        const editor = new wangEditor(`#demo1`);
        //打开上传图片功能
        editor.config.uploadImgServer =
          process.env.VUE_APP_BASE_API + "/api/yb_Memorabilia/UploadFiles_1";
        // editor.config.uploadImgServer =
        //   "http://101.34.35.79:80/api/yb_Memorabilia";
        editor.config.uploadFileName = "file";
        editor.config.debug = true;
        editor.config.uploadImgTimeout = 5 * 1000 * 100;
        editor.config.uploadImgHooks = {
          // 图片上传并返回了结果，图片插入已成功
          success: function (xhr) {
            console.log("success", xhr);
          },
          // 图片上传并返回了结果，但图片插入时出错了
          fail: function (xhr, editor, resData) {
            console.log(xhr);
            console.log("fail", resData);
            console.log(editor);
          },
          // 上传图片出错，一般为 http 请求的错误
          error: function (xhr, editor, resData) {
            console.log("error", xhr, resData);
          },
          customInsert: function (insertImgFn, result) {
            // result 即服务端返回的接口
            console.log("customInsert", result);
            // insertImgFn 可把图片插入到编辑器，传入图片 src ，执行函数即可
            insertImgFn(result.data);
          },
        };
        // const template = row.desc;
        // this.$refs.edirRef.innerHTML = template;
        //富文本内容改变的事件
        editor.config.onchange = (newHtml) => {
          this.editorData = newHtml;
        };
        // 创建编辑器
        editor.create();
        this.editor = editor;
      }, 0);
    },
    // 获取项目立项列表
    getResearList() {
      getMems(this.queryList).then((res) => {
        this.tableData = res.data.menList;
        this.total = res.data.count;
        console.log(res);
      });
    },
    // 获取年份加载下拉框
    getYearsListData() {
      getYears().then((res) => {
        console.log(res);
        this.yearOptions = res.data;
      });
    },
    // 根据年份筛选数据
    searchYear(e) {
      // console.log(e);
      this.queryList.yearId = e;
      this.getResearList();
    },
    // 添加项目立项表单
    addFormSub() {
      // this.addForm = {}
      this.addForm.memContent = this.editor.txt.html();
      // console.log(this.addForm);
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          addMems(this.addForm).then((res) => {
            // console.log(res);
            this.$message.success(res.msg);
            this.addDialogVisible = false;
            this.getResearList();
            this.addForm = {};
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
      setTimeout(() => {
        //创建模态框容器
        const editor = new wangEditor(`#demo2`);
        //打开上传图片功能
        editor.config.uploadImgServer =
          process.env.VUE_APP_BASE_API + "/api/yb_Memorabilia/UploadFiles_1";
        // editor.config.uploadImgServer =
        //   "http://101.34.35.79:80/api/yb_Memorabilia";
        editor.config.uploadFileName = "file";
        editor.config.debug = true;
        editor.config.uploadImgTimeout = 5 * 1000 * 100;
        editor.config.uploadImgHooks = {
          // 图片上传并返回了结果，图片插入已成功
          success: function (xhr) {
            console.log("success", xhr);
          },
          // 图片上传并返回了结果，但图片插入时出错了
          fail: function (xhr, editor, resData) {
            console.log(xhr);
            console.log("fail", resData);
            console.log(editor);
          },
          // 上传图片出错，一般为 http 请求的错误
          error: function (xhr, editor, resData) {
            console.log("error", xhr, resData);
          },
          customInsert: function (insertImgFn, result) {
            // result 即服务端返回的接口
            console.log("customInsert", result);
            // insertImgFn 可把图片插入到编辑器，传入图片 src ，执行函数即可
            insertImgFn(result.data);
          },
        };
        //赋值
        const template = row.memContent;
        console.log(template);
        this.$refs.edirRef2.innerHTML = template;
        //富文本内容改变的事件
        editor.config.onchange = (newHtml) => {
          this.editorData = newHtml;
        };
        // 创建编辑器
        editor.create();
        this.editor = editor;
      }, 0);

      console.log(this.eidtForm);
      // this.eidtForm.projectName = row.projectName;
      // this.eidtForm.responsibilityPer = row.responsibilityPer;
      // this.eidtForm.price = row.price;
      // this.eidtForm.yearId = row.yearId;
      // this.eidtForm.createTime = row.createTime;
      // console.log(this.eidtForm);
      this.editDialogVisible = true;
    },
    // 编辑项目立项表单提交
    edtiFormSub() {
      this.eidtForm.memContent = this.editor.txt.html();
      this.$refs.ruleForm2.validate((valid) => {
        if (valid) {
          editMems(this.eidtForm).then((res) => {
            console.log(res);
            this.$message.success("信息修改成功！");
            this.getResearList();
            this.editDialogVisible = false;
          });
        } else {
          return false;
        }
      });
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
        deleteMems({ id: id }).then((res) => {
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
    getAttr(row){
      if(row.attrOrginId){
       let attr= this.attrOrigin.find(e=>{
         return e.id===row.attrOrginId
       })
       return attr?.attrOrginName
      }
    },
    getYear(row){
      if(row.yearId){
        let year=this.yearOptions.find(e=>{
          return e.yearId===row.yearId
        })
        return year?.yearName
      }
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
  .el-input,.el-select {
    width: 85%;
  }
}
.search-name {
  width: 220px;
  margin-right: 10px;
}
</style>
