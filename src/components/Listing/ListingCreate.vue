<template>
  <listing-form :on-submit="createListing" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { ListingControllerService, ListingCreateDTO } from '@/api/backend';
import ListingForm from '@/components/Listing/ListingForm.vue';

const router = useRouter();
const errorMessage = ref('');

const createListing = (payload: ListingCreateDTO) => {
  ListingControllerService.createListing({ formData: payload })
    .then((response) => {
      router.push({ name: 'listing', params: { id: response.id } });
    })
    .catch((error) => {
      errorMessage.value = error.message;
    });
};
</script>

<style scoped>

</style>
