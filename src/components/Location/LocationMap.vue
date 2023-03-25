<template>
  <div style="height: 600px; width: 800px" class="map-container">
    <l-map
      id="leaflet-map"
      ref="map"
      :zoom="zoom"
      :center="validMarker(selectedCoords) ? [selectedCoords?.lat, selectedCoords?.lon] : [center.lat, center.lon]">
      <l-tile-layer :url="url" layer-type="base" name="OpenStreetMap" :attribution="attribution"> </l-tile-layer>
      <l-marker v-if="validMarker(selectedCoords)" :lat-lng="[selectedCoords?.lat, selectedCoords?.lon]">
        <l-icon
          :icon-url="icon.url"
          :icon-size="icon.iconSize"
          :icon-anchor="icon.iconAnchor"
          :popup-anchor="icon.popupAnchor"
          :shadow-size="icon.shadowSize"></l-icon
      ></l-marker>
      <l-marker v-for="marker in markerCoordsList" :lat-lng="marker" />
    </l-map>
  </div>
</template>

<script lang="ts">
import { LMap, LTileLayer, LMarker, LCircle, LIcon } from '@vue-leaflet/vue-leaflet';
import { defineComponent } from 'vue';

export type Coords = { lat: number; lon: number };

export default defineComponent({
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LCircle,
    LIcon,
  },
  data() {
    return {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      selectedColor: 'red',
      icon: {
        url: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      },
    };
  },
  props: {
    center: {
      type: Object as () => { lat: number; lon: number },
      required: false,
      default: () => ({ lat: 47.41322, lon: -1.219482 }),
    },
    zoom: {
      type: Number,
      required: false,
      default: 3,
    },
    markerCoordsList: {
      type: Array<Coords | undefined>,
      required: false,
    },
    selectedCoords: {
      type: Object as () => Coords,
      required: false,
    },
  },
  methods: {
    validMarker(markerCoords: Coords | undefined) {
      return markerCoords?.lat && markerCoords?.lon;
    },
  },
});
</script>

<style scoped>
#leaflet-map {
  z-index: 0;
}
</style>