<template>
  <div>
    <listing-list :listings="listings" />
  </div>
  <error-box :error="errorMessage" />
</template>

<script setup lang="ts">
import { ListingDTO, ListingControllerService, ApiError } from '@/api/backend';
import ListingList from '@/components/Listing/ListingList.vue';
import { AxiosError } from 'axios';
import { ref } from 'vue';
import ErrorBox from '../Exceptions/ErrorBox.vue';

const errorMessage = ref('');
const listings = ref([] as ListingDTO[] | undefined);

try {
  listings.value = await ListingControllerService.getFavoriteListings();
} catch (error) {
  if (error instanceof AxiosError) {
    errorMessage.value = error.code!!;
  }
  if (error instanceof ApiError) {
    errorMessage.value = error.body.detail;
  } else {
    errorMessage.value = 'ErrorWithContext';
  }
}
</script>

<style scoped></style>
