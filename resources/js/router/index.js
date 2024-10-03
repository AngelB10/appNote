import { createRouter, createWebHistory } from 'vue-router';
import Notes from '../views/notes.vue'; 
import Login from '../views/login.vue'; 


const routes = [ 
  {
    path: '/',
    name: 'login',
    component: Login,
    meta: { hideNav: true } 
  },
  {
    path: '/notes',
    name: 'notes',
    component: Notes,
    
  },
 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
