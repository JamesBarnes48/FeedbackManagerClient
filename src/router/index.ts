import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import api from '../api'

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

router.beforeEach(async (to, from, next) => {
  if(!to.meta.requiresAuth) return next();
  
  const auth = await api.checkAuth();
  if(auth.authenticated) return next();
  return next({name: 'login'});
})

export default router
