<!-- 授权及申请专利登记统计 -->
<template>
  <div id="fith-chart"></div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  computed: {},
  mounted() {
    this.draw();
  },
  methods: {
    draw() {
      let xAxisData = [];
      let data1 = [];
      let data2 = [];
      let data3 = [];
      let data4 = [];
      for (let i = 0; i < 10; i++) {
        xAxisData.push("Class" + i);
        data1.push(+(Math.random() * 2).toFixed(2));
        data2.push(+(Math.random() * 5).toFixed(2));
        data3.push(+(Math.random() + 0.3).toFixed(2));
        data4.push(+Math.random().toFixed(2));
      }
      var emphasisStyle = {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: "rgba(0,0,0,0.3)",
        },
      };
      let myChart = this.$echarts.init(document.getElementById("fith-chart"));
      myChart.setOption({
        title: { text: "授权及申请专利登记统计" },
        tooltip: {},
        legend: {
          data: ["bar", "bar2", "bar3", "bar4"],
          left: "5%",
          top: "6%",
        },
        brush: {
          toolbox: ["rect", "polygon", "lineX", "lineY", "clear"],
          xAxisIndex: 0,
        },
        toolbox: {
          feature: {
            magicType: {
              type: ["stack"],
            },
            dataView: {},
          },
        },
        xAxis: {
          data: xAxisData,
          name: "X Axis",
          axisLine: { onZero: true },
          splitLine: { show: false },
          splitArea: { show: false },
        },
        yAxis: {},
        grid: {
          bottom: 100,
        },

        series: [
          {
            name: "bar",
            type: "bar",
            stack: "one",
            emphasis: emphasisStyle,
            data: data1,
          },
          {
            name: "bar2",
            type: "bar",
            stack: "one",
            emphasis: emphasisStyle,
            data: data2,
          },
          {
            name: "bar3",
            type: "bar",
            stack: "two",
            emphasis: emphasisStyle,
            data: data3,
          },
          {
            name: "bar4",
            type: "bar",
            stack: "two",
            emphasis: emphasisStyle,
            data: data4,
          },
        ],
      });
    },
  },
};
</script>
<style  scoped>
#fith-chart {
  width: 400px;
  height: 370px;
}
</style>