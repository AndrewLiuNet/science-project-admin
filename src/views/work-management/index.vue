<template>
  <div>
    科研工作计划页面
    <el-select v-model="value" placeholder="请选择" @change="selectGet(value)">
      <el-option
        v-for="item in options"
        :key="item.id"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "Plan",
  data() {
    return {
      value:"",
      options: [
        {
          value: "123213424230.52354",
          label: "管理员",
        },
        {
          value: "选项2",
          label: "维修人员管理员",
        },
      ],
    };
  },
  methods: {
    selectGet(value) {
      //这个vId也就是value值
      console.log(value);
    },
  },
};
</script>
<style scoped>
</style>