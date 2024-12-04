/* 功能：星空特效
 * 完成时间：2021/2/14
 * 作者：妙善
 * 博客：https://blog.csdn.net/qq_35068659/article/details/113808224
 */
let cirle_canvas = document.getElementById('circle_canvas')
let cirle_ctx = cirle_canvas.getContext('2d')
cirle_canvas.width = window.innerWidth
cirle_canvas.height = window.innerHeight * 0.4
let width = cirle_canvas.width
let height = cirle_canvas.height
let spotTotal = 1000
function Spot(x, y, r, color, speed, sOffset, alp, offset, shadColor, rad) {
  this.x = x
  this.y = y
  this.r = r
  this.color = color
  this.speed = speed
  this.offset = offset
  this.alp = alp
  this.shadSize = this.r
  this.shadColor = shadColor
  this.rad = rad
  this.sOffset = sOffset
  spotArr.push(this)
}
Spot.prototype.draw = function() {
  cirle_ctx.fillStyle = this.color
  cirle_ctx.globalAlpha = this.alp
  cirle_ctx.shadowColor = this.shadColor
  cirle_ctx.shadowBlur = this.shadSize
  cirle_ctx.beginPath()
  cirle_ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false)
  cirle_ctx.fill()
}
Spot.prototype.update = function() {
  this.x = Math.cos(this.rad) * this.speed
  this.y = Math.sin(this.rad) * this.speed
  this.alp += this.offset
  this.speed += this.sOffset
}
function getRandom(min, max) {
  return (Math.random() * (max - min) + min)
}
function initSpot() {
  let r = getRandom(0.1, 0.9)
  var x = 1
  var y = 1
  let speed = getRandom(1, width / 2)
  let color = 'white'
  let alp = getRandom(0.1, 0.9)
  let offset = getRandom(0.01, 0.02)
  let shadColor = 'aqua'
  let rad = (getRandom(0, 360) * Math.PI) / 180
  let sOffset = getRandom(0.1, 2)
  new Spot(x, y, r, color, speed, sOffset, alp, offset, shadColor, rad)
}
let spotArr = []
let keyDown = false
function initArr(total) {
  for (let i = 0; i < total; i++) {
    initSpot()
  }
}
cirle_canvas.onmousedown = function() {
  keyDown = true
}
cirle_canvas.onmouseup = function() {
  keyDown = false
}
cirle_canvas.onmousemove = function(e) {
  var x = e.offsetX
  var y = e.offsetY
  for (let i = 0; i < spotArr.length; i++) {
    if (keyDown === true) {
      spotArr[i].sOffset -= 2
      if (Math.abs(spotArr[i].x - x) < 100 &&
				Math.abs(spotArr[i].y - y) < 100) {
        spotArr[i].alp = 1
      }
    }
  }
}
initArr(spotTotal)
cirle_ctx.translate(width / 2, height / 2)
setInterval(function() {
  if (keyDown === false) {
    cirle_ctx.clearRect(-width / 2, -height / 2, width, height)
  }
  for (let i = 0; i < spotArr.length; i++) {
    spotArr[i].update()
    spotArr[i].draw()
    if (spotArr[i].x > width / 2 || spotArr[i].x < -width / 2 ||
			spotArr[i].y > height / 2 || spotArr[i].y < -height / 2) {
      spotArr.splice(i, 1)
      initSpot()
    }
    if (spotArr[i].alp < 0 || spotArr[i].alp > 1) {
      spotArr[i].offset = -spotArr[i].offset
    }
  }
  if (keyDown === true) {
    cirle_ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
    cirle_ctx.rect(-width / 2, -height / 2, width, height)
    cirle_ctx.fill()
  }
}, 30)
