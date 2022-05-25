<template>
  <div class="approve">
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
          placeholder="请根据会议名称查询"
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
          <el-form-item label="会议名称" prop="academicSeminarName">
            <el-input v-model="addForm.academicSeminarName" />
          </el-form-item>
          <el-form-item label="主办单位" prop="academicSeminarOrgin">
            <el-input v-model="addForm.academicSeminarOrgin" />
          </el-form-item>
          <el-form-item label="地点" prop="academicSeminarAddress">
            <el-input v-model="addForm.academicSeminarAddress" />
          </el-form-item>
          <el-form-item label="参会代表" prop="academicSeminarPer">
            <el-input v-model="addForm.academicSeminarPer" />
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
          <el-form-item label="时间" prop="academicSeminarTime">
            <el-date-picker
              v-model="addForm.academicSeminarTime"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              :picker-options="pickerOptions"
            />
          </el-form-item>
          <el-form-item label="获奖情况" prop="remorkCondition">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="addForm.remorkCondition"
            >
            </el-input>
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
          ref="ruleForm2"
          :rules="rules"
          :model="eidtForm"
          label-width="100px"
        >
          <el-form-item label="会议名称" prop="academicSeminarName">
            <el-input v-model="eidtForm.academicSeminarName" />
          </el-form-item>
          <el-form-item label="主办单位" prop="academicSeminarOrgin">
            <el-input v-model="eidtForm.academicSeminarOrgin" />
          </el-form-item>
          <el-form-item label="地点" prop="academicSeminarAddress">
            <el-input v-model="eidtForm.academicSeminarAddress" />
          </el-form-item>
          <el-form-item label="参会代表" prop="academicSeminarPer">
            <el-input v-model="eidtForm.academicSeminarPer" />
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
          <el-form-item label="时间" prop="academicSeminarTime">
            <el-date-picker
              v-model="eidtForm.academicSeminarTime"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              :picker-options="pickerOptions"
            />
          </el-form-item>
          <el-form-item label="获奖情况" prop="remorkCondition">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="eidtForm.remorkCondition"
            >
            </el-input>
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
        <el-table-column type="index" label="序号" width="55" />
        <el-table-column prop="academicSeminarName" label="会议名称" />
        <el-table-column prop="academicSeminarOrgin" label="主办单位" />
        <el-table-column prop="academicSeminarAddress" label="地点" />
        <el-table-column prop="academicSeminarPer" label="参会代表" />
        <el-table-column prop="remorkCondition" label="获奖情况" />
        <el-table-column prop="academicSeminarTime" label="时间" />
        <el-table-column width="220" label="操作">
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
  getAttendAcademic,
  deleteAttendAcademic,
  addAttendAcademic,
  editAttendAcademic,
} from "@/api/joinAcademic";
import { getYears } from "@/api/getYears";
export default {
  name: "JoinAcademic",
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
      addForm: {
        academicSeminarName: null, // 会议名称
        academicSeminarOrgin: null, // 主办单位
        academicSeminarTime: null, // 时间
        academicSeminarAddress: null, // 地点
        academicSeminarPer: null, // 参会代表
        remorkCondition: null, // 获奖情况
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
        academicSeminarName: [
          { required: true, message: "请输入会议名称", trigger: "blur" },
        ],
        academicSeminarOrgin: [
          { required: true, message: "请输入主办单位", trigger: "change" },
        ],
        academicSeminarAddress: [
          { required: true, message: "请输入地点", trigger: "change" },
        ],
        remorkCondition: [
          { required: true, message: "获奖情况", trigger: "change" },
        ],
        academicSeminarPer: [
          { required: true, message: "请输入参会代表", trigger: "blur" },
        ],
        yearId: [{ required: true, message: "请选择年份", trigger: "change" }],
        academicSeminarTime: [
          { required: true, message: "请选择时间", trigger: "change" },
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
    // 获取项目立项列表
    getResearList() {
      getAttendAcademic(this.queryList).then((res) => {
        this.tableData = res.data.attAcaList;
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
    // 获取项目立项类型
    getProjectTypesListData() {
      // getProjectTypeListData().then((res) => {
      //   // console.log(res);
      //   this.projectTypeList = res.data
      // })
    },
    // 获取项目立项级别
    getProjectLevelsListData() {
      // getProjectLevelListData().then((res) => {
      //   console.log(res)
      //   this.projectLevel = res.data
      // })
    },
    // 添加项目立项表单
    addFormSub() {
      // this.addForm = {}
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          addAttendAcademic(this.addForm).then((res) => {
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
      console.log(row);
      // for (let i = 0; i < this.projectLevel.length; i++) {
      //   if (row.projectLevelName === this.projectLevel[i].levelName) {
      //     row.projectLevelId = this.projectLevel[i].levelId
      //   }
      // }
      // for (let i = 0; i < this.projectTypeList.length; i++) {
      //   if (row.projectTypeName === this.projectTypeList[i].typeName) {
      //     row.projectTypeId = this.projectTypeList[i].projectTypeId
      //   }
      // }
      this.eidtForm = { ...row };
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
      this.$refs.ruleForm2.validate((valid) => {
        if (valid) {
          editAttendAcademic(this.eidtForm).then((res) => {
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
        deleteAttendAcademic({ id: id }).then((res) => {
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
