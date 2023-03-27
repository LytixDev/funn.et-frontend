<template>
  <FormDropDownList
    labelId="listing-category-label"
    :labelText="$t('ListingForm.category')"
    fieldId="listing-category"
    :modelValue="addAllOption ? (category !== 0 ? category.toString() : '') : category.toString()"
    @update:modelValue="$emit('update:category', +$event)"
    fieldRequired
    dataTestid="listing-category"
    fieldName="category"
    :fieldOptions="listOfCategories" />
</template>

<script setup lang="ts">
import FormDropDownList from './FormDropDownList.vue';
import { DropDownItem } from '@/types/FormTypes';
import { ref } from 'vue';
import { CategoryControllerService } from '@/api/backend';
import { useRouter } from 'vue-router';
import { useUserInfoStore } from '@/stores/UserStore';
import { useErrorStore } from '@/stores/ErrorStore';
import handleUnknownError from '@/components/Exceptions/unkownErrorHandler';

const router = useRouter();
const userStore = useUserInfoStore();
const errorStore = useErrorStore();

const props = defineProps({
  category: {
    type: Number,
    required: true,
    default: 0,
  },
  addAllOption: {
    type: Boolean,
    required: false,
    default: false,
  },
});

let listOfCategories = ref([] as DropDownItem[]);
if (props.addAllOption) listOfCategories.value.push({ value: '0', displayedValue: 'All' });
/* promise noob */
const categories = async () => {
  try {
    const response = await CategoryControllerService.getAllCategories();
    response.forEach((category) => {
      listOfCategories.value.push({ value: category.id.toString(), displayedValue: category.name });
    });
  } catch (error: any) {
    if (error.status === 401) {
      setTimeout(() => {
        router.push({ name: 'login' });
        userStore.clearUserInfo();
      }, 100);
    }
    const message = handleUnknownError(error);
    errorStore.addError(message);
  }
};
categories();
</script>
