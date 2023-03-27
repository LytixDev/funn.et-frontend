<template>
  <div class="list-container">
    <div class="page-content">
      <div class="mobile-buttons">
        <router-link class="attention" to="/create-listing">{{ $t('navigation.createListing') }}</router-link>
        <button @click="() => (showFilter = !showFilter)">{{ $t('ListingListView.filterButton') }}</button>
      </div>
      <div class="buttons" :class="showFilter ? 'show' : ''">
        <listing-filter v-model="filterData" />
        <router-link class="attention desktop" to="/create-listing">{{ $t('navigation.createListing') }}</router-link>
      </div>

        <div class="listings-wrapper">
          <TabSelector :tabs="tabs" :active-tab="activeTab" @update:active-tab="(data) => (activeTab = data)" />
          <listing-list v-if="activeTab === 'List'" :listings="listings" />
          <ListingMap v-if="activeTab === 'Map'" :listings="listings" />
        </div>
    </div>

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
</template>

<script setup lang="ts">
import ErrorBox from '@/components/Exceptions/ErrorBox.vue';
import { ListingControllerService, ListingDTO, SearchRequest } from '@/api/backend';
import { ref, watch, watchEffect, computed } from 'vue';

import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { BiArrowLeftSquareFill, BiArrowRightSquareFill } from 'oh-vue-icons/icons';
import ListingFilter from '@/components/Listing/ListingFilter.vue';
import { ListingFilterType } from '@/components/Listing/ListingFilter.vue';
import ListingList from '@/components/Listing/ListingList.vue';
import { useI18n } from 'vue-i18n';
import TabSelector from '@/components/Listing/TabSelector.vue';
import ListingMap from '@/components/Listing/ListingMap.vue';
import handleUnknownError from '@/components/Exceptions/unkownErrorHandler';
import { useErrorStore } from '@/stores/ErrorStore';
import { useRouter } from 'vue-router';

const { t } = useI18n();

const errorStore = useErrorStore();
const router = useRouter();

addIcons(BiArrowLeftSquareFill, BiArrowRightSquareFill);

const pageSize = 24;
const firstPage = 1;

const currentPage = ref(firstPage);
const showFilter = ref(false);

const filterData = ref<ListingFilterType>({
  searchMessage: '',
  searchRequests: [],
  categoryRequest: undefined,
  priceRequest: undefined,
  sortRequests: [],
});

const tabs = ref([
  { id: 'List', name: 'ListingListView.list'},
  { id: 'Map', name: 'ListingListView.map'},
]);

const activeTab = ref('List');

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
      if (error.status === 401) {
        router.push({ name: 'login' });
      }
      const message = handleUnknownError(error);
      errorStore.addError(message);
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
  margin: 4rem 0rem;
  width: 100%;
}

.tab-selector {
  margin: auto !important;
  margin-bottom: 2em !important;
}
.mobile-buttons {
  display: none;
}

.pagination-number {
  margin: 0 1rem;
  font-size: x-large;
}

.page-content {
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 3rem;
  width: 100%;
}

.buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media screen and (max-width: 768px) {
  .page-content {
    display: block;
  }

  .form {
    margin-top: 0;
    margin-bottom: 0;
    border-bottom: var(--secondary-color) 2px solid;

    box-shadow: none;
  }

  .list-container {
    margin: 0;
  }

  .buttons {
    display: none;
  }

  .mobile-buttons {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 1rem 0;
    padding: 0.5em;
  }

  .show {
    display: flex;
  }

  .desktop {
    display: none;
  }
}
</style>
