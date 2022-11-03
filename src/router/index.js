import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/movies',
      name: 'movies',
      component: () => import('../views/MoviesList.vue'),
    },
    {
      path: '/movies/:id',
      name: 'details',
      component: () => import('../views/MoviesDetails.vue'),
    }
  ]
})

export default router
