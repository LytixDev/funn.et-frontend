<template>
  <component :is="activePageComponent" :user="user" />
  <div v-if="isMe && activePage !== 'UserEdit'">
    <button @click="activePage = 'UserEdit'">{{ $t('UserDetailView.edit') }}</button>
  </div>
</template>

<script setup lang="ts">
import UserDetail from '@/components/User/UserDetail.vue';
import UserEdit from '@/components/User/UserEdit.vue';
import { computed, ref, Ref } from 'vue';
import { useUserInfoStore } from '@/stores/UserStore';
import { useRoute } from 'vue-router';
import { UserService } from '@/api';
import { UserDTO } from '@/api/models/UserDTO';

const userStore = useUserInfoStore();
const route = useRoute();
const username = route.params.id as string;
const user = ref<UserDTO>();
user.value = await UserService.getUser({ username: username });

const activePage = ref('UserDetail');
const components: Record<string, any> = {
  UserDetail,
  UserEdit,
};

const activePageComponent = computed(() => {
  return components[activePage.value];
});

const isMe: Ref<boolean> = computed(() => {
  return username.toLowerCase() === userStore.$state.username.toLowerCase();
});
</script>
