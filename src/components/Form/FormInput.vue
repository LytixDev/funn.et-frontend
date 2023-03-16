<template>
  <div :class="formWrapperClass">
    <label :for="fieldId" :id="labelId">{{ labelText }}</label>
    <input
      :placeholder="fieldPlaceholder"
      :data-testid="dataTestId"
      :id="fieldId"
      :type="fieldType"
      v-model="fieldModelValue"
      :required="fieldRequired" />
    <div v-if="error" id="error">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { FormInputTypes, FormInputWrapperClasses } from '../../enums/FormEnums';

export default defineComponent({
  props: {
    formWrapperClass: {
      type: String as PropType<FormInputWrapperClasses>,
      required: false,
      default: FormInputWrapperClasses.FormInput,
    },
    labelId: {
      type: String,
      required: true,
    },
    labelText: {
      type: String,
      required: true,
    },
    fieldId: {
      type: String,
      required: true,
    },
    fieldType: {
      type: String as PropType<FormInputTypes>,
      required: false,
      default: FormInputTypes.Text,
    },
    fieldModelValue: {
      type: String,
      required: true,
    },
    fieldRequired: {
      type: Boolean,
      required: false,
      default: false,
    },
    fieldPlaceholder: {
      type: String,
      required: false,
    },
    dataTestId: {
      type: String,
      required: false,
    },
    error: {
      type: String,
      required: false,
    },
    errorMessage: {
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
