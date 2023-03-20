import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ErrorBox from '@/components/Exceptions/ErrorBox.vue';

describe('Test error box message', () => {
  test('Clicking minus button on error message hides it', async () => {
    const wrapper = mount(ErrorBox, {
      props: {
        message: 'Error message',
      },
    });

    expect(wrapper.find('div').isVisible()).toBe(true);
    await wrapper.find('[data-testid="hide-button"]').trigger('click');
    expect(wrapper.find('div').exists()).toBe(false);
  });

  test('Error message is not shown if message prop is empty', () => {
    const wrapper = mount(ErrorBox, {
      props: {
        message: '',
      },
    });

    expect(wrapper.find('div').exists()).toBe(false);
  });
});
