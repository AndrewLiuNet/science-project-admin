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
              placeholder="请选择年份"
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
          <el-form-item label="现有教员" prop="numberOfExistingTeachers">
            <el-input v-model="addForm.numberOfExistingTeachers" />
          </el-form-item>
          <el-form-item label="投入人力" prop="research_Manpower_Y">
            <el-input v-model="addForm.research_Manpower_Y" />
          </el-form-item>
          <el-form-item label="总数" prop="higher_Education_A">
            <el-input v-model="addForm.higher_Education_A" />
          </el-form-item>
          <el-form-item label="领导" prop="higher_Leaders_B">
            <el-input v-model="addForm.higher_Leaders_B" />
          </el-form-item>
          <el-form-item label="初职及以下" prop="beginningandbelow_D">
            <el-input v-model="addForm.beginningandbelow_D" />
          </el-form-item>
          <el-form-item label="博士生" prop="doctoral_Student_E">
            <el-input v-model="addForm.doctoral_Student_E" />
          </el-form-item>
          <el-form-item label="中职" prop="secondary_C">
            <el-input v-model="addForm.secondary_C" />
          </el-form-item>
          <el-form-item label="硕士生" prop="master_F">
            <el-input v-model="addForm.master_F" />
          </el-form-item>
          <el-form-item label="总课时" prop="total_class_Hours_G">
            <el-input v-model="addForm.total_class_Hours_G" />
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
          <el-form-item label="选择单位">
            <el-select v-model="eidtForm.attrOrginId" placeholder="请选择年份">
              <el-option
                v-for="item in attrOrginOptions"
                :key="item.id"
                :label="item.attrOrginName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="选择年份" prop="yearId">
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
          </el-form-item>

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
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column type="index" label="序号" width="55" />
        <el-table-column prop="attrOrginName"  label="单位"  width="80" align="center"/>
        <el-table-column prop="numberOfExistingTeachers" width="120" label="现有教员人数" align="center"/>
        <el-table-column prop="research_Manpower_Y" width="120" label="科研投入人力" align="center"/>
        <el-table-column prop="higher_Education_A" label="总数" align="center"/>
        <el-table-column prop="higher_Leaders_B" label="领导" align="center"/>
        <el-table-column prop="secondary_C" label="中职" align="center"/>
        <el-table-column prop="beginningandbelow_D" label="初职及以下" align="center"/>
        <el-table-column prop="doctoral_Student_E" label="博士生" align="center"/>
        <el-table-column prop="master_F" label="硕士生"align="center"/>
        <el-table-column prop="total_class_Hours_G" label="总课时" align="center"/>
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
  researchManpower,
  addResearchManpower,
  editResearchManpower,
  delResearchManpower,
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
        attrOrginId: null, // 单位列表
        numberOfExistingTeachers: null, // 现有教员人数
        research_Manpower_Y: null, // 科研投入人力
        higher_Education_A: null, // 总数
        higher_Leaders_B: null, // 领导
        beginningandbelow_D: null, // 初职及以下
        doctoral_Student_E: null, // 博士生
        secondary_C: null, //中职
        master_F: null, //硕士生
        total_class_Hours_G: null, //总课时
        yearId: null, // 年份
        createTime: null, // 日期
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
          { required: true, message: "请选择单位", trigger: "change" },
        ],
        yearId: [{ required: true, message: "请选择年份", trigger: "change" }],
        numberOfExistingTeachers: [
          { required: true, message: "请输入现有教员", trigger: "blur" },
        ],
        research_Manpower_Y: [
          { required: true, message: "请输入投入人力", trigger: "blur" },
        ],
        higher_Education_A: [
          { required: true, message: "请输入总数", trigger: "blur" },
        ],
        higher_Leaders_B: [
          { required: true, message: "请输入领导", trigger: "blur" },
        ],
        beginningandbelow_D: [
          { required: true, message: "请输入初职及以下", trigger: "blur" },
        ],
        doctoral_Student_E: [
          { required: true, message: "请输入博士生", trigger: "blur" },
        ],
        secondary_C: [
          { required: true, message: "请输入中职", trigger: "blur" },
        ],
        master_F: [
          { required: true, message: "请输入硕士生", trigger: "blur" },
        ],
        total_class_Hours_G: [
          { required: true, message: "请输入总课时", trigger: "blur" },
        ],
        // createTime: [
        //   { required: true, message: "请选择项目创建时间", trigger: "change" },
        // ],
      },
    };
  },
  mounted() {
    this.getResearList();
    this.getYearsListData();
    this.attrOrginGetList();
  },
  methods: {
    // 获取项目结项列表
    getResearList() {
      researchManpower(this.queryList).then((res) => {
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
        if (valid) {
          addResearchManpower(this.addForm).then((res) => {
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
      editResearchManpower(this.eidtForm).then((res) => {
        console.log(res);
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
        delResearchManpower({ id: id }).then((res) => {
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
  margin: 20px 0 0 0;
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
