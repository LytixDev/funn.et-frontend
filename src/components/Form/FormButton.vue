<template>
  <button class="form-button" :id="buttonId" :type="buttonType" _value="buttonValue" :data-testid="dataTestId">
    {{ buttonText }}
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { FormButtonTypes } from '../../enums/FormEnums';

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
    dataTestId: {
      type: String,
      required: false,
    },
  },
});
</script>

<!-- 
    TODO
    Create style for form input
-->
