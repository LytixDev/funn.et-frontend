<template>
  <div v-if="user">
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

const user = ref<UserDTO>();
const route = useRoute();
const id = route.params.id as string;
user.value = await UserService.getUser({ username: id });

console.log(user);
</script>
