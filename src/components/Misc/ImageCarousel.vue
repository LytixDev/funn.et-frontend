<template>
  <div class="carousel">
    <div class="carousel-inner">
      <img :src="imageShownLocation" :alt="!alts![currentIndex] ? alts![currentIndex] : 'carousel image'" />
      <div v-if="images.length > 1">
        <OhVueIcon name="bi-arrow-left-circle" class="prev-button" @click="prevSlide" />
        <OhVueIcon name="bi-arrow-right-circle" class="next-button" @click="nextSlide" />
      </div>
    </div>
    <p v-if="displayAlt && alts![currentIndex] !== 'undefined'">{{ alts![currentIndex] }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { BiArrowLeftCircle, BiArrowRightCircle } from 'oh-vue-icons/icons';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { computed } from '@vue/reactivity';

addIcons(BiArrowLeftCircle, BiArrowRightCircle);

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

const imageShownLocation = computed(() => {
  return props.images[currentIndex.value] || '/src/assets/images/default-placeholder.png';
});

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
  border: 1px solid #ccc;
}

.carousel-inner {
  height: 100%;
  text-align: center;
  position: relative;
}

p {
  margin: 1rem;
  text-align: center;
  color: gray;
}

.carousel-inner img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  max-width: 80%;
  max-height: 100%;
}

.prev-button {
  position: absolute;
  left: 3rem;
  top: 50%;
  transform: translateY(-50%);
}

.next-button {
  position: absolute;
  right: 3rem;
  top: 50%;
  transform: translateY(-50%);
}

.prev-button,
.next-button {
  cursor: pointer;
  scale: 2;
  color: gray;
}
</style>
