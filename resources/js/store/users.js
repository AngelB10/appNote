import requestAxios from '../axios';

export default { 
  state: {
      user: null, 
      isAuthenticated: false,
      token: null,  
  },

  mutations: {
      setUser(state, user) {
          state.user = user;
          state.isAuthenticated = true; 
      },
      setToken(state, token) { 
          state.token = token;
          state.isAuthenticated = !!token; 
      },
      logout(state) { 
          state.user = null;
          state.token = null;
          state.isAuthenticated = false; 
      }
  },

  actions: {
      async login({ commit }, credentials) {
          try {
              const response = await requestAxios.post('/login', credentials);
              commit('setUser', response.data.user);
              commit('setToken', response.data.token);
              localStorage.setItem('token', response.data.token);
              return response; 
          } catch (error) {
              console.error('Error logging in:', error);
              throw error; // Lanza el error para manejarlo en el componente
          }
      },
      async register({ commit }, credentials) {
          try {
              const response = await requestAxios.post('/register', credentials);
              commit('setUser', response.data.user);
              commit('setToken', response.data.token);
              localStorage.setItem('token', response.data.token); 
              return response.data; 
          } catch (error) {
              console.error('Error registering:', error);
              throw error; // Lanza el error para manejarlo en el componente
          }
      },

      async fetchUserData({ state, commit }) {
          try {
              const response = await requestAxios.get('/user', {
                  headers: {
                      Authorization: `Bearer ${state.token}` 
                  }
              });
              commit('setUser', response.data); // Actualiza el estado con los datos del usuario
              return response.data; 
          } catch (error) {
              console.error('Error fetching user data:', error);
              throw error; // Lanza el error para manejarlo en el componente
          }
      },
      logout({ commit }) {
          localStorage.removeItem('token'); 
          commit('logout');
      },
  },

  getters: {    
      currentUser: (state) => state.user,
      isAuthenticated: (state) => state.isAuthenticated, 
      userId: (state) => state.user ? state.user.id : null
  }  
}
