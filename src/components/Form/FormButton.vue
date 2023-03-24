<template>
  <button
    :class="{ formButtonClass: true, disabled: disabled }"
    :id="buttonId"
    :type="buttonType"
    _value="buttonValue"
    :data-testid="dataTestid"
    :disabled="disabled">
    {{ buttonText }}
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { FormButtonClasses, FormButtonTypes } from '@/enums/FormEnums';

export default defineComponent({
  props: {
    buttonId: {
      type: String,
      required: true,
    },
    buttonText: {
      type: String,
      required: true,
    },
    buttonType: {
      type: String as PropType<FormButtonTypes>,
      required: false,
      default: FormButtonTypes.Submit,
    },
    buttonValue: {
      type: String,
      required: false,
      default: 'Submit',
    },
    formButtonClass: {
      type: String as PropType<FormButtonClasses>,
      required: false,
      default: FormButtonClasses.Default,
    },
    dataTestid: {
      type: String,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
});
</script>

<!-- 
    TODO
    Create style for form buttons
-->
