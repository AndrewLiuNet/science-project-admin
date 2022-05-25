<!--  -->
<template>
  <div id="six"></div>
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
      const builderJson = {
        all: 10887,
        charts: {
          地图: 3237,
          线条: 2164,
          酒吧: 7561,
          线条: 7778,
          馅饼: 7355,
          播撒: 2405,
          烛台: 1842,
          雷达: 2090,
          热图: 1762,
          树形图: 1593,
          图表: 2060,
          箱形图: 1537,
          并联: 1908,
          胎压计: 2107,
          漏斗: 1692,
          桑基: 1568,
        },
        components: {
          馅饼: 7355,
          播撒: 2405,
          烛台: 1842,
          雷达: 2090,
          热图: 1762,
          树形图: 1593,
          图表: 2060,
          箱形图: 1537,
          并联: 1908,
          胎压计: 2107,
          漏斗: 1692,
          桑基: 1568,
        },
        ie: 9743,
      };
      const downloadJson = {
        "echarts.min.js": 17365,
        "echarts.simple.min.js": 4079,
        "echarts.common.min.js": 6929,
        "echarts.js": 14890,
      };
      const themeJson = {
        "dark.js": 1594,
        "infographic.js": 925,
        "shine.js": 1608,
        "roma.js": 721,
        "macarons.js": 2179,
        "vintage.js": 1982,
      };
      const waterMarkText = "ECHARTS";
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = canvas.height = 100;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.globalAlpha = 0.08;
      ctx.font = "20px Microsoft Yahei";
      ctx.translate(50, 50);
      ctx.rotate(-Math.PI / 4);
      ctx.fillText(waterMarkText, 0, 0);

      let myChart = this.$echarts.init(document.getElementById("six"));
      myChart.setOption({
        backgroundColor: {
          type: "pattern",
          image: canvas,
          repeat: "repeat",
        },
        tooltip: {},
        title: [
          {
            text: "咨询报告和出版专著统计",
            subtext: "总计 " + builderJson.all,
            left: "25%",
            textAlign: "center",
          },
          {
            text: "各版本下载",
            subtext:
              "总计 " +
              Object.keys(downloadJson).reduce(function (all, key) {
                return all + downloadJson[key];
              }, 0),
            left: "75%",
            textAlign: "center",
          },
          {
            text: "主题下载",
            subtext:
              "总计 " +
              Object.keys(themeJson).reduce(function (all, key) {
                return all + themeJson[key];
              }, 0),
            left: "75%",
            top: "50%",
            textAlign: "center",
          },
        ],
        grid: [
          {
            top: 50,
            width: "50%",
            bottom: "45%",
            left: 10,
            containLabel: true,
          },
          {
            top: "55%",
            width: "50%",
            bottom: 0,
            left: 10,
            containLabel: true,
          },
        ],
        xAxis: [
          {
            type: "value",
            max: builderJson.all,
            splitLine: {
              show: false,
            },
          },
          {
            type: "value",
            max: builderJson.all,
            gridIndex: 1,
            splitLine: {
              show: false,
            },
          },
        ],
        yAxis: [
          {
            type: "category",
            data: Object.keys(builderJson.charts),
            axisLabel: {
              interval: 0,
              rotate: 30,
            },
            splitLine: {
              show: false,
            },
          },
          {
            gridIndex: 1,
            type: "category",
            data: Object.keys(builderJson.components),
            axisLabel: {
              interval: 0,
              rotate: 30,
            },
            splitLine: {
              show: false,
            },
          },
        ],
        series: [
          {
            type: "bar",
            stack: "chart",
            z: 3,
            label: {
              position: "right",
              show: true,
            },
            data: Object.keys(builderJson.charts).map(function (key) {
              return builderJson.charts[key];
            }),
          },
          {
            type: "bar",
            stack: "chart",
            silent: true,
            itemStyle: {
              color: "#eee",
            },
            data: Object.keys(builderJson.charts).map(function (key) {
              return builderJson.all - builderJson.charts[key];
            }),
          },
          {
            type: "bar",
            stack: "component",
            xAxisIndex: 1,
            yAxisIndex: 1,
            z: 3,
            label: {
              position: "right",
              show: true,
            },
            data: Object.keys(builderJson.components).map(function (key) {
              return builderJson.components[key];
            }),
          },
          {
            type: "bar",
            stack: "component",
            silent: true,
            xAxisIndex: 1,
            yAxisIndex: 1,
            itemStyle: {
              color: "#eee",
            },
            data: Object.keys(builderJson.components).map(function (key) {
              return builderJson.all - builderJson.components[key];
            }),
          },
          {
            type: "pie",
            radius: [0, "30%"],
            center: ["75%", "25%"],
            data: Object.keys(downloadJson).map(function (key) {
              return {
                name: key.replace(".js", ""),
                value: downloadJson[key],
              };
            }),
          },
          {
            type: "pie",
            radius: [0, "30%"],
            center: ["75%", "75%"],
            data: Object.keys(themeJson).map(function (key) {
              return {
                name: key.replace(".js", ""),
                value: themeJson[key],
              };
            }),
          },
        ],
      });
    },
  },
};
</script>
<style  scoped>
#six {
  width: 400px;
  height: 370px;
}
</style>