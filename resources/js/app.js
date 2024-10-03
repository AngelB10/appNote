import './bootstrap'; 
import { createApp } from 'vue'; 
import '../css/app.css'; 
import App from './App.vue'; 
import router from './router'; 
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';


library.add(fas);


const app = createApp(App); 
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(store);
app.use(router); 
app.mount('#app'); 
