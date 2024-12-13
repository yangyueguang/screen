(() => {
  window.addEventListener('resize', resizeCanvas, false)

  window.addEventListener('DOMContentLoaded', onLoad, false)

  window.requestAnimationFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60)
        }

  let canvas
  let ctx
  let w
  let h
  let rockets = []
  let particles = []
  let counter = 0

  function onLoad() {
    canvas = document.querySelector('canvas')
    ctx = canvas.getContext('2d')
    resizeCanvas()

    window.requestAnimationFrame(loop)
  }

  function resizeCanvas() {
    if (canvas) {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
  }

  function loop() {
    ctx.globalCompositeOperation = 'source-over'
    ctx.fillStyle = 'rgba(0,0,0,0.1)'
    ctx.fillRect(0, 0, w, h)
    ctx.globalCompositeOperation = 'lighter'
    counter += 1
    !(counter % 30) && rockets.push(new Rocket())
    rockets.forEach((r, i) => {
      r.draw()
      r.update()
      if (r.vy > 0) {
        r.explode()
        rockets.splice(i, 1)
      }
    })
    particles.forEach((p, i) => {
      p.draw()
      let flag = p.move()
      !flag && particles.splice(i, 1)
    })
    window.requestAnimationFrame(loop)
  }

  function Rocket() {
    this.x = Math.random() * (w - 200) + 100
    this.y = h
    this.hue = Math.floor(Math.random() * 360)
    let angle = Math.random() * Math.PI / 4 - Math.PI / 6
    let vbase = 6 + Math.random() * 7
    this.vx = Math.sin(angle) * vbase
    this.vy = -Math.cos(angle) * vbase
  }
  Rocket.prototype = {
    draw: function() {
      ctx.save()
      ctx.translate(this.x, this.y)
      ctx.rotate(Math.atan2(this.vy, this.vx) + Math.PI / 2)
      ctx.fillStyle = `hsl(${this.hue}, 100%, 50%)`
      ctx.fillRect(0, 0, 5, 10)
      ctx.restore()
    },
    update: function() {
      this.x = this.x + this.vx
      this.y = this.y + this.vy
      this.vy += 0.1
    },
    explode: function() {
      let num = Math.random() * 50 + 100
      for (let i = 0; i < num; i++) {
        let p = new Particle(this.x, this.y, this.hue)
        particles.push(p)
      }
    }
  }

  function Particle(x, y, hue) {
    this.x = x
    this.y = y
    this.hue = hue
    this.alpha = Math.random() * 0.5 + 0.5
    this.r = Math.random() * 4 + 1
    let angle = Math.random() * 2 * Math.PI
    let vbase = 1 + Math.random() * 6
    this.vx = Math.cos(angle) * vbase
    this.vy = Math.sin(angle) * vbase
  }
  Particle.prototype = {
    gravity: 0.05,
    lightness: 50,
    move: function() {
      this.x += this.vx
      this.vy += this.gravity
      this.y += this.vy
      this.alpha -= 0.01
      if (this.x <= -2 * this.r || this.x >= screen.width || this.y >= screen.height || this.alpha <= 0) {
        return false
      }
      return true
    },
    draw: function() {
      ctx.save()
      ctx.beginPath()
      ctx.translate(this.x, this.y)
      ctx.arc(0, 0, this.r, 0, Math.PI * 2)
      ctx.fillStyle = `hsl(${this.hue}, 100%, ${this.lightness}%)`
      ctx.globalAlpha = this.alpha
      ctx.closePath()
      ctx.fill()
      ctx.restore()
    }
  }
})()
