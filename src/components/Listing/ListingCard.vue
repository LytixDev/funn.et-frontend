<template>
  <router-link :to="{ name: 'listing', params: { id: listingData.id } }">
    <div class="listing-card">
      <div class="listing-image">
        <img :src="image.imageLocation" :alt="image.imageAlt === 'undefined' ? 'listing image' : image.imageAlt" />
      </div>

      <div class="listing-info">
        <span> {{ $t('ListingCard.published') }} {{ listingData.username }} </span>
        <h3>{{ listingData.title }}</h3>
        <h3 class="price">{{ listingData.price }} kr</h3>
        <p>{{ listingData.briefDescription }}</p>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { ListingDTO } from '@/api/backend/models/ListingDTO';

const props = defineProps({
  listingData: {
    type: Object as () => ListingDTO,
    required: true,
  },
  testDataId: {
    type: String,
    required: false,
  },
});

const image = computed(() => {
  if (props.listingData.imageResponse?.length !== 0)
    return {
      imageLocation: props.listingData.imageResponse![0].url,
      imageAlt: props.listingData.imageResponse![0].alt,
    };
  return { imageLocation: '/src/assets/images/default-placeholder.png', imageAlt: 'placeholder image' };
});
</script>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
  box-shadow: var(--large-box-shadow);
  margin: 0.5em;
}

a:hover {
  transform: scale(1.02);
  transition: all 0.1s ease-in;
  cursor: pointer;
  background-color: #f3f5fa;
}

.price {
  color: var(--primary-color);
}

.listing-card {
  min-width: 180px;
  max-width: 480px;
  margin: auto;
  padding: 10px;
  box-sizing: border-box;
}

.listing-image img {
  border-radius: 5%;
  object-fit: contain;
  width: 100%;
  aspect-ratio: 1;
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
