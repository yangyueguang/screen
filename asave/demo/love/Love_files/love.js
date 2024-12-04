(function(window) {
  function random(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1))
  }
  function bezier(cp, t) {
    let p1 = cp[0].mul((1 - t) * (1 - t))
    let p2 = cp[1].mul(2 * t * (1 - t))
    let p3 = cp[2].mul(t * t)
    return p1.add(p2).add(p3)
  }
  function inheart(x, y, r) {
    // x^2+(y-(x^2)^(1/3))^2 = 1
    // http://www.wolframalpha.com/input/?i=x%5E2%2B%28y-%28x%5E2%29%5E%281%2F3%29%29%5E2+%3D+1
    let z = ((x / r) * (x / r) + (y / r) * (y / r) - 1) * ((x / r) * (x / r) + (y / r) * (y / r) - 1) * ((x / r) * (x / r) + (y / r) * (y / r) - 1) - (x / r) * (x / r) * (y / r) * (y / r) * (y / r)
    return z < 0
  }
  let Point = function(x, y) {
    this.x = x || 0
    this.y = y || 0
  }
  Point.prototype = {
    clone: function() {
      return new Point(this.x, this.y)
    },
    add: function(o) {
      let p = this.clone()
      p.x += o.x
      p.y += o.y
      return p
    },
    sub: function(o) {
      let p = this.clone()
      p.x -= o.x
      p.y -= o.y
      return p
    },
    div: function(n) {
      let p = this.clone()
      p.x /= n
      p.y /= n
      return p
    },
    mul: function(n) {
      let p = this.clone()
      p.x *= n
      p.y *= n
      return p
    }
  }
  let Heart = function() {
    // x = 16 sin^3 t
    // y = 13 cos t - 5 cos 2t - 2 cos 3t - cos 4t
    // http://www.wolframalpha.com/input/?i=x+%3D+16+sin%5E3+t%2C+y+%3D+(13+cos+t+-+5+cos+2t+-+2+cos+3t+-+cos+4t)
    let points = []; let x; let y; let t
    for (let i = 10; i < 30; i += 0.2) {
      t = i / Math.PI
      x = 16 * Math.pow(Math.sin(t), 3)
      y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)
      points.push(new Point(x, y))
    }
    this.points = points
    this.length = points.length
  }
  Heart.prototype = {
    get: function(i, scale) {
      return this.points[i].mul(scale || 1)
    }
  }
  let Seed = function(tree, point, scale, color) {
    this.tree = tree
    var scale = scale || 1
    var color = color || '#FF0000'
    this.heart = {
      point: point,
      scale: scale,
      color: color,
      figure: new Heart()
    }
    this.cirle = {
      point: point,
      scale: scale,
      color: color,
      radius: 5
    }
  }
  Seed.prototype = {
    draw: function() {
      this.drawHeart()
      this.drawText()
    },
    addPosition: function(x, y) {
      this.cirle.point = this.cirle.point.add(new Point(x, y))
    },
    canMove: function() {
      return this.cirle.point.y < (this.tree.height + 20)
    },
    move: function(x, y) {
      this.clear()
      this.drawCirle()
      this.addPosition(x, y)
    },
    canScale: function() {
      return this.heart.scale > 0.2
    },
    setHeartScale: function(scale) {
      this.heart.scale *= scale
    },
    scale: function(scale) {
      this.clear()
      this.drawCirle()
      this.drawHeart()
      this.setHeartScale(scale)
    },
    drawHeart: function() {
      let ctx = this.tree.ctx; let heart = this.heart
      let point = heart.point; let color = heart.color
      let scale = heart.scale
      ctx.save()
      ctx.fillStyle = color
      ctx.translate(point.x, point.y)
      ctx.beginPath()
      ctx.moveTo(0, 0)
      for (let i = 0; i < heart.figure.length; i++) {
        let p = heart.figure.get(i, scale)
        ctx.lineTo(p.x, -p.y)
      }
      ctx.closePath()
      ctx.fill()
      ctx.restore()
    },
    drawCirle: function() {
      let ctx = this.tree.ctx; let cirle = this.cirle
      let point = cirle.point; let color = cirle.color
      let scale = cirle.scale; let radius = cirle.radius
      ctx.save()
      ctx.fillStyle = color
      ctx.translate(point.x, point.y)
      ctx.scale(scale, scale)
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.arc(0, 0, radius, 0, 2 * Math.PI)
      ctx.closePath()
      ctx.fill()
      ctx.restore()
    },
    drawText: function() {
      let ctx = this.tree.ctx; let heart = this.heart
      let point = heart.point; let color = heart.color
      let scale = heart.scale
      ctx.save()
      ctx.strokeStyle = color
      ctx.fillStyle = color
      ctx.translate(point.x, point.y)
      ctx.scale(scale, scale)
      ctx.moveTo(0, 0)
      ctx.lineTo(15, 15)
      ctx.lineTo(60, 15)
      ctx.stroke()
      ctx.moveTo(0, 0)
      ctx.scale(0.75, 0.75)
      ctx.font = '12px 微软雅黑,Verdana' // 字号肿么没有用? (ˉ(∞)ˉ)
      ctx.fillText('click here', 23, 16)
      ctx.restore()
    },
    clear: function() {
      let ctx = this.tree.ctx; let cirle = this.cirle
      let point = cirle.point; let scale = cirle.scale; let radius = 26
      let h
      let w = h = (radius * scale)
      ctx.clearRect(point.x - w, point.y - h, 4 * w, 4 * h)
    },
    hover: function(x, y) {
      let ctx = this.tree.ctx
      let pixel = ctx.getImageData(x, y, 1, 1)
      return pixel.data[3] === 255
    }
  }
  let Footer = function(tree, width, height, speed) {
    this.tree = tree
    this.point = new Point(tree.seed.heart.point.x, tree.height - height / 2)
    this.width = width
    this.height = height
    this.speed = speed || 2
    this.length = 0
  }
  Footer.prototype = {
    draw: function() {
      let ctx = this.tree.ctx; let point = this.point
      let len = this.length / 2
      ctx.save()
      ctx.strokeStyle = 'rgb(35, 31, 32)'
      ctx.lineWidth = this.height
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.translate(point.x, point.y)
      ctx.beginPath()
      ctx.moveTo(0, 0)
    	    ctx.lineTo(len, 0)
    	    ctx.lineTo(-len, 0)
      ctx.stroke()
      ctx.restore()
      if (this.length < this.width) {
        this.length += this.speed
      }
    }
  }
  let Tree = function(canvas, width, height, opt) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.width = width
    this.height = height
    this.opt = opt || {}
    this.record = {}
    this.initSeed()
    this.initFooter()
    this.initBranch()
    this.initBloom()
  }
  Tree.prototype = {
    initSeed: function() {
      let seed = this.opt.seed || {}
      let x = seed.x || this.width / 2
      let y = seed.y || this.height / 2
      let point = new Point(x, y)
      let color = seed.color || '#FF0000'
      let scale = seed.scale || 1
      this.seed = new Seed(this, point, scale, color)
    },
    initFooter: function() {
      let footer = this.opt.footer || {}
      let width = footer.width || this.width
      let height = footer.height || 5
      let speed = footer.speed || 2
      this.footer = new Footer(this, width, height, speed)
    },
    initBranch: function() {
      let branchs = this.opt.branch || []
      this.branchs = []
      this.addBranchs(branchs)
    },
    initBloom: function() {
      let bloom = this.opt.bloom || {}
      let cache = []
      let num = bloom.num || 500
      let width = bloom.width || this.width
      let height = bloom.height || this.height
      let figure = this.seed.heart.figure
      let r = 240; let x; let y
      for (let i = 0; i < num; i++) {
        cache.push(this.createBloom(width, height, r, figure))
      }
      this.blooms = []
      this.bloomsCache = cache
    },
    toDataURL: function(type) {
      return this.canvas.toDataURL(type)
    },
    draw: function(k) {
      let s = this; let ctx = s.ctx
      let rec = s.record[k]
      if (!rec) {
        return
      }
      let point = rec.point
      let image = rec.image
      ctx.save()
      ctx.putImageData(image, point.x, point.y)
        	ctx.restore()
    },
    addBranch: function(branch) {
        	this.branchs.push(branch)
    },
    addBranchs: function(branchs) {
      let s = this; let b; let p1; let p2; let p3; let r; let l; let c
        	for (let i = 0; i < branchs.length; i++) {
        b = branchs[i]
        p1 = new Point(b[0], b[1])
        p2 = new Point(b[2], b[3])
        p3 = new Point(b[4], b[5])
        r = b[6]
        l = b[7]
        c = b[8]
        s.addBranch(new Branch(s, p1, p2, p3, r, l, c))
      }
    },
    removeBranch: function(branch) {
      let branchs = this.branchs
        	for (let i = 0; i < branchs.length; i++) {
        		if (branchs[i] === branch) {
        			branchs.splice(i, 1)
        }
      }
    },
    canGrow: function() {
      return !!this.branchs.length
    },
    grow: function() {
      let branchs = this.branchs
    	    for (let i = 0; i < branchs.length; i++) {
        let branch = branchs[i]
        if (branch) {
          branch.grow()
        }
      }
    },
    addBloom: function(bloom) {
      this.blooms.push(bloom)
    },
    removeBloom: function(bloom) {
      let blooms = this.blooms
      for (let i = 0; i < blooms.length; i++) {
        if (blooms[i] === bloom) {
          blooms.splice(i, 1)
        }
      }
    },
    createBloom: function(width, height, radius, figure, color, alpha, angle, scale, place, speed) {
      let x, y
      while (true) {
        x = random(20, width - 20)
        y = random(20, height - 20)
        if (inheart(x - width / 2, height - (height - 40) / 2 - y, radius)) {
          return new Bloom(this, new Point(x, y), figure, color, alpha, angle, scale, place, speed)
        }
      }
    },
    canFlower: function() {
      return !!this.blooms.length
    },
    flower: function(num) {
      let s = this; let blooms = s.bloomsCache.splice(0, num)
      for (let i = 0; i < blooms.length; i++) {
        s.addBloom(blooms[i])
      }
      blooms = s.blooms
      for (let j = 0; j < blooms.length; j++) {
        blooms[j].flower()
      }
    },
    snapshot: function(k, x, y, width, height) {
      let ctx = this.ctx
      let image = ctx.getImageData(x, y, width, height)
      this.record[k] = {
        image: image,
        point: new Point(x, y),
        width: width,
        height: height
      }
    },
    setSpeed: function(k, speed) {
      this.record[k || 'move'].speed = speed
    },
    move: function(k, x, y) {
      let s = this; let ctx = s.ctx
      let rec = s.record[k || 'move']
      let point = rec.point
      let image = rec.image
      let speed = rec.speed || 10
      let width = rec.width
      let height = rec.height
      i = point.x + speed < x ? point.x + speed : x
      j = point.y + speed < y ? point.y + speed : y
      ctx.save()
      ctx.clearRect(point.x, point.y, width, height)
      ctx.putImageData(image, i, j)
        	ctx.restore()
      rec.point = new Point(i, j)
      rec.speed = speed * 0.95
      if (rec.speed < 2) {
        rec.speed = 2
      }
      return i < x || j < y
    },
    jump: function() {
      let s = this; let blooms = s.blooms
      if (blooms.length) {
        for (let i = 0; i < blooms.length; i++) {
          blooms[i].jump()
        }
      }
      if ((blooms.length && blooms.length < 3) || !blooms.length) {
        let bloom = this.opt.bloom || {}
        let width = bloom.width || this.width
        let height = bloom.height || this.height
        let figure = this.seed.heart.figure
        let r = 240; let x; let y
        for (let i = 0; i < random(1, 2); i++) {
          blooms.push(this.createBloom(width / 2 + width, height, r, figure, null, 1, null, 1, new Point(random(-100, 600), 720), random(200, 300)))
        }
      }
    }
  }
  Branch = function(tree, point1, point2, point3, radius, length, branchs) {
    this.tree = tree
    this.point1 = point1
    this.point2 = point2
    this.point3 = point3
    this.radius = radius
    this.length = length || 100
    this.len = 0
    this.t = 1 / (this.length - 1)
    this.branchs = branchs || []
  }
  Branch.prototype = {
    grow: function() {
      let s = this; let p
      if (s.len <= s.length) {
        p = bezier([s.point1, s.point2, s.point3], s.len * s.t)
        s.draw(p)
        s.len += 1
        s.radius *= 0.97
      } else {
        s.tree.removeBranch(s)
        s.tree.addBranchs(s.branchs)
      }
    },
    draw: function(p) {
      let s = this
      let ctx = s.tree.ctx
      ctx.save()
        	ctx.beginPath()
        	ctx.fillStyle = 'rgb(35, 31, 32)'
      ctx.shadowColor = 'rgb(35, 31, 32)'
      ctx.shadowBlur = 2
        	ctx.moveTo(p.x, p.y)
        	ctx.arc(p.x, p.y, s.radius, 0, 2 * Math.PI)
        	ctx.closePath()
        	ctx.fill()
        	ctx.restore()
    }
  }
  Bloom = function(tree, point, figure, color, alpha, angle, scale, place, speed) {
    this.tree = tree
    this.point = point
    this.color = color || 'rgb(255,' + random(0, 255) + ',' + random(0, 255) + ')'
    this.alpha = alpha || random(0.3, 1)
    this.angle = angle || random(0, 360)
    this.scale = scale || 0.1
    this.place = place
    this.speed = speed
    this.figure = figure
  }
  Bloom.prototype = {
    setFigure: function(figure) {
      this.figure = figure
    },
    flower: function() {
      let s = this
      s.draw()
      s.scale += 0.1
      if (s.scale > 1) {
        s.tree.removeBloom(s)
      }
    },
    draw: function() {
      let s = this; let ctx = s.tree.ctx; let figure = s.figure
      ctx.save()
      ctx.fillStyle = s.color
      ctx.globalAlpha = s.alpha
      ctx.translate(s.point.x, s.point.y)
      ctx.scale(s.scale, s.scale)
      ctx.rotate(s.angle)
      ctx.beginPath()
      ctx.moveTo(0, 0)
      for (let i = 0; i < figure.length; i++) {
        let p = figure.get(i)
        ctx.lineTo(p.x, -p.y)
      }
      ctx.closePath()
      ctx.fill()
      ctx.restore()
    },
    jump: function() {
      let s = this; let height = s.tree.height
      if (s.point.x < -20 || s.point.y > height + 20) {
        s.tree.removeBloom(s)
      } else {
        s.draw()
        s.point = s.place.sub(s.point).div(s.speed).add(s.point)
        s.angle += 0.05
        s.speed -= 1
      }
    }
  }
  window.random = random
  window.bezier = bezier
  window.Point = Point
  window.Tree = Tree
})(window)
