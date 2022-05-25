<template>
  <div class="approve">
    <!-- 科研项目立项汇总页面 -->
    <div class="tools">
      <div>
        <!-- <span>请选择年份进行筛选：</span>
        <el-select
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
        <!-- <el-input
          class="search-name"
          v-model="queryList.searchStr"
          placeholder="请根据名称查询"
        ></el-input> -->
        <!-- <el-button type="success" plain @click="searchList">查询</el-button> -->
        添加单位名称：&nbsp;&nbsp;<el-button type="success" plain @click="addDialogVisible = true"
          >添 加</el-button
        >
        <!-- <el-button type="danger" plain>删 除</el-button> -->
      </div>
      <!-- 添加模态框 -->
      <el-dialog title="添加" :visible.sync="addDialogVisible" width="30%">
        <el-form
          ref="ruleForm"
          :rules="rules"
          :model="addForm"
          label-width="100px"
          class="addForm"
        >
          <el-form-item label="单位名称：" prop="attrOrginName">
            <el-input  v-model="addForm.attrOrginName"  placeholder="请输入类型名称"/>
          </el-form-item>
         </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="addFormSub">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 修改模态框  -->
      <el-dialog title="修改" :visible.sync="editDialogVisible" width="30%">
        <el-form
          ref="ruleForm"
          :rules="rules"
          :model="eidtForm"
          label-width="100px"
          class="addForm"
        >
          <el-form-item label="类型名称：" prop="attrOrginName">
            <el-input v-model="eidtForm.attrOrginName" />
          </el-form-item>
          <!-- <el-form-item label="选择年份" prop="yearId">
            <el-select v-model="eidtForm.yearId" placeholder="请选择年份">
              <el-option
                v-for="item in yearOptions"
                :key="item.yearId"
                :label="item.yearName"
                :value="item.yearId"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="现有教员" prop="numberOfExistingTeachers">
            <el-input v-model="eidtForm.numberOfExistingTeachers" />
          </el-form-item>
          <el-form-item label="投入人力" prop="research_Manpower_Y">
            <el-input v-model="eidtForm.research_Manpower_Y" />
          </el-form-item>
          <el-form-item label="总数" prop="higher_Education_A">
            <el-input v-model="eidtForm.higher_Education_A" />
          </el-form-item>
          <el-form-item label="领导" prop="higher_Leaders_B">
            <el-input v-model="eidtForm.higher_Leaders_B" />
          </el-form-item>
          <el-form-item label="初职及以下" prop="beginningandbelow_D">
            <el-input v-model="eidtForm.beginningandbelow_D" />
          </el-form-item>
          <el-form-item label="博士生" prop="doctoral_Student_E">
            <el-input v-model="eidtForm.doctoral_Student_E" />
          </el-form-item>
          <el-form-item label="中职" prop="secondary_C">
            <el-input v-model="eidtForm.secondary_C" />
          </el-form-item>
          <el-form-item label="硕士生" prop="master_F">
            <el-input v-model="eidtForm.master_F" />
          </el-form-item>
          <el-form-item label="总课时" prop="total_class_Hours_G">
            <el-input v-model="eidtForm.total_class_Hours_G" />
          </el-form-item> -->

          <!-- <el-form-item label="立项日期" prop="createTime">
            <el-date-picker
              v-model="eidtForm.createTime"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              :picker-options="pickerOptions"
            />
          </el-form-item> -->
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="edtiFormSub">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 页面加载的表格 -->
    <el-card class="data">
      <el-table :data="attrOrginOptions" stripe >
        <el-table-column width="300px" type="index" label="序号"  align="center"/>
        <el-table-column min-width="300px" prop="attrOrginName"  label="单位名称"   align="center"/>
        
        <el-table-column  min-width="300px" label="操作" align="center">
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
        :page-sizes="[10, 20, 30,40,50]"
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
  researchManpower,
  addResearchManpower,
  editResearchManpower,
  delResearchManpower,
  getProjectTypeList,
  addAttrorgin,
  delAttrorign,
  editAttrOrign
} from "@/api/project";
export default {
  name: "researchManpower",
  data() {
    return {
      total: 0,
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
      projectLevel: [], // 年份下拉列表值
      value: "",
      tableData: [],
      addDialogVisible: false,
      editDialogVisible: false,
      addForm: {
        attrOrginName:''
      },
      eidtForm: {},
      pageSize:10,
      currentPage:1,
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
        attrOrginName: [
          { required: true, message: "请输入单位名称", trigger: "blur" },
        ],
       
      },
    };
  },
  mounted() {
          this.attrOrginGetList();
    // this.getResearList();
    // this.getYearsListData();

  },
  methods: {
      cancel(){
          this.addDialogVisible = false;
          this.addForm={}
      },
    // 获取项目结项列表
    getResearList() {
      getProjectTypeList().then((res) => {
        this.tableData = res.data;
        this.total = res.data.length;
        console.log('测试')
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
    // 获取单位列表
    attrOrginGetList() {
      attrOrginGetList({ page: this.currentPage, rows: this.pageSize }).then((res) => {
        this.attrOrginOptions = res.data.list;
          this.total = res.data.count;
        console.log(this.attrOrginOptions);
      });
    },
    // 添加项目立项表单
    addFormSub() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          addAttrorgin(this.addForm).then((res) => {
            // console.log(res);
            this.$message.success(res.msg);
             this.addForm={}
            this.addDialogVisible = false;
            
             this.attrOrginGetList();
          });
        } else {
          return false;
        }
      });
    },
    // 编辑项目立项表单 前查询
    editRowInfo(row) {
      console.log(row);
      //   for (let i = 0; i < this.projectLevel.length; i++) {
      //     if (row.projectLevelName === this.projectLevel[i].levelName) {
      //       row.projectLevelId = this.projectLevel[i].levelId;
      //     }
      //   }
      //   for (let i = 0; i < this.projectTypeList.length; i++) {
      //     if (row.projectTypeName == this.projectTypeList[i].typeName) {
      //       row.projectTypeId = this.projectTypeList[i].projectTypeId;
      //     }
      //   }
      this.eidtForm = { ...row };
      this.editDialogVisible = true;
    },
    // 编辑项目立项表单提交
    edtiFormSub() {
      editAttrOrign(this.eidtForm).then((res) => {
        console.log(res);
     
        this.$message.success("修改成功！");
           this.attrOrginGetList();
        this.editDialogVisible = false;
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
        delAttrorign({ id: id }).then((res) => {
          console.log(res);
          this.$message.success(res.msg);
          this.attrOrginGetList();
        });
      }
    },
    // 分页器方法
    handleSizeChange(val) {
      
      this.pageSize=val;
      this.attrOrginGetList();
    },
    handleCurrentChange(val) {
        console.log(val)
      this.currentPage = val;
      this.attrOrginGetList();
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
  margin: 20px 0 0 20px;
}

.addForm {
  padding: 0 40px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
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
