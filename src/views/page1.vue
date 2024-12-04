<template>
  <div class="page1">
    <div class="listTop">
      <div class="leftTop">
        <span class="title">模块一分析</span>
        <div class="left1">
          <double-area ref="chart1" :select-range-date="selectRangeDate" />
        </div>
        <div class="left2">
          <web-bar ref="chart2" :data="data1" />
          <div style="width: 40%;float: left;height: 100%;">
            <pie id="left_2_2" ref="chart3" :data="data2" />
          </div>
        </div>
        <div class="left3">
          <web-bar ref="chart4" :data="data3" />
          <div style="width: 40%;float: left;height: 100%;">
            <pie id="left_3_2" ref="chart5" :data="data4" />
          </div>
        </div>
      </div>
      <img alt="" class="midleTop" src="https://superfree.cn/api/static/robot.png" width="90%" />
      <div class="rightTop">
        <div class="rightTop-1">
          <span class="title">世界地图分析</span>
          <world-map ref="chart7" />
        </div>
        <div class="rightTop-2">
          <span class="title">模块六分析</span>
          <div class="rightTop-list">
            <div class="list">
              <popular-bar ref="chart8" />
            </div>
            <div class="list">
              <ring ref="chart9" :data="data5" />
            </div>
            <div class="list">
              <ring ref="chart10" :data="data6" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="listBottom">
      <div class="bottom1">
        <div class="content">
          <span class="title">模块二分析</span>
          <div class="analize">
            <div class="topLine">
              <lines ref="chart11" />
            </div>
            <div class="bottomPie">
              <pie-ring ref="chart12" :data="data7" />
              <pie-ring ref="chart13" :data="data8" />
            </div>
          </div>
        </div>
      </div>
      <div class="bottom2">
        <div class="content">
          <span class="title">模块三分析</span>
          <div class="behavior">
            <area-chart ref="chart14" style="height: 55%" :select-range-date="selectRangeDate"
                        :config="configData9" />
            <colors-bar ref="chart15" :data="colorsData" />
          </div>
        </div>
      </div>
      <div class="bottom3">
        <div class="content">
          <span class="title">模块四分析</span>
          <funnel ref="chart16" />
        </div>
      </div>
      <div class="bottom4">
        <div class="content">
          <span class="title">模块五分析</span>
          <div class="appUse">
            <line-bar ref="chart17" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
