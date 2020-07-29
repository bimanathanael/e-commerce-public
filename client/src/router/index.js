import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Cart from '../views/Cart.vue';
import DeleteCart from '../components/DeleteCart.vue';
import TransactionHist from '../views/TransactionHist.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
  },
  {
    path: '/transactionHist',
    name: 'TransactionHist',
    component: TransactionHist,
  },
  {
    path: '/deleteCart/:cartId',
    name: 'DeleteCart',
    component: DeleteCart,
    props: true,
  },
  {
    path: '/register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (Register.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Register" */ '../views/Register.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (Login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if ((to.name === 'Login' || to.name === 'Register') && localStorage.access_token) {
    next({ name: 'Home' });
  } else if ((to.name === 'TransactionHist' || to.name === 'Cart') && !localStorage.access_token) {
    next({ name: 'Home' });
  } else next();
});

export default router;
