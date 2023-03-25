<template>
  <div class="listing-detail-view" v-if="listing">
    <div class="carousel">
      <ImageCarousel :images="images" />
    </div>

    <div class="listing-details">
      <h1 class="listing-title">{{ listing.title }}</h1>
      <div>
        <p class="listing-username">{{ $t('ListingDetailView.publishedBy') }}: {{ listing.username }}</p>
        <p class="listing-price">{{ $t('ListingDetailView.price') }}: {{ listing.price }} kr</p>
        <p class="listing-category">{{ $t('ListingDetailView.category') }}: {{ listing.category }}</p>
      </div>
      <hr />

      <div class="listing-description">
        <h2>{{ $t('ListingDetailView.description') }}</h2>
        <p>{{ listing.briefDescription }}</p>
        <div v-if="listing.fullDescription">
          <p>{{ listing.fullDescription }}</p>
        </div>
      </div>
      <hr />

      <div v-if="user.isLoggedIn && !isOwner" class="listing-actions">
        <button @click="favorite">{{ $t('ListingDetailView.favorite') }}</button>
      </div>
    </div>
  </div>

  <div class="owner-actions" v-if="isOwner">
    <button @click="updateStatus(ListingDTO.status.SOLD)">{{ $t('ListingDetailView.sold') }}</button>
    <button @click="updateStatus(ListingDTO.status.ARCHIVED)">{{ $t('ListingDetailView.archive') }}</button>
    <button>{{ $t('ListingDetailView.edit') }}</button>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { Ref, ref, computed } from 'vue';
import { ListingControllerService } from '@/api/backend';
import { ListingDTO } from '@/api/backend';
import { useUserInfoStore } from '@/stores/UserStore';
import ImageCarousel from '@/components/Misc/ImageCarousel.vue';

const listing = ref<ListingDTO>();
const route = useRoute();
const id: number = +(route.params.id as string);
const user = useUserInfoStore();

listing.value = await ListingControllerService.getListing({ id: id });
const isOwner: Ref<boolean> = computed(() => listing.value?.username === user.username);

const images = computed(() => {
  if (listing.value?.imageResponse) return listing.value.imageResponse.map((image) => image.url?.toString());
  return [];
});

const favorite = async () => {
  await ListingControllerService.favoriteListing({ id: id });
};

const updateStatus = async (status: ListingDTO.status) => {
  //let listingCpy: ListingDTO = { ...listing.value };
  console.log(listing.value);
  //await ListingControllerService.updateListing({ id: id, requestBody: listingCpy });
};
</script>

<style scoped>
.listing-detail-view {
  min-width: 100vh;
}

.carousel {
  margin-bottom: 50px;
  margin-top: 50px;
}

h2 {
  text-decoration: none;
}
.listing-title {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.listing-description {
  margin-bottom: 1rem;
}

.listing-username {
  margin-bottom: 0.5rem;
}

.listing-actions {
  margin-top: 1rem;
}

.listing-username {
  margin-right: 10px;
}

button {
  background-color: #4caf50;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  margin-right: 1rem;
}

button:hover {
  background-color: #3e8e41;
}
</style>
