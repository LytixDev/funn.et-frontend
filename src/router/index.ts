import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import BasePageViewVue from '@/views/BasePageView.vue';

const routes = [
  {
    path: '/',
    name: 'base',
    component: BasePageViewVue,
    children: [
      {
        path: '',
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
        path: '/register',
        name: 'register',
        component: () => import('@/views/RegisterUserView.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
