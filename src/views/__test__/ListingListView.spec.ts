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
        expect(wrapper.find("[data-test-id='search-filter']")).toBeTruthy();
        expect(wrapper.find("[data-test-id='category-filter']")).toBeTruthy();
        expect(wrapper.find("[data-test-id='min-price-filter']")).toBeTruthy();
        expect(wrapper.find("[data-test-id='max-price-filter']")).toBeTruthy();
        expect(wrapper.find("[data-test-id='sort-filter']")).toBeTruthy();
        expect(wrapper.findAll("input")).toHaveLength(3);
        expect(wrapper.findAll("select")).toHaveLength(2);

    });
})