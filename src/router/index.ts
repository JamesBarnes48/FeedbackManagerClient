import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {requiresAuth: true}
    }
  ],
})

router.beforeEach((to, from, next) => {
  const auth = false; //say we are authed for now
  if(to.meta.requiresAuth && !auth) next({name: 'login'})
  else next();
})

export default router
