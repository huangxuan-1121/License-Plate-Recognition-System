import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import Index from '@/pages/Index'
import Hello from '@/pages/Hello'

import Copy from '@/copys/Copy'
import Testing from '@/copys/Testing'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      redirect: '/hello'
    },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/copy',
      name: 'Copy',
      component: Copy
    },
    {
      path: '/testing',
      name: 'Testing',
      component: Testing
    },

  ]
})
