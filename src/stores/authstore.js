import {defineStore} from 'pinia';

export const useAuthStore = defineStore('authstore',{
  state: () => ({
    user:{
    username: null,
    token: null,
    isAuthenticated:false,
    }
  }),
  actions: {
    setToken(user, token) {
        this.user.username=user;
        this.user.token=token;
        this.user.isAuthenticated=true;

        localStorage.setItem('token', token);
        localStorage.setItem('username', user);

    },

    removeToken() {
        this.user.username=null;
        this.user.token=null;
        this.user.isAuthenticated=false

        localStorage.removeItem('token');
        localStorage.removeItem('username');
        
    }

    
  },
});
