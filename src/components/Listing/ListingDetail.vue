<template>
  <div class="listing-detail-view" v-if="listing">
    <div class="carousel">
      <ImageCarousel :images="images" :alts="alts" :displayAlt="true" />
    </div>

    <h2 v-if="listing.status != ListingDTO.status.ACTIVE">
      {{ $t('ListingDetailView.note') }} {{ $t('ListingDetailView.'.concat(listing.status)) }}.
    </h2>

    <div class="listing-details">
      <div class="listing-head">
        <h1 class="listing-title">{{ listing.title }}</h1>
        <div v-if="user.isLoggedIn && !isOwner && listing.status === ListingDTO.status.ACTIVE" class="listing-actions">
          <OhVueIcon @click="favorite" :name="isFavorite ? 'bi-heart-fill' : 'bi-heart'" class="favourite" />
        </div>
      </div>
      <div>
        <p class="listing-username">{{ $t('ListingDetailView.publishedBy') }}: {{ listing.username }}</p>
        <LocationMap class="location-map" v-if="coords !== null" :center="coords" :selectedCoords="coords" :zoom="10" />
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
    </div>
  </div>

  <div class="owner-actions" v-if="isOwner">
    <button v-if="listing?.status !== ListingDTO.status.SOLD" @click="updateStatus(ListingDTO.status.SOLD)">
      {{ $t('ListingDetailView.sold') }}
    </button>
    <button v-if="listing?.status !== ListingDTO.status.ARCHIVED" @click="updateStatus(ListingDTO.status.ARCHIVED)">
      {{ $t('ListingDetailView.archive') }}
    </button>
    <router-link :to="{ name: 'listing-edit', params: { id: listing?.id } }">{{
      $t('ListingDetailView.edit')
    }}</router-link>
  </div>
  <router-link
    v-else-if="listing?.status === ListingDTO.status.ACTIVE && user.isLoggedIn"
    :to="{ name: 'chat', params: { id: listing?.id, username: username } }"
    >{{ $t('ListingDetailView.sendMessage') }}</router-link
  >
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { Ref, ref, computed } from 'vue';
import { ListingControllerService, LocationControllerService, LocationResponseDTO, ListingDTO, ListingCreateDTO } from '@/api/backend';
import { useUserInfoStore } from '@/stores/UserStore';
import LocationMap, { Coords }from '@/components/Location/LocationMap.vue';
import ImageCarousel from '@/components/Misc/ImageCarousel.vue';
import { BiHeartFill, BiHeart } from 'oh-vue-icons/icons';
import { OhVueIcon, addIcons } from 'oh-vue-icons';

addIcons(BiHeart, BiHeartFill);
const listing = ref<ListingDTO>();
const location = ref<LocationResponseDTO>();
const isFavorite = ref<boolean>(false);
const route = useRoute();
const id: number = +(route.params.id as string);

const user = useUserInfoStore();
const username = computed(() => user.username) || '';

listing.value = await ListingControllerService.getListing({ id: id });
location.value = await LocationControllerService.getLocationById({ id: listing.value?.location as number });
const coords = computed(() => {
  if (location.value) return { lat: location.value.latitude, lon: location.value.longitude } as Coords;
  return null;
});
if (listing.value.isFavorite) isFavorite.value = listing.value.isFavorite;

const isOwner: Ref<boolean> = computed(() => listing.value?.username === username.value);

const images = computed(() => {
  if (listing.value?.imageResponse) return listing.value.imageResponse.map((image) => image.url?.toString());
  return [];
});

const alts = computed(() => {
  if (listing.value?.imageResponse) return listing.value.imageResponse.map((image) => image.alt?.toString());
  return [];
});

const favorite = async () => {
  const data = await ListingControllerService.favoriteOrUnfavoriteListing({ id: id });
  /* can not directly set as data.isFavorite may be undefined */
  if (data.isFavorite === true) isFavorite.value = true;
  else if (data.isFavorite === false) isFavorite.value = false;
};

const updateStatus = async (status: ListingDTO.status) => {
  if (status === listing.value?.status) return;
  let listingCpy = { ...listing.value } as ListingCreateDTO;
  listingCpy.status = status;
  const response: ListingDTO = await ListingControllerService.updateListing({ id: id, formData: listingCpy });
  if (response) listing.value = response;
};
</script>

<style scoped>
.listing-head {
  display: flex;
  align-items: center;
}

.favourite {
  margin-left: 15px;
  scale: 2;
  cursor: pointer;
}

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
