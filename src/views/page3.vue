<template>
  <div class="page3">
    <div class="left">
      <span class="title"><span class="title-text">网赌网炒风险分析</span></span>
      <div class="left1" style="height:50%;">
        <div style="height:65%;">
          <channel-bar id="left_1" ref="channelBar1" title="网赌网炒渠道分析" :data="data1" />
          <distribution-solider id="left_2" ref="distributionSolider1" :data="data2" />
        </div>
        <div style="height: 35%;display: flex">
          <div style="height: 100%; width: 33.33%;">
            <pie id="pie_1" ref="chart3" :data="pieData1" />
          </div>
          <div style="height: 100%; width: 33.33%;">
            <pie id="pie_3" ref="chart3" :data="pieData2" />
          </div>
          <div style="height: 100%; width: 33.33%;">
            <pie id="pie_2" ref="chart3" :data="pieData3" />
          </div>
        </div>
      </div>
      <div class="left1" style="height:28%;">
        <red-pocket ref="redPocket" />
      </div>
      <div style="height:22%;">
        <div style="height:100%;">
          <channel-bar id="left_5" ref="channelBar2" title="炒股借贷渠道分析" :data="data3" />
          <distribution-solider id="left_6" ref="distributionSolider2" :data="data4" />
        </div>
      </div>
    </div>
    <div class="middle">
      <div class="center-top">
        <china-map ref="chinaMap" />
      </div>
      <div class="center-bottom">
        <span class="title"><span class="title-text">社会泄密风险分析</span></span>
        <div class="bottom-radars">
          <radar id="bottom_1_1" ref="chart1" :data="data5" />
          <radar id="bottom_1_2" ref="chart2" :data="data6" />
          <radar id="bottom_1_3" ref="chart3" :data="data7" />
          <radar id="bottom_1_4" ref="chart4" :data="data8" />
        </div>
        <div class="bottom-bars">
          <double-bar id="bottom_2_1" ref="chart5" :data="data9" />
          <double-bar id="bottom_2_2" ref="chart6" :data="data10" />
          <double-bar id="bottom_2_3" ref="chart7" :data="data11" />
          <double-bar id="bottom_2_4" ref="chart8" :data="data12" />
        </div>
      </div>
    </div>
    <div class="right">
      <div class="right-1">
        <div class="right1-1">
          <span class="title"><span class="title-text">网播风险分析</span></span>
          <webcasts-risk ref="webcastsRisk" />
        </div>
      </div>
      <div class="right-1">
        <div class="right1-1">
          <span class="title"><span class="title-text">设备安全性风险分析</span></span>
          <device-safe-risk ref="deviceSafeRisk" />
        </div>
      </div>
      <div class="right-2">
        <span class="title"><span class="title-text">舆论/心理风险分析</span></span>
        <div class="circular">
          <div class="canvas">
            <div class="subtitle">话题分布</div>
            <div class="canvasList">
              <double-ring id="canvas_1" ref="ring1" title="自杀抑郁" color="#00CCFF" />
              <double-ring id="canvas_2" ref="ring2" title="药品枪支" color="#EDCE43" />
              <double-ring id="canvas_3" ref="ring3" title="色情同性恋" color="#F83552" />
            </div>
          </div>
          <hot-words ref="hotWords" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
