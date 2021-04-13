import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Money from '../views/Money.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/money'
  },
  {
    path: '/money',
    name: 'Money',
    component: Money,
  },
  {
    path: '/labels',
    name: 'Labels',
    component: () => import(/* webpackChunkName: "Labels" */ '../views/Labels.vue')
  },
  {
    path: '/labels/edit/:id',
    name: 'LabelsEdit',
    component: () => import(/* webpackChunkName: "LabelsEdit" */ '../views/LabelEdit.vue')
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: () => import(/* webpackChunkName: "statistics" */ '../views/Statistics.vue')
  },
  {
    path: '*',
    name: 'About',
    component: () => import(/* webpackChunkName: "notFound" */ '../views/NotFound.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
