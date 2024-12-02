<template>
  <div style="height:100%;">
    <div class="header">
      <div v-for="i in [1,2,3]" :key="i" @click="$router.push(`page${i}`)"><span>页面{{ i }}</span></div>
    </div>
    <div class="page">
      <router-view :selectRangeDate='selectRangeDate'></router-view>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      selectRangeDate: []
    }
  },
  mounted() {
    let arr = [];
    for (let i = -30; i < 0; i++) { // 循环添加天数
      let today = new Date();// 获取今天
      let targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * i;
      today.setTime(targetday_milliseconds); //设置i天前的时间
      let tYear = today.getFullYear();
      let tMonth = today.getMonth();
      let tDate = today.getDate();
      let date = [tYear, tMonth + 1, tDate];
      arr.push(date);
    }
    this.selectRangeDate = arr
  }
}
</script>
<style lang="scss">
.header {
  display: flex;
  height: 80px;
  background: #03044A;
  justify-content: space-between;
  flex-direction: row;

  span {
    width: 100px;
    color: white;
    margin: 0 20px;
  }
}

.page {
  height: calc(100vh - 80px);
}
</style>
