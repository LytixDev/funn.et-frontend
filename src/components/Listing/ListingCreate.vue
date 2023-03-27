<template>
  <listing-form :on-submit="createListing" />
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { ListingControllerService, ListingCreateDTO } from '@/api/backend';
import ListingForm from '@/components/Listing/ListingForm.vue';
import handleUnknownError from '@/components/Exceptions/unkownErrorHandler';
import { useErrorStore } from '@/stores/ErrorStore';

const router = useRouter();
const errorStore = useErrorStore();

const createListing = (payload: ListingCreateDTO) => {
  ListingControllerService.createListing({ formData: payload })
    .then((response) => {
      router.push({ name: 'listing', params: { id: response.id } });
    })
    .catch((error) => {
      if (error.status === 401) {
        router.push({ name: 'login' });
      }
      const message = handleUnknownError(error);
      errorStore.addError(message);
    });
};
</script>

<style scoped></style>
