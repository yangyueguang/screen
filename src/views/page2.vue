<template>
  <div class="page2">
    <div class="content">
      <div class="topleft">
        <div class="list">
          <div class="left">
            <span class="title">聊天分析</span>
            <div class="chart-68">
              <area-chart id="left_1" ref="chart1" :select-range-date="selectRangeDate"
                          :config="cnfigData1" />
            </div>
            <div class="chart-32">
              <radar-chart id="left_2" ref="chart2" :data="chatRadarData" />
            </div>
          </div>
        </div>
        <div class="list">
          <div class="left">
            <span class="title">办公时长分析</span>
            <div class="chart-68">
              <bar-chart id="left_3" ref="chart3" :config="configData2" />
            </div>
            <div class="chart-32">
              <radar-chart id="left_4" ref="chart4" :data="officeRadarData" />
            </div>
          </div>
        </div>
      </div>
      <div id="circlePie" class="circlePie">
        <canvas id="main" width="500" height="500"></canvas>
        <canvas id="dot"></canvas>
      </div>
      <div class="topright">
        <div class="list">
          <div class="right">
            <span class="title">好友分析</span>
            <div class="chart-32">
              <radar-chart id="right_1" ref="chart5" :data="friendRadarData" />
            </div>
            <div class="chart-68">
              <double-bar-chart ref="chart6" />
            </div>
          </div>
        </div>
        <div class="list">
          <div class="right">
            <span class="title">微信朋友圈分析</span>
            <div class="chart-32">
              <radar-chart id="right_3" ref="chart7" :data="momentsRadarData" />
            </div>
            <div class="chart-68">
              <single-area-chart id="right_4" ref="chart8" :select-range-date="selectRangeDate" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-list">
      <div class="bottomleft">
        <div class="list">
          <div class="bottom">
            <span class="title">违规话术分布趋势</span>
            <double-line id="bottom_1" ref="chart9" />
          </div>
        </div>
        <div class="list">
          <div class="bottom">
            <span class="title">各部门违规话术对比</span>
            <double-bars id="bottom_2" ref="chart10" />
          </div>
        </div>
        <div class="list">
          <div class="bottom">
            <span class="title">红包转账分布趋势</span>
            <three-bar-chart id="bottom_3" ref="chart11" />
          </div>
        </div>
      </div>
      <div class="bottomright">
        <div class="list">
          <span class="title">各部门红包转账对比</span>
          <pie-chart id="bottom_4" ref="chart12" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
