<template>
  <ListingFilter v-model="filterData" />
  <div class="list-container">
    <div class="listing-grid">
      <div v-for="listing in listings" :key="listing.id" class="listing-div">
        <listing-card :listingData="listing" data-testid="listing-card" />
      </div>
    </div>
    <div>
      <span>
        <button v-if="currentPage > 0" @click="currentPage--" data-testid="prev-page-button">
          <oh-vue-icon scale="2" name="bi-arrow-left-square-fill" />
        </button>
        <button v-if="listings.length === pageSize" @click="currentPage++" data-testid="next-page-button">
          <oh-vue-icon scale="2" name="bi-arrow-right-square-fill" />
        </button>
      </span>
    </div>
  </div>
  <error-box v-model="errorMessage" />
</template>

<script setup lang="ts">
import ListingCard from '@/components/Listing/ListingCard.vue';
import ErrorBox from '@/components/Exceptions/ErrorBox.vue';
import { ListingControllerService, ListingDTO, SearchRequest } from '@/api';
import { ref, watch, watchEffect } from 'vue';

import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { BiArrowLeftSquareFill, BiArrowRightSquareFill } from 'oh-vue-icons/icons';
import { useI18n } from 'vue-i18n';
import ListingFilter from '@/components/Listing/ListingFilter.vue';
import { ListingFilterType } from '@/components/Listing/ListingFilter.vue';

addIcons(BiArrowLeftSquareFill, BiArrowRightSquareFill);

const pageSize = 20;

const errorMessage = ref('');
const currentPage = ref(0);

const { t } = useI18n();

const filterData = ref<ListingFilterType>({
  searchMessage: '',
  searchRequests: [],
  categoryRequest: undefined,
  priceRequest: undefined,
  sortRequests: [],
});
const { searchMessage, searchRequests, categoryRequest, priceRequest, sortRequests } = filterData.value;

watch(filterData, () => {
  console.log(filterData.value.searchMessage);
  console.log(filterData.value.searchRequests);
  console.log(filterData.value.categoryRequest);
  console.log(filterData.value.priceRequest);
  console.log(filterData.value.sortRequests[0]);
});

// Create api request
let listings = ref([] as ListingDTO[]);

const getListings = async ({ page, size, filterRequests, sortRequests }: SearchRequest) => {
  return ListingControllerService.getListingsByFilter({
    requestBody: { page, size, filterRequests, sortRequests },
  })
    .then((data) => {
      listings.value = data;
    })
    .catch((error) => {
      console.log(error);
      if (error.detail !== undefined) {
        errorMessage.value = error.detail;
      } else {
        errorMessage.value = error;
      }
    });
};

watch([searchMessage], () => {
  currentPage.value = 0;
});

watchEffect(() => {
  let filterRequests = [...searchRequests.map((field) => field)];
  if (categoryRequest !== undefined) {
    filterRequests.push(categoryRequest!!);
  }
  if (priceRequest !== undefined) {
    filterRequests.push(priceRequest!!);
  }
  getListings({
    page: currentPage.value,
    size: pageSize,
    filterRequests: filterRequests,
    sortRequests: sortRequests.map((field) => field) ?? undefined,
  });
});
</script>

<style scoped>
.listing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
}

.listing-div {
  height: 450px;
  margin-top: 5px;
  border-radius: 5px;
}

.list-container {
  margin: 4rem 1rem;
}

.listing-filters {
  margin: 2rem;
  display: flex;
  justify-content: space-between;
}
</style>
