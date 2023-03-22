import { OpenAPI } from '@/api';
import { defineStore } from 'pinia';

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
  },
});
