<template>
  <h2>{{ $t('navigation.editListing') }}</h2>

  <listing-form :listing-payload="initialPayload" :found-location="foundLocation" :on-submit="updateListing" />
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';
import ListingForm from '@/components/Listing/ListingForm.vue';
import {
  ApiError,
  ImageControllerService,
  ListingControllerService,
  ListingCreateDTO,
  ListingDTO,
  LocationControllerService,
  LocationResponseDTO,
} from '@/api/backend';
import { useUserInfoStore } from '@/stores/UserStore';

const route = useRoute();

const router = useRouter();
const userStore = useUserInfoStore();
const username = computed(() => userStore.username);
const errorMessage = ref('');

const listing = ref(undefined as ListingDTO | undefined);
const listingId = +route.params.id;

const foundLocation = ref(undefined as LocationResponseDTO | undefined);

const images = ref([] as Array<Blob>);

try {
  listing.value = await ListingControllerService.getListing({ id: listingId });
  // Go back if the user is not the owner of the listing
  if (username.value !== listing.value?.username && userStore.role !== 'ADMIN') {
    router.push({ name: 'listing', params: { id: listingId } });
  }
  foundLocation.value = await LocationControllerService.getLocationById({ id: listing.value.location!! });
  for (const image of listing.value.imageResponse!!) {
    images.value.push(await ImageControllerService.getImage({ id: image.id!! }));
  }
} catch (error) {
  if (error instanceof ApiError) {
    errorMessage.value = error.body.detail;
  }
  throw error;
}

const initialPayload = ref({
  title: listing.value!!.title,
  username: username.value,
  briefDescription: listing.value!!.briefDescription,
  fullDescription: listing.value!!.fullDescription,
  price: listing.value!!.price,
  category: listing.value!!.category,
  location: foundLocation.value!!.id,
  images: images.value,
  status: listing.value!!.status,
} as ListingCreateDTO);

const updateListing = (payload: ListingCreateDTO) => {
  ListingControllerService.updateListing({ id: listingId, formData: payload })
    .then(() => {
      router.push({ name: 'listing', params: { id: listingId } });
    })
    .catch((error) => {
      if (error instanceof ApiError) {
        errorMessage.value = error.body.detail;
      }
      throw error;
    });
};
</script>

<style scoped></style>
