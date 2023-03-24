import { mount, VueWrapper } from '@vue/test-utils';
import { describe, test, expect, beforeEach } from 'vitest';
import ListingListView from '@/views/Listing/ListingFilteredView.vue';
import { i18n } from '@/main';

import { routes } from '@/router';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

describe('Testing listing list view', async () => {
  router.push('/');
  await router.isReady();
  let wrapper: VueWrapper;
  beforeEach(() => {
    wrapper = mount(ListingListView, {
      global: {
        plugins: [i18n, router],
      },
    });
  });

  test('Has filters for search, category, price and sorting', () => {
    expect(wrapper.find("[data-testid='search-filter']")).toBeTruthy();
    expect(wrapper.find("[data-testid='category-filter']")).toBeTruthy();
    expect(wrapper.find("[data-testid='min-price-filter']")).toBeTruthy();
    expect(wrapper.find("[data-testid='max-price-filter']")).toBeTruthy();
    expect(wrapper.find("[data-testid='sort-filter']")).toBeTruthy();
    expect(wrapper.findAll('input')).toHaveLength(3);
    expect(wrapper.findAll('select')).toHaveLength(2);
  });
});
