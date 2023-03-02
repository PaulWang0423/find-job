import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/one'
  },
  {
    path: '/one',
    name: 'one',
    component: () => import('@/views/one')
  },
  {
    path: '/two',
    name: 'two',
    component: () => import('@/views/two')
  },
  {
    path: '/three',
    name: 'three',
    component: () => import('@/views/three')
  },
  {
    path: '/four',
    name: 'four',
    component: () => import('@/views/four')
  },
  {
    path: '/five',
    name: 'five',
    component: () => import('@/views/five')
  }
]

const router = new VueRouter({
  routes
})

export default router
