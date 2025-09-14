import { defineStore } from 'pinia'
export const useAuthStore = defineStore('auth', {
  state: () => ({ token: localStorage.getItem('token') || '', user: null }),
  getters: { isAuthed: (s)=>!!s.token },
  actions: {
    setToken(t){ this.token=t; localStorage.setItem('token', t) },
    setUser(u){ this.user=u },
    logout(){ this.token=''; this.user=null; localStorage.removeItem('token') }
  }
})
