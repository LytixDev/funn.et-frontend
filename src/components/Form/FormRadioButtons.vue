<template>
  <div :class="radioWrapperClass">
    <fieldset>
      <legend>{{ legendText }}</legend>
      <div :class="radioClass" :data-test-id="dataTestId" v-for="radioButton in radioButtons" :key="radioButton.key">
        <input
          :id="radioButton.key"
          :name="radioButton?.name"
          type="radio"
          :value="radioButton.value"
          v-model="radioButton.vModel"
          :data-testid="radioButton.dataTestId" />
        <label :for="radioButton.key">{{ radioButton.value }}</label>
      </div>
    </fieldset>
    <div v-if="error" :data-testid="dataTestId + '-error'" id="error">{{ errorMessage }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { FormRadioButtonClasses, FormInputWrapperClasses } from '@/enums/FormEnums';
import { RadioButton } from '@/types/FormTypes';

export default defineComponent({
  props: {
    radioWrapperClass: {
      type: String as PropType<FormInputWrapperClasses>,
      required: false,
      default: FormInputWrapperClasses.FormInputRadio,
    },
    legendText: {
      type: String,
      required: true,
    },
    radioButtons: {
      type: Array<RadioButton>,
      required: true,
    },
    radioClass: {
      type: String as PropType<FormRadioButtonClasses>,
      required: false,
      default: FormRadioButtonClasses.Horizontal,
    },
    error: {
      type: Boolean,
      required: false,
      default: false,
    },
    errorMessage: {
      type: String,
      required: false,
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
    Create style for form radio buttons
-->
