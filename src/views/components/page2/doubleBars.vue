<template>
  <div class="doubleBars"></div>
</template>
<script>
import echarts from 'echarts'
export default {
  name: '',
  data() {
    return {}
  },
  mounted() {
    this.setChart()
  },
  methods: {
    setChart() {
      let option = {
        legend: {
          left: '8%',
          top: '10%',
          itemWidth: 7,
          itemHeight: 7,
          textStyle: {
            color: '#5CB1C1',
            fontSize: 10
          }
        },
        grid: [{
          show: false,
          left: '6%',
          top: '17%',
          bottom: '3%',
          containLabel: true,
          width: '40%'
        }, {
          show: false,
          left: '53%',
          top: '17%',
          bottom: '3%',
          width: '1%'
        }, {
          show: false,
          right: '6%',
          top: '17%',
          bottom: '3%',
          containLabel: true,
          width: '40%'
        }],
        xAxis: [{
          splitNumber: 8,
          type: 'value',
          inverse: true,
          axisLine: {show: false},
          axisTick: {show: false},
          position: 'bottom',
          axisLabel: {show: false},
          splitLine: {show: false}
        }, {
          gridIndex: 1,
          show: false
        }, {
          gridIndex: 2,
          splitNumber: 8,
          type: 'value',
          axisLine: {show: false},
          axisTick: {show: false},
          position: 'bottom',
          axisLabel: {show: false},
          splitLine: {show: false}
        }
        ],
        yAxis: [
          {
            type: 'category',
            inverse: true,
            position: 'left',
            axisLine: {show: false},
            axisTick: {show: false},
            axisLabel: {show: false}
          },
          {
            gridIndex: 1,
            type: 'category',
            inverse: true,
            position: 'left',
            axisLine: {show: false},
            axisTick: {show: false},
            axisLabel: {
              show: true,
              color: '#61B9C8',
              fontSize: 8,
              showMinLabel: true,
              showMaxLabel: true,
              interval: 0
            },
            data: ['1部', '2部', '3部', '4部', '5部', '6部', '7部', '8部', '9部', '10部', '11部']
          },
          {
            gridIndex: 2,
            type: 'category',
            inverse: true,
            offset: 50,
            position: 'left',
            axisLine: {show: false},
            axisTick: {show: false},
            axisLabel: {show: false}
          }
        ],
        series: [{
          name: '违规次数',
          type: 'bar',
          barGap: 10,
          barWidth: '40%',
          itemStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  {offset: 0, color: 'rgba(1,176,223,1)'},
                  {offset: 1, color: 'rgba(1,176,223,0)'}
                ],
                global: false
              },
              barBorderRadius: 5
            },
            emphasis: {
              show: false
            }
          },
          data: [320, 302, 341, 374, 390, 450, 420, 374, 390, 450, 420]
        }, {
          name: '违规人数',
          type: 'bar',
          barGap: 10,
          barWidth: '40%',
          xAxisIndex: 2,
          yAxisIndex: 2,
          itemStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  {offset: 0, color: 'rgba(126,19,212,0)'},
                  {offset: 1, color: 'rgba(126,19,212,1)'}
                ],
                global: false
              },
              barBorderRadius: 5
            },
            emphasis: {
              show: false
            }
          },
          data: [320, 302, 341, 374, 390, 450, 420, 374, 390, 450, 420]
        }]
      }
      let myChart = echarts.init(this.$el, null, {renderer: 'svg'})
      myChart.clear()
      myChart.resize()
      myChart.setOption(option)
    }
  }
}
</script>
<style lang="scss" scoped>
.doubleBars {
  width: 100%;
  height: 100%;
}
</style>
