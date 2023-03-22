import { defineStore } from 'pinia';
import Cookies from 'js-cookie';

const cookiesStorage: Storage = {
  setItem(key, item) {
    return Cookies.set(key, item, { expires: 3 });
  },
  getItem(key) {
    return JSON.stringify({
      accessToken: Cookies.get(key),
    });
  },
  clear: () => {
    throw new Error('Function not implemented.');
  },
  key: () => {
    throw new Error('Function not implemented.');
  },
  removeItem: () => {
    throw new Error('Function not implemented.');
  },
  length: 0
}

export type UserStoreInfo = {
  username?: string;
  accessToken?: string;
  role?: string;
};

export const useUserInfoStore = defineStore('UserInfoStore', {
  state: () => ({
    username: '',
    accessToken: '',
    role: '',
  }),
  actions: {
    setUserInfo(userinfo: UserStoreInfo) {
      userinfo.username && (this.$state.username = userinfo.username);
      userinfo.accessToken && (this.$state.accessToken = userinfo.accessToken);
      userinfo.role && (this.$state.role = userinfo.role);
    },
    clearUserInfo() {
      localStorage.removeItem('username');
      localStorage.removeItem('token');
      this.$state.username = '';
      this.$state.token = '';
    },
  },
  getters: {
    isLoggedIn(): boolean {
      return this.accessToken !== '';
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: cookiesStorage,
      },
    ],
  },
})  




