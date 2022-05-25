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
      <!-- <div class="tools-btn">
        <el-input
          class="search-name"
          v-model="queryList.searchStr"
          placeholder="请根据名称查询"
        ></el-input>
        <el-button type="success" plain @click="searchList">查询</el-button>
         <el-button type="success" plain @click="addDialogVisible = true"
          >添 加</el-button
        > -->
        <!-- <el-button type="danger" plain>删 除</el-button> 
      </div> -->
    </div>
    <!-- 页面加载的表格 -->
    <el-card class="data">
      <el-table :data="tableData" show-summary style="width: 100%">
        <el-table-column label="单位" align="center" prop="attrOrginName"> </el-table-column>
        <el-table-column label="咨询报告" align="center" prop="advisory_report">
        </el-table-column>
        <el-table-column label="出版专著" align="center" prop="publishing_monographs">
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
import { getStatisticsReportsAndMono } from "@/api/publishedPapers";
import { getYearListData, attrOrginGetList } from "@/api/project";
export default {
  name: "reportAndpublished",
  data() {
    return {
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
      projectLevel: [], // 年份下拉列表值
      value: "",
      addDialogVisible: false,
      editDialogVisible: false,
      addForm: {
        report_name: null, // 单位列表
        author: null, //核心期刊
        submitted_AttrOrginId: null, //SCI检索
        publisher_AttrOrginId: null, //EI检索
        yearId: null, // 年份
        publication_time: null, // 日期
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
        yearId: [{ required: true, message: "请选择年份", trigger: "change" }],
        createTime: [
          { required: true, message: "请选择项目创建时间", trigger: "change" },
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
    // 获取咨询报告列表
    getResearList() {
      getStatisticsReportsAndMono(this.queryList).then((res) => {
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
      this.$refs.ruleForm.validate((valid) => {
        console.log(this.addForm);
        if (valid) {
          addConsultingReportyb1(this.addForm).then((res) => {
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
      editConsultingReportyb1(this.eidtForm).then((res) => {
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
        delConsultingReportyb1({ id: id }).then((res) => {
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
  justify-content: space-around;
  .el-input {
    width: 240px;
  }
}
.search-name {
  width: 220px;
  margin-right: 10px;
}
</style>