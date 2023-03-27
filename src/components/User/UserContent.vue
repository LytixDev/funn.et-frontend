<template>
  <div class="user-details-page">
    <component :is="activePageComponent" v-model:activePage="activePage" :user="user" />
    <div v-if="isMe && activePage === 'UserDetail'" class="utility-buttons">
      <button @click="activePage = 'UserEdit'">{{ $t('UserDetailView.edit') }}</button>
      <button @click="activePage = 'UserEditPassword'">{{ $t('UserDetailView.editPassword') }}</button>
    </div>
    <div v-else>
      <button @click="activePage = 'UserDetail'">{{ $t('UserDetailView.goBack') }}</button>
    </div>
  </div>
  <Suspense v-if="isMe && activePage === 'UserDetail'">
    <template #fallback>
      <h2>{{ $t('UserDetailView.loading') }}</h2>
    </template>
    <user-detail-accordion :username="username" />
  </Suspense>
</template>

<script setup lang="ts">
import UserDetailAccordion from '@/components/User/UserDetailAccordion.vue';
import UserDetail from '@/components/User/UserDetail.vue';
import UserEdit from '@/components/User/UserEdit.vue';
import UserEditPassword from './UserEditPassword.vue';
import { computed, ref, Ref, watch } from 'vue';
import { useUserInfoStore } from '@/stores/UserStore';
import { useRoute, useRouter } from 'vue-router';
import { UserService } from '@/api/backend';
import { UserDTO } from '@/api/backend/models/UserDTO';
import handleUnknownError from '@/components/Exceptions/unkownErrorHandler';
import { useErrorStore } from '@/stores/ErrorStore';

const errorStore = useErrorStore();
const router = useRouter();

const userStore = useUserInfoStore();
const route = useRoute();
const username = route.params.id as string;
const user = ref<UserDTO>();
try {
  user.value = await UserService.getUser({ username: username });
} catch (error: any) {
  if (error.status === 401) {
    setTimeout(() => {
      router.push({ name: 'login' });
      userStore.clearUserInfo();
    }, 100);
  }
  const message = handleUnknownError(error);
  errorStore.addError(message);
}

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

<style scoped>
.user-details-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: min(100%, 1300px);
}
</style>
