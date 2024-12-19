// 确保路由配置正确
{
  path: '/personality-test',
  name: 'PersonalityTest',
  component: () => import('@/views/PersonalityTest.vue'),
  meta: {
    requiresAuth: false // 根据需求设置是否需要登录
  }
} 

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/login')
  } else {
    next()
  }
}) 