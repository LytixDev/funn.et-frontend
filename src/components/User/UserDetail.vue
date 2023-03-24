<template>
  <div v-if="user" class="user-profile-page form">
    <UserProfilePicture class="main-profile-picture"/>
    <h2>{{ user.username }}</h2>
    <p>{{ user.role }}</p>
    <p>{{ user.firstName }} {{ user.lastName }}</p>
    <p>{{ user.email }}</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { UserService } from '@/api';
import { ref } from 'vue';
import { UserDTO } from '@/api/models/UserDTO';
import UserProfilePicture from './UserProfilePicture.vue';

const user = ref<UserDTO>();
const route = useRoute();
const id = route.params.id as string;
user.value = await UserService.getUser({ username: id });

console.log(user);
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
