import { mount, VueWrapper } from '@vue/test-utils';
import { describe, test, expect, beforeEach } from 'vitest';
import ListingListView from '@/views/Listings/ListingListView.vue';
import { i18n } from '@/main';

describe("Testing listing list view", () => {
    let wrapper: VueWrapper;
    beforeEach(() => {
        wrapper = mount(ListingListView, {
            global: {
                plugins: [i18n],
            },
        });
    })

    test('Has filters for search, category, price and sorting', () => {
        expect(wrapper.find("[data-testid='search-filter']")).toBeTruthy();
        expect(wrapper.find("[data-testid='category-filter']")).toBeTruthy();
        expect(wrapper.find("[data-testid='min-price-filter']")).toBeTruthy();
        expect(wrapper.find("[data-testid='max-price-filter']")).toBeTruthy();
        expect(wrapper.find("[data-testid='sort-filter']")).toBeTruthy();
        expect(wrapper.findAll("input")).toHaveLength(3);
        expect(wrapper.findAll("select")).toHaveLength(2);

    });
})