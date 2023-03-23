<template>
  <div :class="ddlWrapperClass">
    <label :id="labelId" :for="fieldId">{{ labelText }}</label>
    <div :class="ddlClass">
      <select
        :data-testid="dataTestid"
        :id="fieldId"
        :name="fieldName"
        :value="modelValue"
        :required="fieldRequired"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)">
        <option v-for="option in fieldOptions" :value="option.value">
          {{ option.displayedValue }}
        </option>
        <option value="" disabled selected hidden>{{ $t('Form.DropDownList.select') }}</option>
        <option value="all" v-if="optionAll">{{ $t('Form.DropDownList.all') }}</option>
        <option value="none" v-if="optionNone">{{ $t('Form.DropDownList.none') }}</option>
      </select>
    </div>
    <div v-if="error" :data-testid="dataTestid + '-error'" id="error">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { FormDropdownClasses, FormInputWrapperClasses } from '@/enums/FormEnums';
import { DropDownItem } from '@/types/FormTypes';

export default defineComponent({
  props: {
    ddlWrapperClass: {
      type: String as PropType<FormInputWrapperClasses>,
      required: false,
      default: FormInputWrapperClasses.FormInputDropdown,
    },
    ddlClass: {
      type: String as PropType<FormDropdownClasses>,
      required: false,
      default: FormDropdownClasses.Default,
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
    fieldName: {
      type: String,
      required: true,
    },
    fieldOptions: {
      type: Array<DropDownItem>,
      required: true,
    },
    optionAll: {
      type: Boolean,
      required: false,
      default: false,
    },
    optionNone: {
      type: Boolean,
      required: false,
      default: false,
    },
    dataTestid: {
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
    Create style for form dropdown list
-->
