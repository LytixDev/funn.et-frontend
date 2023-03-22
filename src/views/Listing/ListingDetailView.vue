<template>
  <div v-if="listing">
    <div v-if="listing.imageResponse">
      <img src="listing.imageResponse[0].image?" alt="listing.imageResponse[0].alt?" />
    </div>

    <h2>{{ listing.title }}</h2>
    <p>{{ listing.username }}</p>
    <p>{{ listing.price }}</p>

    <div v-if="listing.expirationDate">
        <p>{{ listing.expirationDate }}</p>
    </div>

    <p>{{ listing.briefDescription }}</p>
    <div v-if="listing.fullDescription">
      <p>{{ listing.fullDescription }}</p>
    </div>

    <p>{{ listing.category }}</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { ListingControllerService } from '@/api';
import { ListingDTO } from '@/api';

const listing = ref<ListingDTO>();
const route = useRoute();
const id: number = +(route.params.id as string);

//listing.value = await ListingControllerService.getListing({ id: id });
</script>

<style scoped></style>
