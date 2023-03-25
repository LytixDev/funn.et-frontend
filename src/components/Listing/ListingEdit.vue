<template>
  <h2>{{ $t('navigation.createListing') }}</h2>

  <listing-form v-model="listingPayload" :location="foundLocation" :on-submit="updateListing" />
</template>

<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';
import ListingForm from '@/components/Listing/ListingForm.vue';
import {
  ApiError,
  ListingControllerService,
  ListingCreateDTO,
  ListingDTO,
  LocationControllerService,
  LocationResponseDTO,
} from '@/api/backend';
import { useUserInfoStore } from '@/stores/UserStore';

const route = useRoute();

const { t } = useI18n();
const router = useRouter();
const userStore = useUserInfoStore();
const username = computed(() => userStore.username);
const errorMessage = ref('');

const listing = ref(undefined as ListingDTO | undefined);
const listingId = +route.params.id;
const listingPayload = ref({
  title: '',
  username: username.value,
  briefDescription: '',
  fullDescription: '',
  price: 0,
  category: 'OTHER',
  location: undefined as number | undefined,
} as ListingCreateDTO);

const foundLocation = ref(undefined as LocationResponseDTO | undefined);

try {
  listing.value = await ListingControllerService.getListing({ id: listingId });
  foundLocation.value = await LocationControllerService.getLocationById({ id: listing.value.location!! });
} catch (error) {
  if (error instanceof ApiError) {
    errorMessage.value = error.body.detail;
  }
  throw error;
}

const updateListing = () => {
  ListingControllerService.updateListing({ id: listingId, formData: listingPayload.value })
    .then(() => {
      router.push({ name: 'Listing', params: { id: listingId } });
    })
    .catch((error) => {
      if (error instanceof ApiError) {
        errorMessage.value = error.body.detail;
      }
      throw error;
    });
};

watchEffect(() => {
  listingPayload.value.title = listing.value?.title!!;
  listingPayload.value.briefDescription = listing.value?.briefDescription!!;
  listingPayload.value.fullDescription = listing.value?.fullDescription ?? '';
  listingPayload.value.price = listing.value?.price;
  listingPayload.value.category = listing.value?.category!!;
  listingPayload.value.location = foundLocation.value?.id;
});
</script>

<style scoped></style>
