<template>
  <div class="chart"></div>
</template>
<style lang="scss" scoped>
.chart {
  height: 100%;
  width: 100%;
}
</style>
<script>
import echarts from 'echarts'
export default {
  name: '',
  props: {
    data: Object
  },
  data() {
    return {}
  },
  mounted() {
    this.setChart()
  },
  methods: {
    setChart() {
      let seriesData = []
      this.data.data.forEach(item => {
        seriesData.push(
          {
            value: item.value,
            name: item.name,
            symbol: 'none',
            symbolSize: 5,
            itemStyle: {
              color: item.color
            },
            lineStyle: {
              normal: {
                color: item.color,
                width: 1
              },
              emphasis: {
                width: 2
              }
            }
          }
        )
      })
      let option = {
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'shadow'
          }
        },
        title: {
          text: this.data.title,
          top: '5%',
          left: this.data.position[0],
          textStyle: {
            color: '#fff',
            fontSize: 12
          }
        },
        legend: {
          data: this.data.data.map(item => {
            return {name: item.name, icon: 'circle'}
          }),
          left: 'center',
          top: this.data.position[1],
          itemWidth: 7,
          itemHeight: 7,
          textStyle: {
            color: '#67C3D6',
            fontSize: 10
          }
        },
        radar: {
          indicator: this.data.indicator,
          center: this.data.center,
          radius: '50%',
          startAngle: 90,
          splitNumber: 4,
          shape: 'circle',
          name: {
            textStyle: {
              color: '#0DECF0',
              fontSize: 8
            }
          },
          nameGap: 3,
          splitArea: {
            areaStyle: {
              color: ['#1166C4',
                '#0C52A4', '#102F7D',
                '#13216B']
            }
          },
          axisLine: {
            lineStyle: {
              color: '#163794'
            }
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: '#163794'
            }
          }
        },
        series: {
          name: '雷达图',
          type: 'radar',
          itemStyle: {
            emphasis: {
              lineStyle: {
                width: 4
              }
            }
          },
          data: seriesData
        }
      }
      if (this.id === 'bottom_1_2') {
        option.legend.left = '5%'
      }
      let myChart = echarts.init(this.$el, null, {renderer: 'svg'})
      myChart.clear()
      myChart.resize(
        {
          width: this.$el.offsetWidth,
          height: this.$el.offsetHeight
        }
      )
      myChart.setOption(option)
    }
  }
}
</script>
