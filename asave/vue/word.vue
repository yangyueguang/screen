<template>
  <h3>鼠标点击弹出文字</h3>
</template>
<script>
export default {
  name: 'Index',
  mounted() {
    this.note()
  },
  methods: {
    note() {
      (function() {
        let a_idx = 0
        window.onclick = function(event) {
          var a = ['富强', '民主', '文明', '和谐', '自由', '平等', '公正', '法治', '爱国', '敬业', '诚信', '友善']
          let heart = document.createElement('b')
          heart.onselectstart = new Function('event.returnValue=false')
          document.body.appendChild(heart).innerHTML = a[a_idx]
          a_idx = (a_idx + 1) % a.length
          heart.style.cssText = 'position: fixed;left:-100%;'
          var f = 16
          var x = event.clientX - f / 2
          var y = event.clientY - f
          var c = randomColor()
          var a = 1
          var s = 1.2
          let timer = setInterval(function() {
            if (a <= 0) {
              document.body.removeChild(heart)
              clearInterval(timer)
            } else {
              heart.style.cssText = 'font-size:16px;cursor: default;position: fixed;color:' +
                  c + 'left:' + x + 'px;top:' + y + 'px;opacity:' + a + 'transform:scale(' +
                  s + ')'
              y--
              a -= 0.016
              s += 0.002
            }
          }, 15)
        }

        function randomColor() {
          return 'rgb(' + (~~(Math.random() * 255)) + ',' + (~~(Math.random() * 255)) + ',' + (~~(Math
            .random() * 255)) + ')'
        }
      }())
    }
  }
}
</script>
<style scoped>
</style>
