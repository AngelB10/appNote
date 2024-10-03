import { createStore } from 'vuex';
import notes from './notes'; 
import users from './users'; 
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
  modules: {
    notes,
    users,
  },
  plugins: [createPersistedState()],
});


export default store;