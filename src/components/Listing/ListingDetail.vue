<template>
  <div v-if="listing">
    <!--
    Unsure how the image will be passed from the backend.

    <div v-if="image">
      <img :src="image" :alt="imageAlt" />
    </div>
    -->
    <div>
      <img
        src="https://media.licdn.com/dms/image/D4D03AQEhvgiUUe1tgA/profile-displayphoto-shrink_800_800/0/1672178488156?e=1684972800&v=beta&t=e77ig5S5qj52ubkpGN7NvlYz-pN1YLFhvdhI4MwjMYY"
        alt="placeholder" />
    </div>

    <h2>{{ listing.title }}</h2>
    <p>{{ listing.username }}</p>
    <p>{{ listing.price }}</p>

    <div v-if="listing.expirationDate">
      <p>{{ listing.expirationDate }}</p>
    </div>

    <p>{{ listing.briefDescription }}</p>
    <div v-if="listing.fullDescription">
      <p>{{ listing.fullDescription }}</p>
    </div>

    <p>{{ listing.category }}</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, computed } from 'vue';
import { ListingControllerService } from '@/api';
import { ListingDTO } from '@/api';

const listing = ref<ListingDTO>();
const route = useRoute();
const id: number = +(route.params.id as string);

listing.value = await ListingControllerService.getListing({ id: id });

//Unsure how the image will be passed from the backend.
//
//const image = computed(() => {
//  if (listing.value?.imageResponse) {
//    return listing.value.imageResponse[0].image?.toString();
//  }
//  return '';
//});
//
//const imageAlt = computed(() => {
//  if (listing.value?.imageResponse) {
//    return listing.value.imageResponse[0].alt;
//  }
//  return '';
//});
</script>

<style scoped></style>
