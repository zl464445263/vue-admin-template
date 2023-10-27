//需要重定向的路由

const redirectRouters = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '',
    redirect: '/home',
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404',
  },
]
export default redirectRouters
