(() => {
 
  window.addEventListener('DOMContentLoaded', onLoad, false)
 
  let c1
  let ctx1
  let c2
  let ctx2
  let c3
  let ctx3
  let w
  let h
  let rockets = []
  let particles = []
  let targets = []
  let textWidth
  let fontSize
  let fidelity = 3
  let firePoint = 30
  let fireNum = Math.random() * 70 + 80
  let counter = 0
 
  function onLoad() {
    [c1, c2, c3] = document.querySelectorAll('canvas');
    [ctx1, ctx2, ctx3] = [c1, c2, c3].map(c => c.getContext('2d'))
    w = c1.width = c3.width = window.innerWidth
    h = c1.height = c3.height = window.innerHeight
    layoutText()
    computeImgTarget()
    window.requestAnimationFrame(loop)
  }
  function layoutText() {
    let text = 'RoundTable'
   
    fontSize = 200
    textWidth = 99999999
    while (textWidth > window.innerWidth) {
      ctx2.font = `900 ${fontSize--}px Arial`
      textWidth = ctx2.measureText(text).width
    }
    c2.width = textWidth
    c2.height = fontSize * 1.5
    ctx2.fillStyle = '#000'
    ctx2.font = `900 ${fontSize}px Arial`
    ctx2.fillText(text, 0, fontSize)
    ctx3.fillStyle = '#FFF'
    ctx3.shadowColor = '#FFF'
    ctx3.shadowBlur = 25
  }
  function computeImgTarget() {
    let imgData = ctx2.getImageData(0, 0, c2.width, c2.height)
    for (let i = 0, max = imgData.data.length; i < max; i += 4) {
      let alpha = imgData.data[i + 3]
      let x = Math.floor(i / 4) % imgData.width
      let y = Math.floor(i / 4 / imgData.width)
      if (alpha && x % fidelity === 0 && y % fidelity === 0) {
        targets.push({ x, y })
      }
    }
    ctx2.clearRect(0, 0, c2.width, c2.height)
  }
 
  function loop() {
    ctx1.globalCompositeOperation = 'source-over'
    ctx1.fillStyle = 'rgba(0,0,0,0.1)'
    ctx1.fillRect(0, 0, w, h)
   
    ctx1.globalCompositeOperation = 'lighter'
    counter += 1
    !(counter % firePoint) && rockets.push(new Rocket())
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
      p.move()
      if (p.vx === 0 && (p.lightness >= 99 || p.timer >= p.ttl)) {
        ctx3.fillRect(p.target.x, p.target.y, fidelity + 1, fidelity + 1)
        particles.splice(i, 1)
      }
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
      ctx1.save()
      ctx1.translate(this.x, this.y)
      ctx1.rotate(Math.atan2(this.vy, this.vx) + Math.PI / 2)
      ctx1.fillStyle = `hsl(${this.hue}, 100%, 50%)`
      ctx1.fillRect(0, 0, 5, 10)
      ctx1.restore()
    },
    update: function() {
      this.x = this.x + this.vx
      this.y = this.y + this.vy
      this.vy += 0.1
    },
    explode: function() {
      for (let i = 0; i < fireNum; i++) {
        let p = new Particle(this.x, this.y, this.hue)
        particles.push(p)
      }
    }
  }
 
  function Particle(x, y, hue) {
    this.x = x
    this.y = y
    this.hue = hue
    this.lightness = 50
   
   
    this.r = Math.random() * 4 + 1
    let angle = Math.random() * 2 * Math.PI
    let vbase = 1 + Math.random() * 6
    this.vx = Math.cos(angle) * vbase
    this.vy = Math.sin(angle) * vbase
    let idx = Math.floor(Math.random() * targets.length)
    let p = targets[idx]
    targets.splice(idx, 1)
    this.target = { x: p.x + c1.width / 2 - textWidth / 2, y: p.y += c1.height / 2 - fontSize / 2 }
  }
  Particle.prototype = {
    gravity: 0.05,
    move: function() {
      if (this.target) {
        this.arriveTarget()
      } else {
        this.vy += this.gravity
        this.lightness -= 1
        if (this.y >= screen.height || this.lightness <= 0) {
          particles.forEach((p, i) => {
            p === this && particles.splice(i, 1)
          })
        }
      }
      this.x += this.vx
      this.y += this.vy
    },
    draw: function() {
      ctx1.save()
      ctx1.beginPath()
      ctx1.arc(this.x, this.y, this.r, 0, Math.PI * 2)
      ctx1.fillStyle = `hsl(${this.hue}, 100%, ${this.lightness}%)`
     
      ctx1.closePath()
      ctx1.fill()
      ctx1.restore()
    },
    arriveTarget() {
      let dx = this.target.x - this.x
      let dy = this.target.y - this.y
      let distance = Math.sqrt(dx * dx + dy * dy)
      let angle = Math.atan2(dy, dx)
      let tx = Math.cos(angle) * 5
      let ty = Math.sin(angle) * 5
      this.r = lerp(this.r, 3, 0.05)
      if (distance < 5) {
        this.lightness = lerp(this.lightness, 100, 0.01)
        this.vx = this.vy = 0
        this.x = lerp(this.x, this.target.x + fidelity / 2, 0.05)
        this.y = lerp(this.y, this.target.y + fidelity / 2, 0.05)
        this.timer += 1
      } else if (distance < 10) {
        this.lightness = lerp(this.lightness, 100, 0.01)
        this.vx = lerp(this.vx, tx, 0.1)
        this.vy = lerp(this.vy, ty, 0.1)
        this.timer += 1
      } else {
        this.vx = lerp(this.vx, tx, 0.02)
        this.vy = lerp(this.vy, ty, 0.02)
      }
    }
  }
 
  let lerp = (from, to, t) => Math.abs(to - from) > 0.1 ? from + t * (to - from) : to
})()
