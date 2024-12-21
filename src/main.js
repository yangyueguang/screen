import Vue from 'vue'
import App from './App'
import router from './router'
Vue.config.productionTip = false
new Vue({router, render: h => h(App)}).$mount('#app')
let Point = function(x, y, z, r, c) {
  this.x = x || 0
  this.y = y || 0
  this.z = z || 0
  this.a = 1
  this.color = c || ''
  this.radius = r || 0
  this.vx = 0
  this.vy = 0
}
let color = function(a = 'ff') {
  let r = Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
  let g = Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
  let b = Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
  return `#${r}${g}${b}${a}`
}
