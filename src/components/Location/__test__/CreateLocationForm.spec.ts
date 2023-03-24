import { mount } from '@vue/test-utils';
import { describe, test, expect } from 'vitest';
import CreateLocationForm from '@/components/Location/CreateLocationForm.vue';
import { i18n } from '@/main';
import {routes} from '@/router';
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

describe('Test with form for creating locations', () => {
  test('Form has a single search field to search for location', () => {
    const wrapper = mount(CreateLocationForm, {
      global: {
        plugins: [i18n, router],
        stubs: {
          LocationMap: {
            template: '<div />',
          }
        }
      },
    });
    expect(wrapper.findAll('input')).toHaveLength(1);
  });
});
