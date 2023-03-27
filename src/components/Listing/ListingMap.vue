<template>
  <div class="container-wrapper">
    <div class="map-container">
      <l-map id="leaflet-map" ref="map" :zoom="zoom" :center="[center.lat, center.lon]">
        <l-tile-layer :url="url" layer-type="base" name="OpenStreetMap" :attribution="attribution"> </l-tile-layer>

        <l-marker
          v-for="listing in listingWithLocation"
          :lat-lng="[listing.coords?.lat, listing.coords?.lon]"
          :key="listing.id"
          @click="() => router.push({ name: 'listing', params: { id: listing.id } })">
          > >
          <l-icon
            :icon-url="icon.url"
            :icon-size="icon.iconSize"
            :icon-anchor="icon.iconAnchor"
            :popup-anchor="icon.popupAnchor"
            :shadow-size="icon.shadowSize">
          </l-icon>
          <l-tooltip>
            <ListingCard :listingData="listing" />
          </l-tooltip>
        </l-marker>
      </l-map>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ListingDTO, LocationResponseDTO } from '@/api/backend';
import { LMap, LTileLayer, LMarker, LCircle, LIcon, LTooltip } from '@vue-leaflet/vue-leaflet';
import { ref, watchEffect } from 'vue';
import { LocationControllerService } from '@/api/backend';
import ListingCard from './ListingCard.vue';
import router from '@/router';

const attribution = ref('&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors');
const url = ref('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
const icon = ref({
  url: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png`,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

type Coords = { lat: number; lon: number };

const zoom = ref(5);
const center = ref({ lat: 60.8, lon: 10.4 });
const selectedCoords = ref({ lat: 10.1, lon: 10.1 });
const hoveredListing = ref('');

const validMarker = (markerCoords: Coords | undefined) => {
  return markerCoords?.lat && markerCoords?.lon;
};

const props = defineProps<{
  listings: ListingDTO[];
}>();

interface ListingWithLocation extends ListingDTO {
  coords: Coords;
}

const listingWithLocation = ref([] as ListingWithLocation[]);

watchEffect(() => {
  listingWithLocation.value = [];
  props.listings.forEach((listing) => {
    if (listing.location) {
      LocationControllerService.getLocationById({ id: listing.location }).then((response: LocationResponseDTO) => {
        listingWithLocation.value.push({ ...listing, coords: { lat: response.latitude, lon: response.longitude } });
      });
    }
  });
});
</script>

<style scoped>
a {
  box-shadow: none;
}

#leaflet-map {
  z-index: 0;
}

.map-container {
  width: 90%;
  height: 30em;
  display: flex;
  align-items: center;
}

.container-wrapper {
  display: flex;
  justify-content: center;
}

.marker-tooltip {
  display: none;
  position: relative;
}

.marker-tooltip.show {
  display: block;
}
</style>
