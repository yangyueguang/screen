<template>
  <div class="area"></div>
</template>
<script>
import echarts from 'echarts'
export default {
  name: 'AreaChart',
  props: {
    config: {
      type: Object,
      default: null
    },
    selectRangeDate: {
      type: Array,
      default: null
    }
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
    setSeriesData() {
      let arr = []
      this.config.data.forEach(item => {
        let obj = {
          name: item.name,
          type: 'line',
          smooth: true,
          symbol: 'none',
          areaStyle: {
            opacity: 1,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: item.color[0]
              },
              {
                offset: 0.4, color: item.color[0]
              }, {
                offset: 1, color: item.color[1]
              }],
              global: false
            }
          },
          lineStyle: {
            width: 0
          },
          itemStyle: {
            color: item.color[0]
          },
          data: this.setData('s')
        }
        arr.push(obj)
      })
      return arr
    },
    setChart() {
      let option = {
        title: {
          show: !!this.config.title,
          text: this.config.title,
          textStyle: {
            color: this.config.color,
            fontSize: 12,
            fontWeight: 'normal'
          },
          top: '12%',
          left: '38%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          },
          backgroundColor: '#11367a',
          textStyle: {
            color: '#6dd0e3',
            fontSize: 10
          },
          formatter: function(params) {
            let str = params[0].name
            params.forEach(item => {
              str += `<br> ${item.seriesName}: ${item.value}`
            })
            return str
          }
        },
        legend:
          {
            top: this.config.title ? '23%' : '11%',
            left: 'center',
            itemWidth: 7,
            itemHeight: 7,
            textStyle: {
              color: this.config.color,
              fontSize: 12
            }
          },
        grid:
          {
            top: this.config.title ? '40%' : '14%',
            left: '5%',
            right: '5%',
            bottom: '5%',
            containLabel: true
          },
        xAxis:
          {
            type: 'category',
            boundaryGap: false,
            axisLabel: {
              interval: 0,
              color: this.config.color,
              fontSize: 9,
              align: 'center'
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#1a3c58',
                width: 2
              }
            },
            axisTick: {show: false},
            data: this.setData('x')
          },
        yAxis: [
          {
            type: 'value',
            min: 0,
            max: 300,
            axisLine: {
              show: true,
              lineStyle: {
                color: '#1a3c58'
              }
            },
            axisLabel: {
              color: this.config.color,
              fontSize: 9,
              showMaxLabel: false
            },
            axisTick: {
              length: 3
            },
            name: this.config.name[0],
            nameGap: -5,
            nameTextStyle: {
              color: this.config.color,
              fontSize: 9,
              align: 'right'
            },
            splitLine: {show: false}
          },
          {
            type: 'value',
            min: 0,
            max: 300,
            axisLine: {
              show: true,
              lineStyle: {
                color: '#1a3c58'
              }
            },
            axisTick: {
              length: 3
            },
            axisLabel: {
              color: this.config.color,
              fontSize: 9,
              showMaxLabel: false
            },
            name: this.config.name[1],
            nameTextStyle: {
              color: this.config.color,
              fontSize: 9,
              align: 'left'
            },
            nameGap: -5,
            splitLine: {show: false}
          }
        ],
        series: this.setSeriesData()
      }
      if (this.selectRangeDate.length > 7) {
        option.xAxis.axisLabel.interval = 3
        option.xAxis.axisLabel.showMaxLabel = false
        option.xAxis.axisLabel.align = 'left'
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
<style lang="scss" scoped>
.area {
  height: 100%;
}
</style>
