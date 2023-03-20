import { mount } from '@vue/test-utils';
import { describe, test, expect } from 'vitest';
import NotFoundView from '@/views/NotFoundView.vue';
import { i18n } from '@/main';

describe('NotFoundView', () => {
  test('Has two buttons in not found component', () => {
    const wrapper = mount(NotFoundView, {
      global: {
        plugins: [i18n],
      },
    });
    expect(wrapper.findAll('button')).toHaveLength(2);
  });
});
