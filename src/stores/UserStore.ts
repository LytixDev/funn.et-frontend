import { defineStore } from 'pinia';

export type UserStoreInfo = {
    username?: string;
    token?: string;
}

export const useUserInfoStore = defineStore('UserInfoStore', {
  state: () => ({
    username: '',
    token: '',
  }),
  actions: {
    setUserInfo(userinfo: UserStoreInfo) {
        this.$state.username = userinfo.username ?? this.$state.username;
        this.$state.token = userinfo.token ?? this.$state.token;
    }
  },
});
