<template>
  <div :class="ddlWrapperClass">
    <label :id="labelId" :for="fieldId">{{ labelText }}</label>
    <div :class="ddlClass">
      <select
        :data-test-id="dataTestId"
        :id="fieldId"
        :name="fieldName"
        v-model="fieldModelValue"
        :required="fieldRequired">
        <option v-for="option in fieldOptions" v-bind:key="option.key" v-bind:value="option.value">
          {{ option.value }}
        </option>
        <option value="" disabled selected hidden>Select an option</option>
        <option value="all" v-if="optionAll">All</option>
        <option value="none" v-if="optionNone">None</option>
      </select>
    </div>
    <div v-if="error" :data-testid="dataTestId + '-error'" id="error">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { FormDropdownClasses, FormInputWrapperClasses } from '../../enums/FormEnums';
import { DropDownItem } from '../../types/FormTypes';

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
    fieldModelValue: {
      type: String,
      required: true,
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
    Create style for form dropdown list
-->
