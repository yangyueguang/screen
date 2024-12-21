<template>
  <div class="leftBar"></div>
</template>
<style lang="scss" scoped>
.leftBar {
  height: 100%;
  width: 45%;
  float: left;
}
</style>
<script>
import echarts from 'echarts'
export default {
  name: '',
  props: {
    title: String,
    data: Array
  },
  data() {
    return {}
  },
  mounted() {
    this.setChart()
  },
  methods: {
    setTrenchData(type) {
      let arr = []
      let obj = {}
      for (let i = 0; i < this.data.length; i++) {
        switch (type) {
          case 't':
            obj = {
              subtext: this.data[i].subtitle,
              top: this.data[i].top,
              left: 10,
              subtextStyle: {
                color: '#8CBCCD',
                fontSize: 9
              }
            }
            break
          case 'd':
            obj = this.data[i].data
            break
          case 'b':
            obj = 100
            break
          default:
            break
        }
        arr.push(obj)
      }
      if (type === 't') {
        arr.unshift({
          text: this.title,
          top: '8%',
          left: '5%',
          textStyle: {
            color: '#fff',
            fontSize: 12
          }
        })
      }
      return arr
    },
    setChart() {
      let option = {
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'shadow'
          }
        },
        title: this.setTrenchData('t'),
        grid: {
          top: '15%',
          bottom: '3%',
          left: '5%'
        },
        yAxis: {
          data: [],
          inverse: true,
          axisLabel: {show: false},
          axisLine: {show: false},
          axisTick: {show: false}
        },
        xAxis: {
          splitLine: {show: false},
          axisLabel: {show: false},
          axisLine: {show: false},
          axisTick: {show: false}
        },
        series: [{
          type: 'bar',
          silent: true,
          barWidth: 15,
          barGap: '-100%',
          itemStyle: {
            color: '#1F1E4E'
          },
          data: this.setTrenchData('b')
        }, {
          type: 'bar',
          barWidth: 15,
          z: 2,
          label: {
            show: true,
            position: 'insideLeft',
            color: '#fff',
            offset: [0, 1],
            fontSize: 9,
            formatter: function(params) {
              return params.name
            }
          },
          itemStyle: {
            color: function(params) {
              return params.data.color
            }
          },
          data: this.setTrenchData('d')
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
