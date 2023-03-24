import { describe, test, expect, beforeEach } from 'vitest';
import { shallowMount, mount, VueWrapper, RouterLinkStub } from '@vue/test-utils';
import ErrorBox from '@/components/Exceptions/ErrorBox.vue';
import { i18n } from '@/main';

describe('Test error box message', async () => {
  test('Clicking minus button on error message hides it', async () => {
    const wrapper = mount(ErrorBox, {
      props: {
        modelValue: 'Error message',
        'onUpdate:modelValue': (e: string) => wrapper.setProps({ modelValue: e }),
      },
      global: {
        plugins: [i18n],
      },
    });

    expect(wrapper.find('div').isVisible()).toBe(true);
    await wrapper.find('[data-testid="hide-button"]').trigger('click');
    expect(wrapper.find('[data-testid="hide-button"]').exists()).toBe(false);
  });

  test('Error message is not shown if message prop is empty', () => {
    const wrapper = mount(ErrorBox, {
      props: {
        modelValue: '',
        'onUpdate:modelValue': (e: string) => wrapper.setProps({ modelValue: e }),
      },
      global: {
        plugins: [i18n],
      },
    });

    expect(wrapper.find('div').exists()).toBe(false);
  });
});
