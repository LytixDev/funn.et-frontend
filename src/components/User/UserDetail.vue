<template>
  <div v-if="user" class="user-profile-page form">
    <UserProfilePicture class="main-profile-picture" />
    <h2>{{ user.username }}</h2>
    <p>{{ user.role }}</p>
    <p>{{ user.firstName }} {{ user.lastName }}</p>
    <p>{{ user.email }}</p>
  </div>
</template>

<script setup lang="ts">
import { UserDTO } from '@/api/backend/models/UserDTO';
import UserProfilePicture from './UserProfilePicture.vue';
import { PropType } from 'vue';

const props = defineProps({
  user: {
    type: Object as PropType<UserDTO>,
    required: true,
  },
  activePage: {
    type: String,
  },
});
</script>

<style>
.main-profile-picture {
  width: 10em !important;
  height: 10em !important;
}

.main-profile-picture span {
  font-size: 6em !important;
}

.user-profile-page {
}
</style>
