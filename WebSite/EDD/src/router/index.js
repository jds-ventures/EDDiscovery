import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Status from '@/components/Status'
import Grid from '@/components/Grid'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/status',
      name: 'Status',
      component: Status
    },
    {
      path: '/grid',
      name: 'Grid',
      component: Grid
    }
  ]
})
