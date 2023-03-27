<template>
  <listing-form :on-submit="createListing" />
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { ListingControllerService, ListingCreateDTO } from '@/api/backend';
import ListingForm from '@/components/Listing/ListingForm.vue';
import handleUnknownError from '@/components/Exceptions/unkownErrorHandler';

const router = useRouter();

const createListing = (payload: ListingCreateDTO) => {
  ListingControllerService.createListing({ formData: payload })
    .then((response) => {
      router.push({ name: 'listing', params: { id: response.id } });
    })
    .catch((error) => {
      const message = handleUnknownError(error);
      errorStore.addError(message);
    });
};
</script>

<style scoped></style>