let doubleArea = () => import('./components/page1/doubleArea.vue')
let webBar = () => import('./components/page1/webBar.vue')
let pie = () => import('./components/pie')
let worldMap = () => import('./components/page1/worldMap')
let ring = () => import('./components/page1/ring')
let popularBar = () => import('./components/page1/popularBar')
let lines = () => import('./components/page1/lines')
let pieRing = () => import('./components/page1/pieRing')
let colorsBar = () => import('./components/page1/colorsBar')
let funnel = () => import('./components/page1/funnel')
let lineBar = () => import('./components/page1/lineBar')
let areaChart = () => import('./components/areaChart')
export default {
  name: 'Page1',
  components: {
    doubleArea, // 面积图
    webBar, // 柱图
    pie, // 饼图
    worldMap, // 世界地图
    ring, // 圆环
    popularBar, // 柱图
    lines, // 折线图
    pieRing, // 饼环图
    colorsBar, // 柱图
    funnel, // 漏斗图
    lineBar, // 柱图
    areaChart // 面积图
  },
  props: {
    selectRangeDate: Array
  },
  data() {
    return {
      data1: { // 柱图数据1
        name: '柱图数据1',
        number: '100次',
        data: ['排行1', '排行2', '排行3', '排行4', '排行5'],
        color: '192,35,42',
        value: [60, 50, 40, 30, 20]
      },
      data2: {// 饼图数据1
        title: '饼图数据1分类占比',
        color: '#BE232A',
        data: [
          {
            value: 60,
            name: '分类1',
            itemStyle: {
              color: '#a262f2'
            }
          },
          {
            value: 20,
            name: '分类2',
            itemStyle: {
              color: '#2ca8fe'
            }
          },
          {
            value: 80,
            name: '分类3',
            itemStyle: {
              color: '#feac2c'
            }
          },
          {
            value: 40,
            name: '分类4',
            itemStyle: {
              color: '#c0232a'
            }
          },
          {
            value: 40,
            name: '分类5',
            itemStyle: {
              color: '#2cd9fe'
            }
          },
          {
            value: 40,
            name: '分类6',
            itemStyle: {
              color: '#ff787e'
            }
          },
          {
            value: 30,
            name: '其他',
            itemStyle: {
              color: '#252448'
            }
          }
        ]
      },
      data3: { // 柱图数据2
        name: '柱图数据2',
        number: '100次',
        data: ['排行1', '排行2', '排行3', '排行4', '排行5'],
        color: '40,112,232',
        value: [6, 5, 4, 3, 2]
      },
      // 饼图数据2
      data4: {
        title: '饼图数据2分类占比',
        color: '#2C7BFE',
        data: [
          {
            value: 20,
            name: '分类1',
            itemStyle: {
              color: '#feed2c'
            }
          },
          {
            value: 20,
            name: '分类2',
            itemStyle: {
              color: '#2ca8fe'
            }
          },
          {
            value: 40,
            name: '分类3',
            itemStyle: {
              color: '#feac2c'
            }
          },
          {
            value: 40,
            name: '分类4',
            itemStyle: {
              color: '#2c7bfe'
            }
          },
          {
            value: 100,
            name: '其他',
            itemStyle: {
              color: '#252448'
            }
          }
        ]
      },
      // 环形图数据
      data5: {
        title: '环形图数据1',
        data: [
          {
            value: 335,
            name: '模拟1',
            itemStyle: {
              color: '#252448'
            }
          },
          {
            value: 310,
            name: '模拟2',
            itemStyle: {
              color: '#2ca8fe'
            }
          },
          {
            value: 234,
            name: '模拟3',
            itemStyle: {
              color: '#feed2c'
            }
          },
          {
            value: 135,
            name: '其他',
            itemStyle: {
              color: '#2871ea'
            }
          },
          {
            value: 200,
            name: '模拟4',
            itemStyle: {
              color: '#fe672c'
            }
          }
        ]
      },
      // 环形数据2
      data6: {
        title: '热词传播次数',
        data: [
          {
            value: 335,
            name: '模拟1',
            itemStyle: {
              color: '#69f262'
            }
          },
          {
            value: 310,
            name: '模拟2',
            itemStyle: {
              color: '#c0232a'
            }
          },
          {
            value: 234,
            name: '模拟3',
            itemStyle: {
              color: '#2cfcfe'
            }
          },
          {
            value: 135,
            name: '其他',
            itemStyle: {
              color: '#252448'
            }
          },
          {
            value: 200,
            name: '模拟4',
            itemStyle: {
              color: '#a262f2'
            }
          }
        ]
      },
      data7: {
        title: '收支笔数及占比',
        data: [
          {
            value: 70,
            name: '收入',
            itemStyle: {
              color: '#c0232a'
            }
          },
          {
            value: 60,
            name: '支出',
            itemStyle: {
              color: '#2870e8'
            }
          }
        ],
        data1: [
          {
            value: 40,
            name: '红包',
            itemStyle: {
              color: '#c0232a'
            }
          },
          {
            value: 60,
            name: '转账',
            itemStyle: {
              color: '#2870e8'
            }
          }
        ]
      },
      data8: {
        title: '收支金额及占比',
        data: [
          {
            value: 80,
            name: '收入',
            itemStyle: {
              color: '#c0232a'
            }
          },
          {
            value: 60,
            name: '支出',
            itemStyle: {
              color: '#2870e8'
            }
          }
        ],
        data1: [
          {
            value: 40,
            name: '红包',
            itemStyle: {
              color: '#c2232a'
            }
          },
          {
            value: 60,
            name: '购物',
            itemStyle: {
              color: '#fe672c'
            }
          },
          {
            value: 40,
            name: '旅游',
            itemStyle: {
              color: '#a262f2'
            }
          },
          {
            value: 20,
            name: '其他',
            itemStyle: {
              color: '#2870e8'
            }
          },
          {
            value: 80,
            name: '交通',
            itemStyle: {
              color: '#feed2c'
            }
          }
        ]
      },
      // 交友分析面积图
      configData9: {
        title: '【交友分析】',
        color: '#75deef',
        name: ['（人）', '（人）'],
        data: [
          {
            name: '新增好友数',
            color: ['#feed2c', '#353103'],
            data: [240, 132, 101, 134, 90, 170, 110]
          },
          {
            name: '好友总数',
            color: ['#2871ea', '#0a1b41'],
            data: [20, 102, 101, 134, 190, 150, 120]
          },
          {
            name: '新增群数',
            color: ['#935adf', '#230f3e'],
            data: [100, 32, 101, 134, 150, 110, 180]
          },
          {
            name: '群总数',
            color: ['#e65f2d', '#551f0b'],
            data: [120, 122, 141, 144, 60, 220, 120]
          }
        ]
      },
      // 交友方式柱图
      colorsData: [
        {
          itemStyle: {
            color: '#2c7bfe'
          },
          name: '漂流瓶',
          value: 255
        },
        {
          itemStyle: {
            color: '#c2232a'
          },
          name: '附近的人',
          value: 212
        },
        {
          itemStyle: {
            color: '#feed2c'
          },
          name: '雷达',
          value: 155
        },
        {
          itemStyle: {
            color: '#a262f2'
          },
          name: '摇一摇',
          value: 55
        },
        {
          itemStyle: {
            color: '#62d5f2'
          },
          name: '搜索',
          value: 80
        },
        {
          itemStyle: {
            color: '#fe672c'
          },
          name: '群聊',
          value: 160
        },
        {
          itemStyle: {
            color: '#69f262'
          },
          name: '扫一扫',
          value: 114
        },
        {
          itemStyle: {
            color: '#2ca8fe'
          },
          name: '其他',
          value: 20
        }
      ]
    }
  },
  watch: {
    selectRangeDate: function() {
      for (let i = 1; i < 18; i++) {
        this.$refs['chart' + i].setChart()
      }
    }
  },
  methods: {}
}
</script>
<style lang="scss">
.title {
  position: absolute;
  display: inline-block;
  color: #6EDDF1;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 15px;
  padding: 5px 14px;
  background: radial-gradient(2.4rem 1rem ellipse, rgba(7, 9, 34, .8) 60%, rgb(21, 67, 145));
}
.page1 {
  height: 100%;
  width: 100%;
  padding: 14px 20px 20px;
  background: #03044A;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .listTop {
    height: 60%;
    display: flex;
    flex-direction: row;
    .leftTop {
      width: 30%;
      height: 100%;
      border: 1px solid #0D2451;
      position: relative;
      .left1 {
        width: 100%;
        height: 40%;
      }
      .left2, .left3 {
        width: 100%;
        height: 30%;
        padding: 10px 0;
      }
    }
    .midleTop {
      width: 40%;
      height: 100%;
    }
    .rightTop {
      width: 30%;
      height: 100%;
      .rightTop-1 {
        width: 100%;
        height: 55%;
        border: 1px solid #0D2451;
        position: relative;
      }
      .rightTop-2 {
        width: 100%;
        margin-top: 5%;
        height: 40%;
        border: 1px solid #0D2451;
        position: relative;
        .rightTop-list {
          width: 100%;
          height: 100%;
          .list {
            width: 30%;
            height: 100%;
            float: left;
            &:first-child {
              width: 40%;
            }
          }
        }
      }
    }
  }
  .listBottom {
    height: 40%;
    display: flex;
    flex-direction: row;
    .bottom1 {
      width: 34%;
      height: 100%;
    }
    .bottom2 {
      width: 18%;
      height: 100%;
    }
    .bottom3 {
      width: 18%;
      height: 100%;
    }
    .bottom4 {
      width: 30%;
      height: 100%;
    }
    .bottom1, .bottom2, .bottom3, .bottom4 {
      height: 100%;
      .content {
        margin-top: 30px;
        height: calc(100% - 30px);
        border: 1px solid #0D2451;
        position: relative;
        .analize {
          display: flex;
          width: 100%;
          height: 100%;
          flex-direction: column;
          .topLine {
            height: 55%;
            width: 100%;
          }
          .bottomPie {
            height: 45%;
            display: flex;
            width: 100%;
            flex-direction: row;
            .pieMain {
              width: 50%;
              height: 100%;
            }
          }
        }
        .behavior {
          width: 100%;
          height: 100%;
        }
        .appUse {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
