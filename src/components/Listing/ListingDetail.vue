<template>
  <div v-if="listing">
    <!--
    <li v-for="image in images">
      <img :src="image" />
    </li> 
    -->
    <div class="carousel">
      <ImageCarousel :images="images" />
    </div>

    <h1>{{ listing.title }}</h1>

    <h2>Beskrivelse</h2>
    <p>{{ listing.briefDescription }}</p>
    <div v-if="listing.fullDescription">
      <p>{{ listing.fullDescription }}</p>
    </div>

    <p>{{ listing.username }}</p>
    <p>{{ listing.price }}</p>

    <div v-if="listing.expirationDate">
      <p>{{ listing.expirationDate }}</p>
    </div>

    <p>{{ listing.category }}</p>
    <p>{{ listing.status }}</p>

    <div v-if="user.isLoggedIn && !isOwner">
      <button @click="favorite">{{ $t('ListingDetailView.favorite') }}</button>
    </div>
  </div>

  <div v-if="isOwner">
    <button>{{ $t('ListingDetailView.sold') }}</button>
    <button>{{ $t('ListingDetailView.archive') }}</button>
    <button>{{ $t('ListingDetailView.edit') }}</button>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { Ref, ref, computed } from 'vue';
import { ListingControllerService } from '@/api';
import { ListingDTO } from '@/api';
import { useUserInfoStore } from '@/stores/UserStore';
import ImageCarousel from '@/components/Misc/ImageCarousel.vue';

const listing = ref<ListingDTO>();
const route = useRoute();
const id: number = +(route.params.id as string);
const user = useUserInfoStore();

listing.value = await ListingControllerService.getListing({ id: id });
const isOwner: Ref<boolean> = computed(() => listing.value?.username === user.username);

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

.carousel {
  margin-bottom: 50px;
  margin-top: 50px;
}

h2 {
  text-decoration: none;
}
</style>
