<!--  -->
<template>
  <div>
    <el-card>
      <!--项目经费分项统计-->
      <firstecharts />
    </el-card>

    <el-card>
      <secondecharts />
    </el-card>

    <el-card>
      <thirdecharts />
    </el-card>

    <el-card>
      <fourthecharts />
    </el-card>

    <el-card>
      <fith />
    </el-card>

    <el-card>
      <six />
    </el-card>
  </div>
</template>

<script>
import firstecharts from "@/views/charts/first-echarts";
import secondecharts from "@/views/charts/second-echarts.vue";
import thirdecharts from "@/views/charts/third-echarts.vue";
import fourthecharts from "@/views/charts/fourth-echarts.vue";
import fith from "@/views/charts/fith.vue";
import six from "@/views/charts/six.vue";

export default {
  data() {
    return {};
  },
  components: {
    firstecharts,
    secondecharts,
    thirdecharts,
    fourthecharts,
    fith,
    six,
  },
  computed: {},
  mounted() {},
  methods: {},
};
</script>
<style  scoped>
.el-card {
  float: left;
  width: 32%;
  height: 400px;
  margin: 8px;
}
</style>