<template>
  <listing-form :on-submit="createListing" />
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { ListingControllerService, ListingCreateDTO } from '@/api/backend';
import ListingForm from '@/components/Listing/ListingForm.vue';
import handleUnknownError from '@/components/Exceptions/unkownErrorHandler';
import { useErrorStore } from '@/stores/ErrorStore';
import { useUserInfoStore } from '@/stores/UserStore';

const router = useRouter();
const errorStore = useErrorStore();
const userStore = useUserInfoStore();

const createListing = (payload: ListingCreateDTO) => {
  ListingControllerService.createListing({ formData: payload })
    .then((response) => {
      router.push({ name: 'listing', params: { id: response.id } });
    })
    .catch((error) => {
      if (error.status === 401) {
        setTimeout(() => {
          router.push({ name: 'login' });
          userStore.clearUserInfo();
        }, 100);
      }
      const message = handleUnknownError(error);
      errorStore.addError(message);
    });
};
</script>

<style scoped></style>
