import Vue from 'vue';
import Router from 'vue-router';
import Clocks from '@/components/Clocks';
import UpdateModal from '@/components/UpdateModal';
import CreateModal from '@/components/CreateModal';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'root',
      component: Clocks,
      children: [
        {
          path: 'update/:id',
          component: UpdateModal,
        },
        {
          path: 'create-clock',
          component: CreateModal,
        }
      ]
    },
  ],
});
