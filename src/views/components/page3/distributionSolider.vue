<template>
  <div class="rightBar"></div>
</template>
<script>
import echarts from 'echarts'
export default {
  name: '',
  props: {
    data: Array
  },
  data() {
    return {}
  },
  mounted() {
    this.setChart()
  },
  methods: {
    setSoliderData(type) {
      let arr = []
      let obj = {}
      for (let i = 0; i < this.data.length; i++) {
        switch (type) {
          case 'g':
            obj = {
              top: this.data[i].top,
              left: 8,
              right: 30,
              height: '13.5%'
            }
            break
          case 'x':
            obj = {
              axisLine: {show: false},
              axisTick: {show: false, interval: 0},
              splitLine: {show: false},
              type: 'category',
              boundaryGap: false,
              gridIndex: i,
              axisLabel: {
                show: false
              },
              data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            }
            break
          case 'y':
            obj = {
              type: 'value',
              axisLine: {show: false},
              gridIndex: i,
              axisTick: {show: false},
              splitLine: {show: false},
              axisLabel: {show: false}
            }
            break
          case 's':
            obj = {
              type: 'bar',
              barWidth: 2,
              data: this.data[i].data,
              label: {
                show: true,
                position: 'insideBottomLeft',
                offset: [3, 0],
                distance: 2,
                color: '#88B6C7',
                fontSize: 9,
                lineHeight: 9,
                rich: {
                  a: {
                  }
                },
                formatter: function(data) {
                  if (data.data.name.length === 2) {
                    return data.data.name.split('').join('\n\n')
                  } else {
                    return data.data.name.split('').join('\n')
                  }
                }
              },
              itemStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: 'rgba(' + this.data[i].color + ',1)'
                  }, {
                    offset: 1, color: 'rgba(' + this.data[i].color + ',0)'
                  }],
                  globalCoord: false
                }
              },
              xAxisIndex: i,
              yAxisIndex: i
            }
            break
          default:
            break
        }
        arr.push(obj)
      }
      return arr
    },
    setChart() {
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: '{b}:{c}'
        },
        title: {
          text: '重点关注用户排名',
          left: 0,
          top: 10,
          textStyle: {
            fontSize: 12,
            color: '#FFF'
          }
        },
        grid: this.setSoliderData('g'),
        xAxis: this.setSoliderData('x'),
        yAxis: this.setSoliderData('y'),
        series: this.setSoliderData('s')
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
.rightBar {
  height: 100%;
  width: 55%;
  float: left;
}
</style>
