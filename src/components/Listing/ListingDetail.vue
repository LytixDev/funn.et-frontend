<template>
  <div v-if="listing">
    <!--
    <li v-for="image in images">
      <img :src="image" />
    </li> 
    -->
    <ImageCarousel :images="images" />

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
    <p>{{ listing.status }}</p>

    <div v-if="user.isLoggedIn">
      <button @click="favorite">{{ $t('ListingDetailView.favorite') }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, computed } from 'vue';
import { ListingControllerService } from '@/api';
import { ListingDTO } from '@/api';
import { useUserInfoStore } from '@/stores/UserStore';
import ImageCarousel from '@/components/Nice/ImageCarousel.vue';

const listing = ref<ListingDTO>();
const route = useRoute();
const id: number = +(route.params.id as string);
const user = useUserInfoStore();

listing.value = await ListingControllerService.getListing({ id: id });

const favorite = async () => {
  await ListingControllerService.favoriteListing({ id: id });
};

const images = computed(() => {
  if (listing.value?.imageResponse) return listing.value.imageResponse.map((image) => image.url?.toString());
  return [];
});
</script>

<style scoped>
img {
  max-width: 500px;
}
</style>
