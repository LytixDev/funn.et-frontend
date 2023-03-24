<template>
  <div class="carousel">
    <div class="carousel-inner">
      <img :src="images[currentIndex]" alt="carousel image" />
    </div>
    <div v-if="images.length > 1">
      <a class="carousel-control-prev" href="#" role="button" @click="prevSlide">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#" role="button" @click="nextSlide">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
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
  height: 200px;
}

.carousel-inner {
  position: relative;
  height: 100%;
}

.carousel-inner img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-inner .active {
  z-index: 1;
}

.carousel-control-prev,
.carousel-control-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
}

.carousel-control-prev {
  left: 0;
}

.carousel-control-next {
  right: 0;
}
</style>
