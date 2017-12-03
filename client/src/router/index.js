import Vue from 'vue';
import Router from 'vue-router';
import Clocks from '@/components/Clocks';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: Clocks,
    },
  ],
});
