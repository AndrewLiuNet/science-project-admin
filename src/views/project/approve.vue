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
            :label="item.yaerName"
            :value="item.yearId"
          />
        </el-select>
      </div>
      <div class="tools-btn">
        <el-input
          class="search-name"
          v-model="queryList.name"
          placeholder="请根据项目名称查询"
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
          <el-form-item label="项目名称" prop="projectName">
            <el-input v-model="addForm.projectName" />
          </el-form-item>
          <el-form-item label="项目类型" prop="projectTypeId">
            <el-select
              v-model="addForm.projectTypeId"
              placeholder="请选择项目类型"
            >
              <el-option
                v-for="item in projectTypeList"
                :key="item.projectTypeId"
                :label="item.typeName"
                :value="item.projectTypeId"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="项目级别" prop="projectLevelId">
            <el-select
              v-model="addForm.projectLevelId"
              placeholder="请选择项目级别"
            >
              <el-option
                v-for="item in projectLevel"
                :key="item.levelId"
                :label="item.levelName"
                :value="item.levelId"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="负责人" prop="responsibilityPer">
            <el-input v-model="addForm.responsibilityPer" />
          </el-form-item>
          <el-form-item label="经费(万元)" prop="price">
            <el-input v-model="addForm.price" />
          </el-form-item>
          <el-form-item label="选择年份" prop="yearId">
            <el-select v-model="addForm.yearId" placeholder="请选择年份">
              <el-option
                v-for="item in yearOptions"
                :key="item.yearId"
                :label="item.yaerName"
                :value="item.yearId"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="立项日期" prop="createTime">
            <!-- <el-input v-model="addForm.createTime"></el-input> -->
            <el-date-picker
              v-model="addForm.createTime"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              :picker-options="pickerOptions"
            />
          </el-form-item>
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
          <el-form-item label="项目名称" prop="projectName">
            <el-input v-model="eidtForm.projectName" />
          </el-form-item>
          <el-form-item label="项目类型" prop="projectTypeId">
            <el-select
              v-model="eidtForm.projectTypeId"
              placeholder="请选择项目类型"
            >
              <el-option
                v-for="item in projectTypeList"
                :key="item.projectTypeId"
                :label="item.typeName"
                :value="item.projectTypeId"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="项目级别" prop="projectLevelId">
            <el-select
              v-model="eidtForm.projectLevelId"
              placeholder="请选择项目级别"
            >
              <el-option
                v-for="item in projectLevel"
                :key="item.levelId"
                :label="item.levelName"
                :value="item.levelId"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="负责人" prop="responsibilityPer">
            <el-input v-model="eidtForm.responsibilityPer" />
          </el-form-item>
          <el-form-item label="经费(万元)" prop="price">
            <el-input v-model="eidtForm.price" />
          </el-form-item>
          <el-form-item label="选择年份" prop="yearId">
            <el-select v-model="eidtForm.yearId" placeholder="请选择年份">
              <el-option
                v-for="item in yearOptions"
                :key="item.yearId"
                :label="item.yaerName"
                :value="item.yearId"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="立项日期" prop="createTime">
            <!-- <el-input v-model="addForm.createTime"></el-input> -->
            <el-date-picker
              v-model="eidtForm.createTime"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              :picker-options="pickerOptions"
            />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="edtiFormSub">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 结项模态框  -->
      <el-dialog
        title="项目结项"
        :visible.sync="finisiDialogVisible"
        width="50%"
        class="finish-dialog"
      >
        <el-form ref="ruleForm" :model="finishForm" label-width="100px">
          <el-form-item label="结项日期" prop="createTime">
            <el-date-picker
              v-model="finishForm.finishTime"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
            />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="finisiDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="finishFormSub">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 页面加载的表格 -->
    <el-card class="data">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column type="index" label="序号" width="55" />
        <!-- <el-table-column type="selection" width="55"> </el-table-column> -->
        <el-table-column label="项目名称" width="200">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              :content="scope.row.projectName"
              placement="top"
              ><div class="projectName">
                {{ scope.row.projectName }}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="projectTypeName" label="项目类别" />
        <el-table-column prop="projectLevelName" label="项目级别" />
        <el-table-column prop="responsibilityPer" label="负责人" />
        <el-table-column prop="price" label="经费（万元）" />
        <el-table-column width="220" label="操作">
          <template slot-scope="scope">
            <el-link
              icon="el-icon-check"
              type="warning"
              @click="finishRowInfo(scope.row)"
              >结项</el-link
            >
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
  getResearListData,
  getYearListData,
  getProjectTypeListData,
  getProjectLevelListData,
  addProjectForm,
  delProjectRow,
  editFormSub,
  finishResear,
} from "@/api/project";
export default {
  name: "Approve",
  data() {
    return {
      total: 0,
      queryId: null,
      queryList: {
        page: 1,
        rows: 10,
        yearId: "",
        name: "",
      },
      yearOptions: [], // 年份下拉列表值
      projectTypeList: [], // 年份下拉列表值
      projectLevel: [], // 年份下拉列表值
      value: "",
      tableData: [],
      addDialogVisible: false,
      editDialogVisible: false,
      finisiDialogVisible: false,
      addForm: {
        projectName: null, // 项目名称
        projectTypeName: null, // 项目类别
        projectLevelName: null, // 项目级别
        responsibilityPer: null, // 负责人
        price: null, // 经费（万元）
        yearId: null, // 年份
        createTime: null, // 立项日期
      },
      eidtForm: {},
      finishForm: {
        id: null,
        finishTime: null,
      },
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
        projectName: [
          { required: true, message: "请输入项目名称", trigger: "blur" },
        ],
        projectTypeId: [
          { required: true, message: "请选择项目类别", trigger: "change" },
        ],
        projectLevelId: [
          { required: true, message: "请选择项目级别", trigger: "change" },
        ],
        responsibilityPer: [
          { required: true, message: "请输入项目负责人", trigger: "blur" },
        ],
        price: [
          {
            required: true,
            message: "请输入项目经费(万元)",
            trigger: "blur",
          },
        ],
        yearId: [
          { required: true, message: "请选择年份", trigger: "change" },
        ],
        createTime: [
          { required: true, message: "请选择项目创建时间", trigger: "change" },
        ],
      },
    };
  },
  mounted() {
    this.getResearList();
    this.getYearsListData();
    this.getProjectTypesListData();
    this.getProjectLevelsListData();
  },
  methods: {
    // 结项
    finishRowInfo(row) {
      this.finishForm.id = row.id;
      this.finisiDialogVisible = true;
    },
    finishFormSub() {
      // console.log(this.finishForm);
      finishResear(this.finishForm).then((res) => {
        // console.log(res);
        this.finisiDialogVisible = false;
        this.$message.success("项目结项成功！");
      });
    },
    // 获取项目立项列表
    getResearList() {
      getResearListData(this.queryList).then((res) => {
        this.tableData = res.data.researchapprovals;
        this.total = res.data.count;
        // console.log(res);
      });
    },
    // 查询单行数据
    // getResearRowData(paramsId) {
    //   getResearRowData({ id: paramsId }).then((res) => {
    //     console.log(res);
    //     // this.addForm = { ...res.data };
    //     this.addForm.projectName = res.data;
    //     this.addForm.projectTypeId = res.data.projectTypeName;
    //     this.addForm.projectLevelId = res.data.projectLevelName;
    //     this.addForm.responsibilityPer = res.data.responsibilityPer;
    //     this.addForm.price = res.data.price;
    //     this.addForm.yearId = res.data.yearId;
    //     this.addForm.createTime = res.data.createTime;
    //   });
    // },
    // 获取年份加载下拉框
    getYearsListData() {
      getYearListData().then((res) => {
        // console.log(res);
        this.yearOptions = res.data;
      });
    },
    // 根据年份筛选数据
    searchYear(e) {
      // console.log(e);
      this.queryList.yearId = e;
      this.getResearList();
    },
    // 获取项目立项类型
    getProjectTypesListData() {
      getProjectTypeListData().then((res) => {
        // console.log(res);
        this.projectTypeList = res.data;
      });
    },
    // 获取项目立项级别
    getProjectLevelsListData() {
      getProjectLevelListData().then((res) => {
        // console.log(res);
        this.projectLevel = res.data;
      });
    },
    // 添加项目立项表单
    addFormSub() {
      this.addForm = {};
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          addProjectForm(this.addForm).then((res) => {
            // console.log(res);
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
      // console.log(row);

      for (let i = 0; i < this.projectLevel.length; i++) {
        if (row.projectLevelName === this.projectLevel[i].levelName) {
          row.projectLevelId = this.projectLevel[i].levelId;
        }
      }
      for (let i = 0; i < this.projectTypeList.length; i++) {
        if (row.projectTypeName == this.projectTypeList[i].typeName) {
          row.projectTypeId = this.projectTypeList[i].projectTypeId;
        }
      }
      this.eidtForm = { ...row };
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
      editFormSub(this.eidtForm).then((res) => {
        console.log(res);
      });
    },
    // 删除单行数据
    async delRowInfo(id) {
      // console.log(id);
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
        delProjectRow({ id: id }).then((res) => {
          // console.log(res);
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
.tools-btn {
  margin-top: 20px;
}
.addForm {
  .el-input {
    width: 80%;
  }
}
.search-name {
  width: 220px;
  margin-right: 10px;
}
</style>
