<template>
  <listing-filter v-model="filterData" />
  <error-boundary-catcher>
    <listing-list :listings="listings" />
  </error-boundary-catcher>
  <div class="list-container">
    <span v-if="listings.length > 0 && listings.length === pageSize">
      <button v-if="currentPage > 1" @click="currentPage--" data-testid="prev-page-button">
        <oh-vue-icon scale="2" name="bi-arrow-left-square-fill" />
      </button>
      <span class="pagination-number">
        {{ currentPage }}
      </span>
      <button v-if="listings.length === pageSize" @click="currentPage++" data-testid="next-page-button">
        <oh-vue-icon scale="2" name="bi-arrow-right-square-fill" />
      </button>
    </span>
  </div>
  <error-box v-model="errorMessage" />
</template>

<script setup lang="ts">
import ErrorBox from '@/components/Exceptions/ErrorBox.vue';
import { ListingControllerService, ListingDTO, SearchRequest } from '@/api/backend';
import { computed, ref, watch, watchEffect } from 'vue';

import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { BiArrowLeftSquareFill, BiArrowRightSquareFill } from 'oh-vue-icons/icons';
import ListingFilter from '@/components/Listing/ListingFilter.vue';
import { ListingFilterType } from '@/components/Listing/ListingFilter.vue';
import { AxiosError } from 'axios';
import ListingList from '@/components/Listing/ListingList.vue';
import ErrorBoundaryCatcher from '@/components/Exceptions/ErrorBoundaryCatcher.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

addIcons(BiArrowLeftSquareFill, BiArrowRightSquareFill);

const pageSize = 20;
const firstPage = 1;

const errorMessage = ref('');
const currentPage = ref(firstPage);

const filterData = ref<ListingFilterType>({
  searchMessage: '',
  searchRequests: [],
  categoryRequest: undefined,
  priceRequest: undefined,
  sortRequests: [],
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
      if (error instanceof AxiosError) {
        errorMessage.value = `Exceptions.${error.code!!}`;
      } else {
        Promise.reject(error?.body?.detail);
      }
    });
};

watch(filterData, () => {
  currentPage.value = firstPage;
});

watchEffect(async () => {
  let filterRequests = filterData.value.searchRequests;
  if (filterData.value.categoryRequest?.value !== undefined) {
    filterRequests.push(filterData.value.categoryRequest!!);
  }
  if (filterData.value.priceRequest?.value !== undefined) {
    filterRequests.push(filterData.value.priceRequest!!);
  }
  await getListings({
    page: currentPage.value - firstPage,
    size: pageSize,
    filterRequests: filterRequests,
    sortRequests: filterData.value.sortRequests,
  });
});
</script>

<style scoped>
.list-container {
  margin: 4rem 1rem;
}

.pagination-number {
  margin: 0 1rem;
  font-size: x-large;
}
</style>
