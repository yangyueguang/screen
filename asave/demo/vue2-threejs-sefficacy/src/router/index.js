import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import { linkList } from '@/router/link.js'
let routes = []
function initRouter() {
  routes.push(
    {
      path: '/',
      name: 'Index',
      component: resolve => (require([`@/views/Index/Index.vue`], resolve))
    }
  )
  // TODO 只处理一级路由
  linkList.forEach(item => {
    let pathSplits = item.path.split('/')
    if (pathSplits.length < 2) {
      return
    }
    routes.push(
      {
        path: `/${pathSplits[1]}`,
        name: pathSplits[1],
        component: resolve => (require([`@/views/${pathSplits[1]}/Index.vue`], resolve))
      }
    )
  })
}
// let files = require.context('../views', true, /\.vue$/)
// function initRouter() {
//   // TODO 只处理一级路由
//   files.keys().forEach(viewPath => {
//     let path = files(viewPath).default.__file;
//     let pathSplits = path.split('/')
//     if (pathSplits.length < 3) {
//       return
//     }
//     if (pathSplits[2] === 'Index') {
//       routes.push(
//         {
//           path: '/',
//           name: pathSplits[2],
//           component: resolve => (require([`@/views/${pathSplits[2]}/Index.vue`], resolve))
//         }
//       )
//     } else {
//       routes.push(
//         {
//           path: `/${pathSplits[2]}`,
//           name: pathSplits[2],
//           component: resolve => (require([`@/views/${pathSplits[2]}/Index.vue`], resolve))
//         }
//       )
//     }
//   })
// }
initRouter()
let router = new VueRouter({
  mode: 'hash',
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
