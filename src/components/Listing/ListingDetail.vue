<template>
  <div class="listing-detail-view" v-if="listing">
    <h2 v-if="listing.status != ListingDTO.status.ACTIVE" class="listing-status">
      {{ $t('ListingDetailView.note') }} {{ $t('ListingDetailView.'.concat(listing.status)) }}.
    </h2>

    <div class="listing-details">
      <div class="listing-head">
        <h1 class="listing-title">{{ listing.title }}</h1>
        <div v-if="user.isLoggedIn && !isOwner && listing.status === ListingDTO.status.ACTIVE" class="listing-actions">
          <OhVueIcon
            color="var(--red-color)"
            @click="favorite"
            :name="isFavorite ? 'bi-heart-fill' : 'bi-heart'"
            class="favourite" />
        </div>
      </div>
      <p class="listing-username">{{ $t('ListingDetailView.publishedBy') }}: {{ listing.username }}</p>
      <ImageCarousel class="carousel" :images="images" :alts="alts" :displayAlt="true" />

      <p class="listing-price">{{ $t('ListingDetailView.price') }}: {{ listing.price }} kr</p>
      <p class="listing-category">{{ $t('ListingDetailView.category') }}: {{ listing.category.name }}</p>
      <hr />
      <div class="listing-description">
        <h2>{{ $t('ListingDetailView.description') }}</h2>
        <p>{{ listing.briefDescription }}</p>
        <div v-if="listing.fullDescription">
          <p>{{ listing.fullDescription }}</p>
        </div>
      </div>
      <hr />
      <LocationMap v-if="coords" :center="coords" :selectedCoords="coords" :zoom="10" />
    </div>

    <hr />

    <div class="owner-actions" v-if="isOwner || isAdmin">
      <button
        data-testid="sold-button"
        class="attention"
        v-if="listing?.status !== ListingDTO.status.SOLD"
        @click="updateStatus(ListingDTO.status.SOLD)">
        {{ $t('ListingDetailView.sold') }}
      </button>
      <button
        data-testid="archive-button"
        v-if="listing?.status !== ListingDTO.status.ARCHIVED"
        @click="updateStatus(ListingDTO.status.ARCHIVED)">
        {{ $t('ListingDetailView.archive') }}
      </button>
      <router-link data-testid="edit-button" :to="{ name: 'listing-edit', params: { id: listing?.id } }">{{
        $t('ListingDetailView.edit')
      }}</router-link>
      <button class="red-attention" @click="deleteListing">{{ $t('ListingDetailView.delete') }}</button>
    </div>
    <router-link
      class="owner-actions"
      v-if="!isOwner && listing?.status === ListingDTO.status.ACTIVE && user.isLoggedIn"
      :to="{ name: 'chat', params: { id: listing?.id, username: username } }"
      >{{ $t('ListingDetailView.sendMessage') }}</router-link
    >
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { Ref, ref, computed } from 'vue';
import {
  ListingControllerService,
  LocationControllerService,
  LocationResponseDTO,
  ListingDTO,
  ListingCreateDTO,
  ListingUpdateDTO,
} from '@/api/backend';
import { useUserInfoStore } from '@/stores/UserStore';
import LocationMap, { Coords } from '@/components/Location/LocationMap.vue';
import ImageCarousel from '@/components/Misc/ImageCarousel.vue';
import { BiHeartFill, BiHeart } from 'oh-vue-icons/icons';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import router from '@/router';

const t = useI18n().t;

addIcons(BiHeart, BiHeartFill);
const listing = ref<ListingDTO>();
const location = ref<LocationResponseDTO>();
const isFavorite = ref<boolean>(false);
const route = useRoute();
const id: number = +(route.params.id as string);

const user = useUserInfoStore();
const username = computed(() => user.username) || '';
const isAdmin = computed(() => user.role === 'ADMIN');

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
  let listingCpy = {
    username: listing.value?.username,
    location: listing.value?.location,
    title: listing.value?.title,
    briefDescription: listing.value?.briefDescription,
    fullDescription: listing.value?.fullDescription,
    category: listing.value?.id,
    price: listing.value?.price,
    publicationDate: listing.value?.publicationDate,
    expirationDate: listing.value?.expirationDate,
    status: status,
  } as ListingUpdateDTO;
  listingCpy.status = status;
  const response: ListingDTO = await ListingControllerService.updateListing({ id: id, formData: listingCpy });
  if (response) listing.value = response;
};

const deleteListing = async () => {
  const rc = confirm(t('ListingDetailView.confirmDelete'));
  if (rc) {
    await ListingControllerService.deleteListing({ id: id });
    router.push({ name: 'home' });
  }
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

.owner-actions {
  margin-top: 1em;
  display: flex;
  justify-content: space-around;
}

.listing-status {
  color: var(--red-color);
  font-weight: 700;
}
</style>
