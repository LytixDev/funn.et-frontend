import { defineStore } from "pinia";

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
  },
})  