let areaChart = () => import('./components/areaChart')
let radarChart = () => import('./components/radar')
let barChart = () => import('./components/page2/barChart')
let doubleBarChart = () => import('./components/page2/doubleBarChart')
let singleAreaChart = () => import('./components/page2/singleAreaChart')
let doubleLine = () => import('./components/page2/doubleLine')
let threeBarChart = () => import('./components/page2/threeBarChart')
let pieChart = () => import('./components/page2/pieChart')
let doubleBars = () => import('./components/page2/doubleBars')
export default {
  name: 'Page2',
  components: {
    areaChart,
    radarChart,
    barChart,
    doubleBarChart,
    singleAreaChart,
    doubleLine,
    threeBarChart,
    pieChart,
    doubleBars
  },
  props: {
    selectRangeDate: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      everyPer: 0,
      xOffset: 0,
      circle: {
        x: 250,
        y: 250,
        radius: 218
      },
      title: ['累计话术违规个数:456,789', '累计办公次数:123,12', '累计办公时长:134,23', '累计服务好友次数:234,234', '累计服务好友数量:123,123', '累计设备违规个数:678,123'],
      cnfigData1: {
        color: '#5CB1C1',
        name: ['（次）', '（人）'],
        data: [
          {
            name: '聊天次数',
            color: ['#9e70ff', '#6e5eff'],
            data: [200, 12, 21, 54, 260, 130, 210]
          },
          {
            name: '聊天人数',
            color: ['#48cefd', '#5356f1'],
            data: [50, 182, 234, 191, 190, 30, 10]
          }
        ]
      },
      configData2: {
        data: [213, 190, 137, 99, 63, 196, 248, 212, 248, 112]
      },
      chatRadarData: {
        title: '各部门聊天对比',
        position: ['center', '85%'],
        center: ['50%', '50%'],
        indicator: [
          {text: '一部'},
          {text: '二部'},
          {text: '三部'},
          {text: '四部'},
          {text: '五部'},
          {text: '六部'}
        ],
        data: [
          {
            name: '聊天次数',
            color: '#0DF5F8',
            value: [100, 8, 0.40, -80, 2000, 332]
          },
          {
            name: '聊天人数',
            color: '#7921AD',
            value: [60, 5, 0.30, -100, 1500, 221]
          }
        ]
      },
      officeRadarData: {
        title: '各部门办公时长对比',
        position: ['center', '85%'],
        center: ['50%', '50%'],
        indicator: [
          {text: '一部'},
          {text: '二部'},
          {text: '三部'},
          {text: '四部'},
          {text: '五部'},
          {text: '六部'}
        ],
        data: [
          {
            name: '办公时长',
            color: '#55D35B',
            value: [100, 8, 0.40, -80, 2000, 332]
          }
        ]
      },
      friendRadarData: {
        title: '各部门好友数量对比',
        position: ['center', '85%'],
        center: ['50%', '50%'],
        indicator: [
          {text: '一部'},
          {text: '二部'},
          {text: '三部'},
          {text: '四部'},
          {text: '五部'},
          {text: '六部'}
        ],
        data: [
          {
            name: '好友总数',
            color: '#FA8486',
            value: [100, 8, 0.40, -80, 2000, 332]
          }
        ]
      },
      momentsRadarData: {
        title: '各部门朋友圈数量对比',
        position: ['center', '85%'],
        center: ['50%', '50%'],
        indicator: [
          {text: '一部'},
          {text: '二部'},
          {text: '三部'},
          {text: '四部'},
          {text: '五部'},
          {text: '六部'}
        ],
        data: [
          {
            name: '朋友圈个数',
            color: '#D91748',
            value: [100, 8, 0.40, -80, 2000, 332]
          }
        ]
      },
      warea: {x: 250, y: 250, max: 700},
      dots: [],
      animationFrame1: null,
      animationFrame2: null,
      centerBox: {
        width: 0,
        height: 0
      }
    }
  },
  mounted() {
    this.centerBox = {
      width: document.querySelector('#circlePie').offsetWidth,
      height: document.querySelector('#circlePie').offsetHeight
    }
    for (let i = 0; i < 200; i++) {
      let x = Math.random() * this.centerBox.width
      let y = Math.random() * this.centerBox.height
      let xa = Math.random() * 2 - 1
      let ya = Math.random() * 2 - 1
      this.dots.push({
        x: x,
        y: y,
        xa: xa,
        ya: ya,
        max: 40
      })
    }
    this.act()
    this.drawDot()
    setTimeout(() => {
      this.centerBox = {
        width: document.querySelector('#circlePie').offsetWidth,
        height: document.querySelector('#circlePie').offsetHeight
      }
      for (let i = 1; i < 13; i++) {
        this.$refs['chart' + i].setChart()
      }
    }, 500)
  },
  beforeDestroy() {
    window.cancelAnimationFrame(this.animationFrame1)
    window.cancelAnimationFrame(this.animationFrame2)
  },
  methods: {
    drawDot() {
      let canvas = document.getElementById('dot')
      canvas.width = document.querySelector('#circlePie').offsetWidth
      canvas.height = document.querySelector('#circlePie').offsetHeight
      let ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      let ndots = [this.warea].concat(this.dots)
      this.dots.forEach((dot) => {
        dot.x += dot.xa
        dot.y += dot.ya
        dot.xa *= (dot.x > canvas.width || dot.x < 0) ? -1 : 1
        dot.ya *= (dot.y > canvas.height || dot.y < 0) ? -1 : 1
        ctx.fillStyle = '#ffffff'
        ctx.beginPath()
        ctx.arc(dot.x - 0.5, dot.y - 0.5, 2, 0, 2 * Math.PI, true)
        ctx.closePath()
        ctx.fill()
        for (let i = 0; i < ndots.length; i++) {
          let d2 = ndots[i]
          if (dot === d2 || d2.x === null || d2.y === null) continue
          let xc = dot.x - d2.x
          let yc = dot.y - d2.y
          let dis = Math.sqrt(xc * xc + yc * yc)
          let ratio
          if (dis < d2.max) {
            ratio = (d2.max - dis) / d2.max
            ctx.beginPath()
            ctx.lineWidth = ratio / 2
            if (d2 === this.warea) {
              ctx.strokeStyle = 'rgba(255,255,255,0)'
            } else {
              ctx.strokeStyle = 'rgba(255,255,255,' + (ratio + 0.2) + ')'
            }
            ctx.moveTo(dot.x, dot.y)
            ctx.lineTo(d2.x, d2.y)
            ctx.stroke()
          }
        }
        ndots.splice(ndots.indexOf(dot), 1)
      })
      this.animationFrame1 = window.requestAnimationFrame(this.drawDot)
    },
    rads(x) {
      return Math.PI * x / 180
    },
    act() {
      let canvas = document.querySelector('#main')
      canvas.style.width = this.centerBox.height + 'px'
      canvas.style.height = this.centerBox.height + 'px'
      let context = canvas.getContext('2d')
      context.clearRect(0, 0, canvas.width, canvas.height)
      this.drawPie(this.everyPer, context)
      this.animationFrame2 = window.requestAnimationFrame(this.act)
      this.everyPer += Math.PI / 180
      let speed = 0.07
      this.xOffset += speed
    },
    drawPie(everyPer, context) {
      context.save()
      context.fillStyle = 'rgba(18,55,88,.2)'
      context.beginPath()
      context.arc(this.circle.x, this.circle.y, 245, 0, 2 * Math.PI, true)
      context.closePath()
      context.fill()
      context.restore()
      context.save()
      context.shadowBlur = 50
      context.shadowColor = '#123959'
      context.fillStyle = '#080D27'
      context.beginPath()
      context.arc(this.circle.x, this.circle.y, 235, 0, 2 * Math.PI, true)
      context.closePath()
      context.fill()
      context.restore()
      for (let i = 0; i < this.title.length; i++) {
        context.save()
        this.drawCircularText(this.circle, this.title[i], this.rads(i * 60 - 110), this.rads(i * 60 - 65), i, context)
        context.restore()
      }
      let x = 240 * Math.cos(everyPer)
      let y = 240 * Math.sin(everyPer)
      context.save()
      context.fillStyle = 'rgb(56,252,253)'
      context.shadowBlur = 80
      context.shadowColor = '#39E9EE'
      context.translate(this.circle.x, this.circle.y)
      context.beginPath()
      context.arc(x, y, 5, 0, 2 * Math.PI)
      context.arc(-x, -y, 5, 0, 2 * Math.PI)
      context.closePath()
      context.fill()
      context.restore()
      context.save()
      context.fillStyle = '#153776'
      context.beginPath()
      context.arc(this.circle.x, this.circle.y, 200, 0, 2 * Math.PI, true)
      context.closePath()
      context.fill()
      context.fillStyle = '#121535'
      context.beginPath()
      context.arc(this.circle.x, this.circle.y, 190, 0, 2 * Math.PI, true)
      context.closePath()
      context.fill()
      let nowRange = 36
      context.save()
      this.drawCircle(context)
      this.drawSin(this.xOffset, context, nowRange)
      this.drawText(context, nowRange)
      context.restore()
      for (let i = 0; i < 6; i++) {
        context.save()
        context.translate(this.circle.x, this.circle.y)
        context.rotate((-Math.PI / 2 + Math.PI / 6) + i * Math.PI / 3)
        context.beginPath()
        context.moveTo(190, 0)
        context.lineTo(200, 0)
        context.lineWidth = 4
        context.strokeStyle = '#0A122D'
        context.stroke()
        context.closePath()
        context.restore()
      }
    },
    drawCircle(ctx) {
      ctx.beginPath()
      ctx.fillStyle = '#209ADF'
      ctx.arc(this.circle.x, this.circle.y, 120, 0, 2 * Math.PI)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(this.circle.x, this.circle.y, 120, 0, 2 * Math.PI)
      ctx.clip()
    },
    drawSin(xOffset, ctx, nowRange) {
      let mW = 240
      let mH = 240
      let sX = 0
      let axisLength = mW
      let waveWidth = 0.04
      let waveHeight = 12
      ctx.save()
      ctx.translate(130, 130)
      let points = []
      ctx.beginPath()
      for (let x = sX; x < sX + axisLength; x += 20 / axisLength) {
        let y = -Math.sin((sX + x) * waveWidth + xOffset)
        let dY = mH * (1 - nowRange / 100)
        points.push([x, dY, dY + y * waveHeight])
        ctx.lineTo(x, dY + y * waveHeight)
      }
      ctx.lineTo(axisLength, mH)
      ctx.lineTo(sX, mH)
      ctx.lineTo(points[0][0], points[0][1])
      ctx.fillStyle = '#2C50B1'
      ctx.fill()
      ctx.restore()
    },
    drawText(ctx, nowRange) {
      ctx.save()
      ctx.translate(130, 130)
      let size = 50
      ctx.font = size + 'px Microsoft Yahei'
      ctx.textAlign = 'center'
      ctx.fillStyle = '#95EFFF'
      ctx.fillText(nowRange + '%', 120, 120 - size / 2)
      ctx.restore()
      ctx.save()
      size = 25
      ctx.translate(130, 130)
      ctx.font = size + 'px Microsoft Yahei'
      ctx.textAlign = 'center'
      ctx.fillStyle = '#95EFFF'
      ctx.fillText('平均营销质量指数', 120, 120 + size)
      ctx.restore()
    },
    drawCircularText(s, string, startAngle, endAngle, n, context) {
      let radius = s.radius
      let angleDecrement
      let angle = parseFloat(startAngle)
      let index = 0
      let character
      let arr = string.split(':')
      context.save()
      context.fillStyle = '#fff'
      context.font = '12px 微软雅黑 '
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      if (n < 2 || n === 5) {
        while (index < string.length) {
          character = string.charAt(index)
          if (arr[0].indexOf(character) >= 0) {
            if (arr[0].length > 6) {
              angleDecrement = (startAngle - endAngle) / (string.length - 3)
            } else {
              angleDecrement = (startAngle - endAngle) / (string.length - 1)
            }
          } else {
            angleDecrement = (startAngle - endAngle) / (string.length + 6)
          }
          context.save()
          context.beginPath()
          context.translate(s.x + Math.cos(angle) * radius,
            s.y + Math.sin(angle) * radius)
          context.rotate(Math.PI / 2 + angle)
          context.fillText(character, 0, 0)
          angle -= angleDecrement
          index++
          context.restore()
        }
      } else {
        while (index < string.length) {
          character = string.split('').reverse().join('').charAt(index)// 字符串反转
          if (arr[1].indexOf(character) >= 0) {
            angleDecrement = (startAngle - endAngle) / (string.length + 6)
          } else {
            if (arr[0].length > 6) {
              angleDecrement = (startAngle - endAngle) / (string.length - 3)
            } else {
              angleDecrement = (startAngle - endAngle) / (string.length - 1)
            }
          }
          context.save()
          context.beginPath()
          context.translate(s.x + Math.cos(angle) * radius,
            s.y + Math.sin(angle) * radius)
          context.rotate(-Math.PI / 2 + angle)// 旋转文字
          context.fillText(character, 0, 0)
          angle -= angleDecrement
          index++
          context.restore()
        }
      }
      context.restore()
    }
  }
}
</script>
<style lang="scss" scoped>
.title {
  position: absolute;
  display: inline-block;
  color: #6EDDF1;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 15px;
  padding: 5px 14px;
  background: radial-gradient(2.4rem 1rem ellipse, rgba(7, 9, 34, .8) 60%, rgb(21, 67, 145))
}
.page2 {
  height: 100%;
  width: 100%;
  padding: 14px 20px 20px;
  background: #03044A;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .content {
    display: flex;
    flex-direction: row;
    height: 65%;
    width: 100%;
    .topleft {
      width: 34%;
      height: 100%;
    }
    .circlePie {
      width: 32%;
      height: 100%;
      padding: 0 0 40px;
      text-align: center;
      position: relative;
      canvas {
        position: absolute;
        left: 50%;
        top: 0;
        transform: translate(-50%, 0)
      }
      #dot {
        background: rgba(0, 0, 0, 0)
      }
    }
    .topright {
      width: 34%;
      height: 100%;
    }
    .topleft, .topright {
      display: flex;
      flex-direction: column;
      .list {
        height: 48%;
        width: 100%;
        .left, .right {
          background: #0D1341;
        }
        .left, .right, .center {
          width: 100%;
          height: 90%;
          border: 1px solid #0D2451;
          position: relative;
          #left1, #left2, #left3, #right1, #right2, #right3, #center2 {
            height: 100%;
          }
          .chart-68 {
            width: 68%;
            height: 100%;
            float: left;
          }
          .chart-32 {
            width: 32%;
            height: 100%;
            float: left;
          }
        }
      }
    }
  }
  .bottom-list {
    height: 35%;
    width: 100%;
    display: flex;
    flex-direction: row;
    .bottomleft {
      height: 100%;
      width: 66%;
      display: flex;
      flex-direction: row;
      .list {
        height: 100%;
        width: 33.3333%;
        padding-right: 1.5%;
        float: left;
        #bottom_4 {
          padding: 0 20px;
        }
        .bottom {
          width: 100%;
          height: 100%;
          border: 1px solid #0D2451;
          position: relative;
        }
      }
    }
    .bottomright {
      height: 100%;
      width: 32%;
      .list {
        width: 100%;
        height: 100%;
        border: 1px solid #0D2451;
      }
    }
  }
}
</style>
