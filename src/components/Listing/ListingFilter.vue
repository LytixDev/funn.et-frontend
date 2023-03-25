<template>
  <div class="listing-filters">
    <form-input
      labelId="listing-search-label"
      fieldId="liting-search"
      :labelText="$t('ListingListView.searchLabel') + ': '"
      v-model="searchMessage"
      data-testid="search-filter" />
    <form-drop-down-list
      labelId="listing-category-label"
      fieldId="listing-category"
      :labelText="$t('ListingListView.categoryLabel') + ': '"
      v-model="chosenCategory"
      field-name="category-filter"
      :field-options="categories"
      option-all
      data-testid="category-filter" />
    <span>
      <!--Two inputs to select price between with form-input -->
      <form-input
        labelId="listing-price-min-label"
        fieldId="listing-price-min"
        :labelText="$t('ListingListView.priceMinLabel') + ': '"
        :field-type="FormInputTypes.Number"
        v-model="priceMin"
        data-testid="min-price-filter" />
      <form-input
        labelId="listing-price-max-label"
        fieldId="listing-price-max"
        :labelText="$t('ListingListView.priceMaxLabel') + ': '"
        :field-type="FormInputTypes.Number"
        v-model="priceMax"
        data-testid="max-price-filter" />
    </span>
    <form-drop-down-list
      labelId="listing-sorting-label"
      fieldId="listing-sorting"
      :labelText="$t('ListingListView.sortingLabel') + ': '"
      v-model="chosenSorting"
      field-name="sorting"
      :field-options="sortingOptions"
      data-testid="sorting-drop-down" />
  </div>
</template>

<script lang="ts">
export interface ListingFilterType {
  searchMessage: string;
  searchRequests: FilterRequest[];
  categoryRequest?: FilterRequest;
  priceRequest?: FilterRequest;
  sortRequests: SortRequest[];
}
</script>

<script setup lang="ts">
import FormInput from '@/components/Form/FormInput.vue';
import { FilterRequest, ListingControllerService, ListingDTO, SearchRequest, SortRequest } from '@/api/backend';
import { ref, watch, watchEffect, computed } from 'vue';
import { ComputedRef } from '@vue/reactivity';
import FormDropDownList from '@/components/Form/FormDropDownList.vue';
import { DropDownItem } from '@/types/FormTypes';
import { useI18n } from 'vue-i18n';
import { FormInputTypes } from '@/enums/FormEnums';

const { t } = useI18n();

defineProps({ modelValue: { type: Object as () => ListingFilterType } });

const emit = defineEmits(['update:modelValue']);

// Category filters
const categories = computed(() => {
  const listOfCategories = [] as DropDownItem[];
  for (const value in ListingDTO.category) {
    listOfCategories.push({
      value: value,
      displayedValue: t('ListingListView.Categories.' + value),
    });
  }
  return listOfCategories;
});

const chosenCategory = ref('');
let categoryRequest = computed(() =>
  chosenCategory.value == '' || chosenCategory.value == 'all'
    ? undefined
    : ({
        keyWord: 'category',
        value: chosenCategory.value,
        operator: FilterRequest.operator.EQUAL,
        fieldType: FilterRequest.fieldType.STRING,
      } as FilterRequest),
);

// Search filter
const searchMessage = ref('');

const searchFields = ['title', 'briefDescription'];
let searchRequests = [] as ComputedRef<FilterRequest>[];
for (let i = 0; i < searchFields.length; i++) {
  searchRequests.push(
    computed(
      () =>
        ({
          keyWord: searchFields[i],
          value: searchMessage.value,
          operator: FilterRequest.operator.LIKE,
          fieldType: FilterRequest.fieldType.STRING,
        } as FilterRequest),
    ),
  );
}

// Price filter
const priceMin = ref('');
const priceMax = ref('');
let priceRequest = computed(() =>
  priceMin.value == '' && priceMax.value == ''
    ? undefined
    : ({
        keyWord: 'price',
        value: priceMin.value == '' ? 0 : priceMin.value,
        valueTo: priceMax.value == '' ? Number.MAX_VALUE : priceMax.value,
        operator: FilterRequest.operator.BETWEEN,
        fieldType: FilterRequest.fieldType.DOUBLE,
      } as FilterRequest),
);

// Sort listings
const chosenSorting = ref(`publicationDate|${SortRequest.sortDirection.DESC}`);
const sortingFields = ['price', 'title', 'publicationDate'];
const sortingOptions = computed(() => {
  const listOfSortingOptions = [] as DropDownItem[];
  for (let i = 0; i < sortingFields.length; i++) {
    const field = sortingFields[i];
    listOfSortingOptions.push(
      ...[
        {
          value: `${field}|${SortRequest.sortDirection.ASC}`,
          displayedValue: t(`ListingListView.Sorting.${field}Asc`),
        },
        {
          value: `${field}|${SortRequest.sortDirection.DESC}`,
          displayedValue: t(`ListingListView.Sorting.${field}Desc`),
        },
      ],
    );
  }
  return listOfSortingOptions;
});

let sortRequests = computed(() => {
  const sortRequests = [] as SortRequest[];
  if (chosenSorting.value !== '') {
    const [field, direction] = chosenSorting.value.split('|');
    sortRequests.push({
      keyWord: field,
      sortDirection: direction === 'ASC' ? SortRequest.sortDirection.ASC : SortRequest.sortDirection.DESC,
    });
  }
  return sortRequests.length > 0 ? sortRequests : undefined;
});

watch([searchMessage, chosenCategory, priceMin, priceMax, chosenSorting], () => {
  emit('update:modelValue', {
    searchMessage: searchMessage.value,
    searchRequests: searchRequests.map((request) => request.value),
    categoryRequest: categoryRequest.value,
    priceRequest: priceRequest.value,
    sortRequests: sortRequests.value,
  });
});
</script>

<style scoped>
.listing-filters {
  margin: 2rem;
  display: flex;
  justify-content: space-between;
}
</style>
