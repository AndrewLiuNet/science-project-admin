<template>
  <div class="approve">
    <!-- 科研项目立项汇总页面 -->
    <div class="tools">
      <div>
        <span>请选择年份进行筛选：</span>
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
        </el-select>
      </div>
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
        <!-- <el-button type="danger" plain>删 除</el-button> -->
      </div>
      <!-- 添加模态框 -->
      <el-dialog title="添加" :visible.sync="addDialogVisible" width="50%">
        <el-form
          ref="ruleForm"
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
            <el-input v-model="addForm.project_name" />
          </el-form-item>
          <el-form-item label="负责人" prop="person_in_charge">
            <el-input v-model="addForm.person_in_charge" />
          </el-form-item>
          <el-form-item label="总经费" prop="total_funds">
            <el-input v-model="addForm.total_funds" />
          </el-form-item>
          <!-- <el-form-item label="立项日期" prop="createTime">
            <el-date-picker
              v-model="addForm.createTime"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              :picker-options="pickerOptions"
            />
          </el-form-item> -->
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addFormSub">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 修改模态框  -->
      <el-dialog title="修改" :visible.sync="editDialogVisible" width="50%">
        <el-form
          ref="ruleForm"
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
          <el-form-item label="是否结题" prop="isFinish">
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
            <el-input v-model="eidtForm.project_name" />
          </el-form-item>
          <el-form-item label="负责人" prop="person_in_charge">
            <el-input v-model="eidtForm.person_in_charge" />
          </el-form-item>
          <el-form-item label="总经费" prop="total_funds">
            <el-input v-model="eidtForm.total_funds" />
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
        <el-table-column type="index" label="序号" width="80" align="center"/>
        <el-table-column prop="attrOrginName" label="单位" align="center"/>
        <el-table-column prop="project_name" label="项目名称" align="center"/>
        <el-table-column prop="person_in_charge" label="负责人" align="center"/>
        <el-table-column prop="total_funds" label="总经费" align="center"/>
        <el-table-column prop="projectTypeName" label="项目类别" align="center" />
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

<script>
import {
  getYearListData,
  attrOrginGetList,
  researchProject,
  getProjectTypeList,
  addResearchProject,
  editResearchProject,
  delResearchProject,
} from "@/api/project";
export default {
  name: "NaturalSciences",
  data() {
    return {
      total: 0,
      queryId: null,
      queryList: {
        page: 1,
        rows: 10,
        yearId: "",
        searchStr: "",
        projectTypeId: localStorage.getItem("projectTypeId6"),
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
        project_name: null, //项目名称
        person_in_charge: null, //负责人
        total_funds: null, //总经费
        projectTypeId: localStorage.getItem("projectTypeId6"), //项目类别 projectTypeName
        isFinish: 0,
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
          { required: true, message: "请输入总经费", trigger: "blur" },
        ],
        price: [
          {
            required: true,
            message: "请输入项目经费(万元)",
            trigger: "blur",
          },
        ],
        createTime: [
          { required: true, message: "请选择项目创建时间", trigger: "change" },
        ],
      },
      projectParamsTypeId: null,
    };
  },
  mounted() {
    this.getProjectTypeList();
    this.getResearList();
    this.getYearsListData();
    this.attrOrginGetList();
  },
  methods: {
    // 获取项目级别列表
    getProjectTypeList() {
      getProjectTypeList().then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].typeName == "学校科研计划项目") {
            localStorage.setItem("projectTypeId6", res.data[i].projectTypeId);
          }
        }
      });
    },
    // 获取项目结项列表
    getResearList() {
      researchProject(this.queryList).then((res) => {
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
    // 添加项目立项表单
    addFormSub() {
      this.$refs.ruleForm.validate((valid) => {
        console.log(this.addForm);
        if (valid) {
          addResearchProject(this.addForm).then((res) => {
            this.$message.success(res.msg);
            this.addDialogVisible = false;
            this.getProjectTypeList();
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
      editResearchProject(this.eidtForm).then((res) => {
        console.log(res);
        this.getProjectTypeList();
        this.getResearList();
        this.$message.success("修改成功！");
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
        delResearchProject({ id: id }).then((res) => {
          console.log(res);
          this.$message.success(res.msg);
          this.getProjectTypeList();
          this.getResearList();
        });
      }
    },
    // 分页器方法
    handleSizeChange(val) {
      this.queryList.page = 1;
      this.queryList.rows = val;
      this.getProjectTypeList();
      this.getResearList();
    },
    handleCurrentChange(val) {
      this.queryList.page = val;
      this.getProjectTypeList();
      this.getResearList();
    },
    //条件查询
    searchList() {
      this.getProjectTypeList();
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