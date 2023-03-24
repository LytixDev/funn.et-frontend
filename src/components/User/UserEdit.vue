<template>
  {{ user.username }}
</template>

<script setup lang="ts">
import { UserDTO } from '@/api/models/UserDTO';
import { PropType } from 'vue';

const props = defineProps({
  user: {
    type: Object as PropType<UserDTO>,
    required: true,
  },
});
</script>
