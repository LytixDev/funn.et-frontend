<template>
  <div :class="inputWrapperClass">
    <label :for="fieldId" :id="labelId">{{ labelText }}</label>
    <component
      :is="component"
      :placeholder="fieldPlaceholder"
      :data-testid="dataTestid"
      :id="fieldId"
      :type="fieldType"
      :value="modelValue"
      :required="fieldRequired"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
    <div v-if="error" :data-testid="dataTestid + '-error'" id="error">
      {{ error }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { FormInputTypes, FormInputWrapperClasses } from '@/enums/FormEnums';

export default defineComponent({
  props: {
    inputWrapperClass: {
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
    modelValue: {
      type: String,
      required: true,
      default: '',
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
    dataTestid: {
      type: String,
      required: false,
    },
    error: {
      type: String,
      required: false,
    },
  },
  computed: {
    component(): string {
      switch (this.inputWrapperClass) {
        case FormInputWrapperClasses.FormInputTextArea:
          return 'textarea';
        default:
          return 'input';
      }
    },
  },
});
</script>

<!-- 
    TODO
    Create style for form input
-->
