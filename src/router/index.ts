import {createRouter, createWebHistory} from "vue-router";

const routes = [
  {
    path: '/',
    component: () => import('@/pages/Main.vue')
  },
  {
    path: '/posts',
    component: () => import('@/pages/UserPage.vue')
  },
  {
    path: '/about',
    component: () => import('@/pages/About.vue')
  },
  {
    path: '/posts/:id',
    component: () => import('@/pages/PostIdPage.vue')
  },
  {
    path: '/store',
    component: () => import('@/pages/PostPageWithStore.vue')
  },
  {
    path: '/composition',
    component: () => import('@/pages/PostPageCompositionApi.vue')
  },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
