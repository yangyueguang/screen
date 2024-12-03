<template>
  <div class="ring">
    <canvas :id="id"></canvas>
  </div>
</template>
<script>
export default {
  name: '',
  props: {
    id: String,
    title: String,
    color: String
  },
  data() {
    return {}
  },
  mounted() {
    this.drawRing()
  },
  methods: {
    drawRing() {
      let canvas = document.getElementById(this.id)
      let context = canvas.getContext('2d')
      canvas.width = this.$el.offsetWidth
      canvas.height = this.$el.offsetHeight
      context.lineWidth = 1
      context.strokeStyle = '#16417F'
      context.save()
      context.beginPath()
      context.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2 - 6, 0, 2 * Math.PI, false)
      context.stroke()
      context.restore()
      context.save()
      context.beginPath()
      context.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2 - 12, 0, 2 * Math.PI, false)
      context.stroke()
      context.restore()
      let percent1 = 60
      let percent2 = 60
      let angle1 = percent1 * 3.6 - 90
      let angle2 = percent2 * 3.6 - 60
      context.lineWidth = 4
      context.lineCap = 'round'
      context.save()
      context.strokeStyle = '#035EFF'
      context.beginPath()
      context.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2 - 6, -Math.PI / 2, angle1 * Math.PI / 180, false)
      context.stroke()
      context.restore()
      context.save()
      context.beginPath()
      context.strokeStyle = this.color
      context.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2 - 12, -Math.PI / 6, angle2 * Math.PI / 180, false)
      context.stroke()
      context.restore()
      context.save()
      context.font = '10px Microsoft YaHei'
      context.fillStyle = '#fff'
      if (this.title.length > 4) {
        context.fillText(this.title, canvas.width / 2 - 25, canvas.height / 2 + 3)
      } else {
        context.fillText(this.title, canvas.width / 2 - 20, canvas.height / 2 + 3)
      }
      context.restore()
    }
  }
}
</script>
<style lang="scss" scoped>
.ring {
  width: 100%;
  height: 33.33333%;
  text-align: center;
}
</style>
