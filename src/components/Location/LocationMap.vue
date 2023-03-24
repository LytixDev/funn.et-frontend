<template>
  <div style="height: 600px; width: 800px" class="map-container">
    <l-map
    id="leaflet-map"
      ref="map"
      :zoom="zoom"
      :center="validMarker ? [markerCoords?.lat, markerCoords?.lon] : [center.lat, center.lon]">
      <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base" name="OpenStreetMap">
      </l-tile-layer>
      <l-marker v-if="validMarker" :lat-lng="markerCoords" />
    </l-map>
  </div>
</template>

<script lang="ts">
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    LMap,
    LTileLayer,
    LMarker,
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
    markerCoords: {
      type: Object as () => { lat: number; lon: number },
      required: false,
    },
  },
  computed: {
    validMarker() {
      return this.markerCoords?.lat && this.markerCoords?.lon;
    },
  },
});
</script>

<style scoped>
#leaflet-map {
  z-index: 0;
}
</style>
