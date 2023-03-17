<template>
  <button :class="formButtonClass" :id="buttonId" :type="buttonType" _value="buttonValue" :data-testid="dataTestId">
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
    dataTestId: {
      type: String,
      required: false,
    },
  },
});
</script>

<!-- 
    TODO
    Create style for form buttons
-->
