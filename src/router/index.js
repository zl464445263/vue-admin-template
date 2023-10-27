import { createRouter, createWebHashHistory } from 'vue-router'
import fileRouters from './file.js'
import redirectRouters from './redirect.js'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [...fileRouters, ...redirectRouters],
})

//路由白名单，不需要做登录校验
router.whiteList = ['/login', '/404']

// 路由守卫，判断路由跳转的时候是否符合条件
// router.beforeEach((to, from, next) => {
//   document.title = to.meta.title
//   const whiteList = router.whiteList || []
//   const userSession = sessionStorage.getItem('userUid')
//   //登陆过存储了token信息可以跳转 否则就去登录页面
//   if (userSession) {
//     next()
//   } else if (whiteList.includes(to.path)) {
//     next()
//   } else {
//     if (to.path === '/login') {
//       next()
//     } else {
//       next('/login')
//     }
//   }
// })

export default router
