import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  // Routing the create listing view just temporary testing purposes
  {
    path: '/create-listing',
    name: 'create-listing',
    component: () => import('@/views/CreateListing.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/RegisterUserView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
