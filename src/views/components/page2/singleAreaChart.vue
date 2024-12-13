<template>
  <div class="singleAreaChart"></div>
</template>
<script>
import echarts from 'echarts'
export default {
  name: '',
  props: {
    selectRangeDate: Array
  },
  data() {
    return {}
  },
  mounted() {
    this.setChart()
  },
  methods: {
    setData(type) {
      let arr = []
      switch (type) {
        case 'x':
          for (let i = 0; i < this.selectRangeDate.length; i++) {
            arr.push(this.selectRangeDate[i][1] + '.' + this.selectRangeDate[i][2])
          }
          break
        case 's' :
          for (let i = 0; i < this.selectRangeDate.length; i++) {
            arr.push((Math.random() * 250).toFixed(0))
          }
          break
        default:
          break
      }
      return arr
    },
    setChart() {
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line'
          },
          backgroundColor: '#11367a',
          textStyle: {
            color: '#6dd0e3',
            fontSize: 10
          }
        },
        grid: {
          top: '12%',
          bottom: '12%',
          left: '5%',
          right: '5%'
        },
        legend: {
          right: '5%',
          top: '10%',
          itemWidth: 7,
          itemHeight: 7,
          textStyle: {
            color: '#5CB1C1'
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            color: '#61B9C8',
            fontSize: 10
          },
          axisLine: {
            symbol: ['none', 'arrow'],
            symbolSize: [6, 6],
            symbolOffset: [0, 5],
            lineStyle: {
              color: '#122C49'
            }
          },
          axisTick: {
            color: '#122C49',
            inside: true
          },
          z: 2,
          data: this.setData('x')
        },
        yAxis:
          {
            type: 'value',
            interval: 50,
            min: 0,
            max: 400,
            splitNumber: 7,
            axisLine: {
              symbol: ['none', 'arrow'],
              symbolSize: [6, 6],
              lineStyle: {
                color: '#122C49'
              }
            },
            axisLabel: {
              color: '#61B9C8',
              showMaxLabel: false,
              fontSize: 10
            },
            splitLine: {
              show: false
            },
            name: '(个)',
            nameGap: -10,
            nameTextStyle: {
              color: '#61B9C8',
              fontSize: 9,
              align: 'right',
              padding: [0, 6, 0, 0]
            }
          },
        series: [{
          name: '朋友圈个数',
          type: 'line',
          symbol: 'none',
          smooth: true,
          data: this.setData('s'),
          lineStyle: {
            width: 1,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#B21356'
              },
              {
                offset: 0.5, color: '#B21356'
              }, {
                offset: 1, color: '#F59111'
              }],
              global: false
            }
          },
          itemStyle: {
            color: 'rgb(212,37,43)'
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#A41B68'
              },
              {
                offset: 0.5, color: 'rgba(112,20,82,1)'
              }, {
                offset: 1, color: 'rgba(112,20,82,0)'
              }],
              global: false
            },
            origin: 'start'
          }
        }
        ]
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
.singleAreaChart {
  width: 100%;
  height: 100%;
}
</style>
