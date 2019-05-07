import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Ad from '../components/Ads/Ad'
import NotFound from '../components/Ads/NotFound'
import OneCategory from '../components/Ads/OneCategory'
import List from '../components/Ads/AdList'
import OrderAd from '../components/Ads/OrderAd'
import Login from '../components/Auth/Login'
import Registration from '../components/Auth/Registration'
import Orders from '../components/User/Orders'
import Admin from '../components/User/Admin'
import AllOrdersCompany from '../components/Ads/AllOrdersCompany'
import AuthGuard from './authGuard'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '',
      name: 'home',
      component: Home
    },
    {
      path: '/ad/:id',
      props: true,
      name: 'ad',
      component: Ad,
    },
    {
      path: '/OneCategory/:id',
      props: true,
      name: 'OneCategory',
      component: OneCategory,
    },
    {
      path: '/list',
      name: 'list',
      component: List,
      // beforeEnter: AuthGuard
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/registration',
      name: 'reg',
      component: Registration
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders,
      beforeEnter: AuthGuard
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      beforeEnter: AuthGuard
    },
    {
      path: '/OrderAd/:id',
      props: true,
      name: 'orderAd',
      component: OrderAd,
      beforeEnter: AuthGuard
    },
    {
      path: '/allOrder/:id',
      props: true,
      name: 'allOrdersCompany',
      component: AllOrdersCompany,
      beforeEnter: AuthGuard
    },
    {
      path: '*',
      props: true,
      name: 'NotFound',
      component: NotFound,
    },
  ],
  mode: 'history'
})




