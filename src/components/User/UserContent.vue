<template>
  <component :is="activePageComponent" v-model:activePage="activePage" :user="user" />
  <div v-if="isMe && activePage === 'UserDetail'">
    <button @click="activePage = 'UserEdit'">{{ $t('UserDetailView.edit') }}</button>
    <button @click="activePage = 'UserEditPassword'">{{ $t('UserDetailView.editPassword') }}</button>
  </div>
  <div v-else>
    <button @click="activePage = 'UserDetail'">{{ $t('UserDetailView.goBack') }}</button>
  </div>
</template>

<script setup lang="ts">
import UserDetail from '@/components/User/UserDetail.vue';
import UserEdit from '@/components/User/UserEdit.vue';
import UserEditPassword from './UserEditPassword.vue';
import { computed, ref, Ref, watch } from 'vue';
import { useUserInfoStore } from '@/stores/UserStore';
import { useRoute } from 'vue-router';
import { UserService } from '@/api/backend';
import { UserDTO } from '@/api/backend/models/UserDTO';

const userStore = useUserInfoStore();
const route = useRoute();
const username = route.params.id as string;
const user = ref<UserDTO>();
user.value = await UserService.getUser({ username: username });

const activePage = ref('UserDetail');
const components: Record<string, any> = {
  UserDetail,
  UserEdit,
  UserEditPassword,
};

const activePageComponent = computed(() => {
  return components[activePage.value];
});

watch(activePage, async (newVal) => {
  if (newVal === 'UserDetail') user.value = await UserService.getUser({ username: username });
});

const isMe: Ref<boolean> = computed(() => {
  return username.toLowerCase() === userStore.$state.username.toLowerCase();
});
</script>
