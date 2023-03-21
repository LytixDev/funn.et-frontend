import { defineStore } from 'pinia';

export type UserStoreInfo = {
  username?: string;
  token?: string;
};

export const useUserInfoStore = defineStore('UserInfoStore', {
  state: () => ({
    username: localStorage.getItem('username') ?? '',
    token: localStorage.getItem('token') ?? '',
  }),
  actions: {
    setUserInfo(userinfo: UserStoreInfo) {
      localStorage.setItem('username', userinfo.username ?? this.$state.username);
      localStorage.setItem('token', userinfo.token ?? this.$state.token);
      this.$state.username = localStorage.getItem('username') ?? '';
      this.$state.token = localStorage.getItem('token') ?? '';
    },
  },
});
