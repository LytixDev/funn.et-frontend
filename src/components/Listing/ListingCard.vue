<template>
  <div class="listing-card">
    <div class="listing-image">
      <img :src="listingData.image" />
    </div>

    <div class="listing-info">
      <span> {{ $t('ListingCard.published') }} {{ listingData.username }} </span>
      <h3>{{ listingData.title }}</h3>
      <h3>{{ listingData.price }} kr</h3>
      <p>{{ listingData.briefDescription }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export interface ListingCardData {
  username: string;
  title: string;
  price: number;
  image: string;
  briefDescription: string;
}

export default defineComponent({
  name: 'ListingCard',
  props: {
    listingData: {
      type: Object as () => ListingCardData,
      required: true,
    },
  },
});
</script>

<style scoped>
.listing-card:hover {
  transform: scale(1.02);
  transition: all 0.1s ease-in;
  cursor: pointer;
  background-color: #f3f5fa;
}

.listing-card {
  min-width: 180px;
  max-width: 480px;
  min-height: 240px;
  margin: auto;
  padding: 10px;
  box-sizing: border-box;
}

.listing-image img {
  border-radius: 5%;
  object-fit: cover;
  width: 100%;
  max-height: 300px;
}

.listing-info * {
  margin: 5px;
}

.listing-info span {
  text-transform: uppercase;
  color: #777;
  font-size: small;
}

.listing-info {
  width: 80%;
  margin: 0 5px;
}

.listing-info h3 {
  font-size: 1.5em;
}

.listing-info p {
  line-height: 140%;
  color: #2a2a2a;
}
</style>
