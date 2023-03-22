import { useUserInfoStore } from '@/stores/UserStore';
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
        component: () => import('@/views/Listings/ListingListView.vue'),
      },
      // Routing the create listing view just temporary testing purposes
      {
        path: '/create-listing',
        name: 'create-listing',
        component: () => import('@/views/Listing/CreateListingView.vue'),
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
      {
        path: '/listing/:id',
        name: 'listing',
        component: () => import('@/views/Listing/ListingDetailView.vue'),
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

router.beforeEach((to, from, next) => {
  let user = useUserInfoStore();
  const isAuthenticated = user.isLoggedIn; // Replace with your authentication logic
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
