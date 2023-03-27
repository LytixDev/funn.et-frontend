<template>
  <listing-form
    :listing-payload="initialPayload"
    :found-location="foundLocation"
    :on-submit="updateListing"
    form-type="update"
    :initial-images="images" />
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import ListingForm from '@/components/Listing/ListingForm.vue';
import {
  ApiError,
  ImageControllerService,
  ListingControllerService,
  ListingCreateDTO,
  ListingDTO,
  ListingUpdateDTO,
  LocationControllerService,
  LocationResponseDTO,
} from '@/api/backend';
import { useUserInfoStore } from '@/stores/UserStore';
import { Image as ImageUpload } from '@/components/Form/ImageUploader.vue';
import handleUnknownError from '@/components/Exceptions/unkownErrorHandler';
import { useErrorStore } from '@/stores/ErrorStore';

const errorStore = useErrorStore();

const route = useRoute();

const router = useRouter();
const userStore = useUserInfoStore();
const username = computed(() => userStore.username);

const listing = ref(undefined as ListingDTO | undefined);
const listingId = +route.params.id;

const foundLocation = ref(undefined as LocationResponseDTO | undefined);

const images = ref([] as ImageUpload[]);

try {
  listing.value = await ListingControllerService.getListing({ id: listingId });
  // Go to listing detail if the user is not the owner of the listing or admin
  if (username.value !== listing.value?.username && userStore.role !== 'ADMIN') {
    router.push({ name: 'listing', params: { id: listingId } });
  }
  foundLocation.value = await LocationControllerService.getLocationById({ id: listing.value.location!! });

  for (const image of listing.value.imageResponse!!) {
    const blob = await ImageControllerService.getImage({ id: image.id });
    const blobWithType = new Blob([blob], { type: blob.type ?? 'image/png' });
    images.value.push({
      name: image.id.toString(),
      type: blobWithType.type,
      size: blobWithType.size,
      url: image.url,
      alt: image.alt,
      data: blobWithType,
      isUploaded: true,
    } as ImageUpload);
  }
} catch (error) {
  const message = handleUnknownError(error);
  errorStore.addError(message);
}

const initialPayload = ref({
  title: listing.value!!.title,
  username: listing.value!!.username,
  briefDescription: listing.value!!.briefDescription,
  fullDescription: listing.value!!.fullDescription,
  price: listing.value!!.price,
  category: listing.value!!.category,
  location: foundLocation.value!!.id,
  status: listing.value!!.status,
} as ListingUpdateDTO);

const updateListing = (payload: ListingUpdateDTO) => {
  ListingControllerService.updateListing({ id: listingId, formData: payload })
    .then(() => {
      router.push({ name: 'listing', params: { id: listingId } });
    })
    .catch((error) => {
      const message = handleUnknownError(error);
      errorStore.addError(message);
    });
};
</script>

<style scoped></style>
