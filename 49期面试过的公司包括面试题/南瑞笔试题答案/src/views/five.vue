<template>
  <!-- 只能有一个根标签 -->
  <div id="main" style="width: 800px; height: 400px">123</div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: 'EchartsPage',
  data () {
    return {}
  },
  created () { },
  mounted () {
    var myChart = echarts.init(document.getElementById('main'));
    let option = {
      title: {
        text: '单位:个'
      },
      tooltip: {
        trigger: 'axis',
        formatter: function (params) {
          var htmlStr = '';
          var valMap = {};
          for (var i = 0; i < params.length; i++) {
            var param = params[i];
            var xName = param.name;
            var seriesName = param.name;
            var value = param.value;
            var color = param.color;

            if (value == '-') {
              continue;
            }

            //过滤重叠值
            if (valMap[seriesName] == value) {
              continue;
            }

            htmlStr += xName + '<br/>';

            htmlStr += '<div>';
            htmlStr += '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:' + color + ';"></span>';
            //圆点后面显示的文本  
            htmlStr += seriesName + ':' + value;

            htmlStr += '</div>';
            valMap[seriesName] = value;
          }
          console.log(1);
          return htmlStr;
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['区域A', '区域B', '区域C', '区域D', '区域E', '区域F', '区域G']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '区域',
          type: 'line',
          data: [2, 3, 2, 4, "-", "-", "-"],
          smooth: true
        },
        {
          name: '区域',
          type: 'line',
          smooth: true,
          itemStyle: {
            normal: {
              lineStyle: {
                width: 3,
                type: [8, 10],
                dashOffset: 5
              }
            }
          },
          data: ["-", "-", "-", 4, 7, 6, 7]
        },
      ]
    }
    // 绘制图表
    myChart.setOption(option);
  },
  components: {},
  props: {},
  computed: {},
  watch: {},
  methods: {}
}
</script>

<style scoped>
#main {
  margin: auto;
}
</style>