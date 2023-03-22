import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'base',
    component: () => import('@/views/BasePageView.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/HomeView.vue'),
      },
      {
        path: '/create-listing',
        name: 'create-listing',
        component: () => import('@/views/CreateListing.vue'),
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('@/views/Authenitcation/RegisterUserView.vue'),
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Authenitcation/LoginUserView.vue'),
      },
      {
        path: '/signout',
        name: 'signout',
        component: () => import('@/views/Authenitcation/SignoutUserView.vue'),
      },
      {
        path: '/user/:id',
        name: 'user',
        component: () => import('@/views/UserDetailView.vue'),
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
