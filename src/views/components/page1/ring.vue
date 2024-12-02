<template>
  <div class="ring"></div>
</template>
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
      let option = {
        title: {
          text: '【' + this.data.title + '】',
          top: 20,
          x: 'center',
          textStyle: {
            color: '#75deef',
            fontSize: 14,
            fontWeight: 'normal'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)',
          backgroundColor: '#11367a',
          textStyle: {
            color: '#6dd0e3',
            fontSize: 10
          }
        },
        series: [
          {
            name: this.data.title,
            type: 'pie',
            radius: ['40%', '60%'],
            center: ['50%', '55%'],
            avoidLabelOverlap: true,
            label: {
              normal: {
                show: true,
                position: 'outside',
                fontSize: 10,
                color: '#75deef'
              }
            },
            labelLine: {
              normal: {
                show: true,
                length: 8,
                length2: 5,
                lineStyle: {
                  color: '#303851'
                }
              }
            },
            data: this.data.data
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
.ring {
  width: 100%;
  height: 100%;
}
</style>
