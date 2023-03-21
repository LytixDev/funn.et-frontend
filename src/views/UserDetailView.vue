<template>
  <div>
    <div v-if="loading">
      <h2>Loading...</h2>
    </div>
    <div v-else>
      <div v-if="user">
        <h2>{{ user.username }}</h2>
        <p>{{ user.role }}</p>
        <p>{{ user.firstName }} {{ user.lastName }}</p>
        <p>{{ user.email }}</p>
      </div>
      <div v-else>
        <h2>User Not Found</h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { PublicUserControllerService } from '@/api/services/PublicUserControllerService';
import { Ref, ref } from 'vue';
import { UserDTO } from '@/api/models/UserDTO';

const route = useRoute();
const id = route.params.id as string;
const user: Ref<UserDTO | null> = ref(null);
const loading = ref(true);

PublicUserControllerService.getUser({ username: id })
  .then((res) => {
    console.log(res);
    user.value = res;
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    loading.value = false;
  });

console.log(user);
</script>
