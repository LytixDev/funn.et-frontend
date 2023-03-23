import { OpenAPI } from '@/api';
import Cookies from 'js-cookie';
import { defineStore } from 'pinia';

const cookiesStorage: Storage = {
  setItem(key, state) {
    return Cookies.set(key, state, { expires: 3 });
  },
  getItem(key) {
    OpenAPI.TOKEN = JSON.parse(Cookies.get(key) || '').accessToken;
    return Cookies.get(key) || '';
  },
  length: 0,
  clear: function (): void {
    Cookies.remove('userInfo');
  },
  key: function (index: number): string | null {
    throw new Error('Function not implemented.');
  },
  removeItem: function (key: string): void {
    throw new Error('Function not implemented.');
  },
};

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
      userinfo.accessToken && (OpenAPI.TOKEN = this.$state.accessToken);
      userinfo.role && (this.$state.role = userinfo.role);
    },
    clearUserInfo() {
      this.$state.username = '';
      this.$state.accessToken = '';
      this.$state.role = '';
      OpenAPI.TOKEN = undefined;
    },
  },
  getters: {
    isLoggedIn(): boolean {
      return this.accessToken !== '';
    },
  },
  persist: {
    enabled: true,
    strategies: [{ key: 'userInfo', storage: cookiesStorage }],
  },
});
