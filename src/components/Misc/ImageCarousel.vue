<template>
  <div class="carousel">
    <div class="carousel-inner">
      <img :src="images[currentIndex]" :alt="alts![currentIndex] ? alts![currentIndex] : 'carousel image'" />
      <p v-if="displayAlt && alts![currentIndex]">{{ alts![currentIndex] }}</p>
    </div>
    <div v-if="images.length > 1">
      <button @click="prevSlide">{{ $t('ImageCarousel.previous') }}</button>
      <button @click="nextSlide">{{ $t('ImageCarousel.next') }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  images: {
    type: Array<string>,
    required: true,
  },
  alts: {
    type: Array<string>,
  },
  displayAlt: {
    type: Boolean,
    default: false,
  },
});
const currentIndex = ref(0);

function nextSlide() {
  if (currentIndex.value === props.images.length - 1) currentIndex.value = 0;
  else currentIndex.value++;
}

function prevSlide() {
  if (currentIndex.value === 0) currentIndex.value = props.images.length - 1;
  else currentIndex.value--;
}
</script>

<style scoped>
.carousel {
  position: relative;
  height: 300px;
}

.carousel-inner {
  height: 100%;
  text-align: center;
}

.carousel-inner > p {
  position: absolute;
  bottom: 0;
  right: 50%;
}

.carousel-inner img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: scale-down;
}
</style>
