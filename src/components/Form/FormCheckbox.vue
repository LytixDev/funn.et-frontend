<template>
  <div :class="checkboxWrapperClass">
    <fieldset>
      <legend>{{ legendText }}</legend>
      <div v-for="checkbox in checkboxes" :key="checkbox.key" :class="checkBoxClass">
        <input
          :id="checkbox.key"
          :name="checkbox?.name"
          type="radio"
          :value="checkbox.value"
          v-model="checkbox.vModel"
          :data-testid="checkbox.dataTestId" />
        <label :for="checkbox.key">{{ checkbox.value }}</label>
      </div>
    </fieldset>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { FormInputWrapperClasses, FormCheckboxClasses } from '@/enums/FormEnums';
import { Checkbox } from '@/types/FormTypes';

export default defineComponent({
  props: {
    checkboxWrapperClass: {
      type: String as PropType<FormInputWrapperClasses>,
      required: false,
      default: FormInputWrapperClasses.FormInputCheckBox,
    },
    legendText: {
      type: String,
      required: true,
    },
    checkboxes: {
      type: Array<Checkbox>,
      required: true,
    },
    checkBoxClass: {
      type: String as PropType<FormCheckboxClasses>,
      required: false,
      default: FormCheckboxClasses.Horizontal,
    },
  },
});
</script>

<!--
    TODO: 
    Style the checkbox component
-->