let chinaMap = () => import('./components/page3/chinaMap')
let channelBar = () => import('./components/page3/channelBar')
let distributionSolider = () => import('./components/page3/distributionSolider')
let pie = () => import('./components/pie')
let redPocket = () => import('./components/page3/redPocket')
let radar = () => import('./components/radar')
let doubleBar = () => import('./components/page3/doubleBar')
let webcastsRisk = () => import('./components/page3/webcastsRisk')
let deviceSafeRisk = () => import('./components/page3/deviceSafeRisk')
let doubleRing = () => import('./components/page3/doubleRing')
let hotWords = () => import('./components/page3/hotWords')
export default {
  name: 'Page3',
  components: {
    chinaMap,
    channelBar,
    distributionSolider,
    pie,
    redPocket,
    radar,
    doubleBar,
    webcastsRisk,
    deviceSafeRisk,
    doubleRing,
    hotWords
  },
  data() {
    return {
      data1: [
        {
          subtitle: '675人（2345次/4533元）',
          top: '20%',
          data: {name: '红包转账', value: 45, color: '#0E4CFF'}
        },
        {
          subtitle: '675人（2345次/4533元）',
          top: '36%',
          data: {name: '访问涉赌网络', value: 60, color: '#B405FD'}
        },
        {
          subtitle: '675人（2345次/4533元）',
          top: '53%',
          data: {name: '使用涉赌应用', value: 12, color: '#FE9900'}
        },
        {
          subtitle: '675人（2345次/4533元）',
          top: '69%',
          data: {name: '访问炒股网络', value: 24, color: '#FF6600'}
        },
        {
          subtitle: '675人（2345次/4533元）',
          top: '85%',
          data: {name: '使用炒股应用', value: 21, color: '#7F05FD'}
        }
      ],
      data3: [
        {
          subtitle: '675人（2345次/4533元）',
          top: '29%',
          data: {name: '红包转账', value: 45, color: '#0E4CFF'}
        },
        {
          subtitle: '675人（2345次/4533元）',
          top: '54%',
          data: {name: '访问涉赌应用', value: 60, color: '#FE9900'}
        },
        {
          subtitle: '675人（2345次/4533元）',
          top: '78%',
          data: {name: '使用炒股应用', value: 12, color: '#7F05FD'}
        }
      ],
      data2: [ // 网赌用户排名数据
        {
          top: '16%',
          color: '14,73,245',
          data: [
            {name: '王立国', value: 10},
            {name: '李建国', value: 9},
            {name: '董年月', value: 8},
            {name: '高树安', value: 7},
            {name: '李白', value: 6},
            {name: '杜甫', value: 5},
            {name: '刘禹锡', value: 4},
            {name: '苏东坡', value: 3},
            {name: '杜牧', value: 2},
            {name: '李白', value: 1}
          ]
        },
        {
          top: '34%',
          color: '170,6,243',
          data: [
            {name: '王立国', value: 10},
            {name: '李建国', value: 9},
            {name: '董年月', value: 8},
            {name: '高树安', value: 7},
            {name: '李白', value: 6},
            {name: '杜甫', value: 5},
            {name: '刘禹锡', value: 4},
            {name: '苏东坡', value: 3},
            {name: '杜牧', value: 2},
            {name: '李白', value: 1}
          ]
        },
        {
          top: '50%',
          color: '254,153,0',
          data: [
            {name: '王立国', value: 10},
            {name: '李建国', value: 9},
            {name: '董年月', value: 8},
            {name: '高树安', value: 7},
            {name: '李白', value: 6},
            {name: '杜甫', value: 5},
            {name: '刘禹锡', value: 4},
            {name: '苏东坡', value: 3},
            {name: '杜牧', value: 2},
            {name: '李白', value: 1}
          ]
        },
        {
          top: '68%',
          color: '255,102,0',
          data: [
            {name: '王立国', value: 10},
            {name: '李建国', value: 9},
            {name: '董年月', value: 8},
            {name: '高树安', value: 7},
            {name: '李白', value: 6},
            {name: '杜甫', value: 5},
            {name: '刘禹锡', value: 4},
            {name: '苏东坡', value: 3},
            {name: '杜牧', value: 2},
            {name: '李白', value: 1}
          ]
        },
        {
          top: '85%',
          color: '127,5,253',
          data: [
            {name: '王立国', value: 10},
            {name: '李建国', value: 9},
            {name: '董年月', value: 8},
            {name: '高树安', value: 7},
            {name: '李白', value: 6},
            {name: '杜甫', value: 5},
            {name: '刘禹锡', value: 4},
            {name: '苏东坡', value: 3},
            {name: '杜牧', value: 2},
            {name: '李白', value: 1}
          ]
        }
      ],
      data4: [
        {
          top: '30%',
          color: '14,73,245',
          data: [
            {name: '王立国', value: 10},
            {name: '李建国', value: 9},
            {name: '董年月', value: 8},
            {name: '高树安', value: 7},
            {name: '李白', value: 6},
            {name: '杜甫', value: 5},
            {name: '刘禹锡', value: 4},
            {name: '苏东坡', value: 3},
            {name: '杜牧', value: 2},
            {name: '李白', value: 1}
          ]
        },
        {
          top: '57%',
          color: '254,153,0',
          data: [
            {name: '王立国', value: 10},
            {name: '李建国', value: 9},
            {name: '董年月', value: 8},
            {name: '高树安', value: 7},
            {name: '李白', value: 6},
            {name: '杜甫', value: 5},
            {name: '刘禹锡', value: 4},
            {name: '苏东坡', value: 3},
            {name: '杜牧', value: 2},
            {name: '李白', value: 1}
          ]
        },
        {
          top: '83%',
          color: '127,5,253',
          data: [
            {name: '王立国', value: 10},
            {name: '李建国', value: 9},
            {name: '董年月', value: 8},
            {name: '高树安', value: 7},
            {name: '李白', value: 6},
            {name: '杜甫', value: 5},
            {name: '刘禹锡', value: 4},
            {name: '苏东坡', value: 3},
            {name: '杜牧', value: 2},
            {name: '李白', value: 1}
          ]
        }
      ],
      data5: {
        title: '社会应用分析',
        position: ['5%', '14%'],
        center: ['50%', '60%'],
        indicator: [
          {text: '微信'},
          {text: 'QQ'},
          {text: '微博'},
          {text: '陌陌'},
          {text: 'INS'},
          {text: '抖音'}
        ],
        data: [
          {
            name: '安装量',
            color: '#0DE4EE',
            value: [100, 8, 0.40, -80, 2000, 345]
          },
          {
            name: '使用时长',
            color: '#0D88F3',
            value: [60, 5, 0.30, -100, 1500, 232]
          }
        ]
      },
      data6: {
        title: '涉军信息分析',
        position: ['5%', '14%'],
        center: ['50%', '60%'],
        indicator: [
          {text: '微信'},
          {text: 'QQ'},
          {text: 'SNS'},
          {text: '漂流瓶'},
          {text: '陌陌'},
          {text: '摇一摇'},
          {text: 'INS'},
          {text: '抖音'}
        ],
        data: [
          {
            name: '个人信息涉军',
            color: '#6514FF',
            value: [100, 8, 0.40, -80, 2000, 345, 12, 654]
          },
          {
            name: '内容涉军',
            color: '#B370FD',
            value: [60, 5, 0.30, -100, 1500, 232, 432, 43]
          }
        ]
      },
      data7: {
        title: '交友方式分析',
        position: ['5%', '14%'],
        center: ['50%', '60%'],
        indicator: [
          {text: '面对面'},
          {text: '手机号'},
          {text: '手机联系人'},
          {text: '摇一摇'},
          {text: '微博'},
          {text: '微信'},
          {text: '名片'},
          {text: '快手'},
          {text: 'INS'},
          {text: '扫一扫'},
          {text: '附近的人'},
          {text: '漂流瓶'}
        ],
        data: [
          {
            name: '主动',
            color: '#0096FE',
            value: [100, 8, 0.40, -80, 2000, 345, 123, 21, 34, 54, 431, 876]
          },
          {
            name: '被动',
            color: '#9EEAFF',
            value: [60, 5, 0.30, -100, 1500, 232, 78, 32, 567, 43, 765, 432]
          }
        ]
      },
      data8: {
        title: '群属性分析',
        position: ['5%', '14%'],
        center: ['50%', '60%'],
        indicator: [
          {text: '博彩群'},
          {text: '涉赌群'},
          {text: '营销群'},
          {text: '其他'},
          {text: '相亲群'},
          {text: '涉黄群'}
        ],
        data: [
          {
            name: '微信',
            color: '#FD9800',
            value: [100, 8, 0.40, -80, 2000, 345]
          },
          {
            name: 'QQ',
            color: '#FDC673',
            value: [60, 5, 0.30, -100, 1500, 232]
          }
        ]
      },
      data9: {
        title: '重点关注用户',
        data: [
          {
            name: '个数',
            color: '#00CCFF',
            value: ['112', '212', '42', '232', '123', '67']
          },
          {
            name: '使用时长',
            color: '#142AFE',
            value: ['112', '212', '42', '232', '123', '67']
          }
        ]
      },
      data10: {
        title: '重点关注用户',
        data: [
          {
            name: '个人信息涉军应用个数',
            color: '#6514FF',
            value: ['112', '212', '42', '232', '123', '67']
          },
          {
            name: '涉军内容条数',
            color: '#B370FD',
            value: ['112', '212', '42', '232', '123', '67']
          }
        ]
      },
      data11: {
        title: '重点关注异常交友用户',
        data: [
          {
            name: '主动',
            color: '#05467D',
            value: ['112', '212', '42', '232', '123', '67']
          },
          {
            name: '被动',
            color: '#52B8FF',
            value: ['112', '212', '42', '232', '123', '67']
          }
        ]
      },
      data12: {
        title: '重点关注用户',
        data: [
          {
            name: '个数',
            color: '#FD9800',
            value: ['112', '212', '42', '232', '123', '67']
          },
          {
            name: '使用时长',
            color: '#FDC673',
            value: ['112', '212', '42', '232', '123', '67']
          }
        ]
      },
      pieData1: {// 饼图数据1
        title: 'TOP数据1',
        color: '#2C7BFE',
        data: [
          {
            value: 60,
            name: '分类1',
            itemStyle: {
              color: '#1456FE'
            }
          },
          {
            value: 20,
            name: '分类2',
            itemStyle: {
              color: '#00CCFF'
            }
          },
          {
            value: 80,
            name: '分类3',
            itemStyle: {
              color: '#142AFE'
            }
          },
          {
            value: 40,
            name: '分类4',
            itemStyle: {
              color: '#1493FE'
            }
          },
          {
            value: 40,
            name: '分类5',
            itemStyle: {
              color: '#252448'
            }
          }
        ]
      },
      pieData2: {// 饼图数据1
        title: 'TOP数据2',
        color: '#2C7BFE',
        data: [
          {
            value: 60,
            name: '分类1',
            itemStyle: {
              color: '#142AFE'
            }
          },
          {
            value: 20,
            name: '分类2',
            itemStyle: {
              color: '#1493FE'
            }
          },
          {
            value: 80,
            name: '分类3',
            itemStyle: {
              color: '#252448'
            }
          },
          {
            value: 40,
            name: '分类4',
            itemStyle: {
              color: '#00CCFF'
            }
          },
          {
            value: 40,
            name: '分类5',
            itemStyle: {
              color: '#1456FE'
            }
          }
        ]
      },
      pieData3: {// 饼图数据1
        title: 'TOP数据3',
        color: '#2C7BFE',
        data: [
          {
            value: 60,
            name: '分类1',
            itemStyle: {
              color: '#1493FE'
            }
          },
          {
            value: 20,
            name: '分类2',
            itemStyle: {
              color: '#142AFE'
            }
          },
          {
            value: 80,
            name: '分类3',
            itemStyle: {
              color: '#1456FE'
            }
          },
          {
            value: 40,
            name: '分类4',
            itemStyle: {
              color: '#00CCFF'
            }
          },
          {
            value: 40,
            name: '分类5',
            itemStyle: {
              color: '#252448'
            }
          }
        ]
      }
    }
  },
  mounted() {
    setTimeout(() => {
      // 通过捕获系统的onresize事件触发我们需要执行的事件
      this.$refs.channelBar1.setChart()
      this.$refs.distributionSolider1.setChart()
      this.$refs.channelBar2.setChart()
      this.$refs.distributionSolider2.setChart()
      // this.$refs.pies.setPies()
      this.$refs.redPocket.setPocket()
      this.$refs.webcastsRisk.setWebcasts()
      this.$refs.deviceSafeRisk.setDeviceSafe()
      this.$refs.ring1.drawRing()
      this.$refs.ring2.drawRing()
      this.$refs.ring3.drawRing()
      for (let i = 1; i < 9; i++) {
        this.$refs['chart' + i].setChart()
      }
      this.$refs.chinaMap.setMap()
      this.$refs.hotWords.setChart()
    }, 500)
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
.page3 {
  height: 100%;
  width: 100%;
  padding: 14px 20px 20px;
  background: #03044A;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  .left {
    width: 26%;
    height: 100%;
  }
  .middle {
    width: 48%;
    height: 100%;
    padding: 0 1%;
    .center-top {
      height: 60%;
      width: 100%;
    }
    .center-bottom {
      height: 40%;
      width: 100%;
      display: flex;
      flex-direction: column;
      .bottom-radars {
        height: 55%;
        width: 100%;
        display: flex;
        flex-direction: row;
      }
      .bottom-bars {
        width: 100%;
        height: 45%;
        display: flex;
        flex-direction: row;
      }
    }
  }
  .right {
    width: 26%;
    height: 100%;
    .right-1 {
      height: 30%;
      .right1-1 {
        height: 92%;
      }
    }
    .right-2 {
      height: 40%;
      .circular {
        height: 100%;
        width: 100%;
        .canvas {
          height: 100%;
          width: 30%;
          float: left;
          .subtitle {
            font-size: 12px;
            font-weight: bold;
            color: #fff;
            height: 25px;
            padding: 10px 0;
            text-align: center;
          }
          .canvasList {
            height: calc(100% - 25px);
            text-align: center
          }
        }
      }
    }
  }
  .left, .middle, .right {
    height: 100%;
    border: 1px solid #0D2451;
    position: relative;
    background: #151456;
    #left_5 {
      height: 100%;
      width: 45%;
      float: left;
    }
    #left_6 {
      height: 100%;
      width: 55%;
      float: left;
    }
    .left1 {
      border-bottom: 1px solid #0D2451;
      background: #151456;
    }
    .title {
      position: absolute;
      display: inline-block;
      color: #6EDDF1;
      border: 2px solid #6EDDF1;
      height: 18px;
      padding: 0 2px;
      left: 50%;
      transform: translate(-50%, -50%);
      .title-text {
        position: relative;
        font-size: 16px;
        background: #09102E;
        display: inline-block;
        padding: 0 4px;
        transform: translateY(-5px);
      }
    }
  }
}
</style>
