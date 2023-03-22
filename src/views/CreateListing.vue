<template>
  <h2>Create a new listing</h2>

  <form @submit.prevent="submit">
    <fieldset>
      <FormInput
        labelId="listing-title-label"
        labelText="Title"
        fieldId="listing-title"
        v-model="title"
        fieldRequired
        dataTestId="listing-title" />
      <FormInput
        labelId="listing-brief-description-label"
        labelText="Brief description"
        fieldId="listing-brief-description"
        v-model="briefDescription"
        fieldRequired
        dataTestId="listing-brief-description" />
      <FormInput
        labelId="listing-description-label"
        labelText="Full description"
        fieldId="listing-description"
        v-model="description"
        fieldRequired
        dataTestId="listing.description"
        :inputWrapperClass="FormInputWrapperClasses.FormInputTextArea" />
      <FormInput
        labelId="listing-price-label"
        labelText="Price"
        fieldId="listing-price"
        v-model="price"
        fieldRequired
        dataTestId="listing-price" />

      <FormDropDownList
        labelId="listing-category-label"
        labelText="Category"
        fieldId="listing-category"
        v-model="category"
        fieldRequired
        dataTestId="listing-category"
        fieldName="category"
        :fieldOptions="categories" />

      <ImageUploader v-model="image" />
      <FormInput
        labelId="listing-image-description-label"
        labelText="Image description"
        fieldId="listing-image-description"
        v-model="imageDescription"
        dataTestId="listing-image-description" />

      <FormButton
        buttonId="create-listing-button"
        buttonText="Create Listing"
        dataTestId="create-listing-button"
        @click="submit" />
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
import { useForm, useField, FieldContext } from 'vee-validate';
import FormInput from '@/components/Form/FormInput.vue';
import FormButton from '@/components/Form/FormButton.vue';
import { FormInputWrapperClasses } from '@/enums/FormEnums';
import FormDropDownList from '@/components/Form/FormDropDownList.vue';
import { DropDownItem } from '@/types/FormTypes';
import ImageUploader from '@/components/Form/ImageUploader.vue';

const { handleSubmit, errors } = useForm();
const { value: title } = useField('title') as FieldContext<string>;
const { value: briefDescription } = useField('briefDescription') as FieldContext<string>;
const { value: description } = useField('description') as FieldContext<string>;
const { value: price } = useField('price') as FieldContext<string>;
const { value: category } = useField('category') as FieldContext<string>;
const { value: image } = useField('image') as FieldContext<string>;
const { value: imageDescription } = useField('imageDescription') as FieldContext<string>;

//TODO: use the enum gatheren from the backend
const categories: Array<DropDownItem> = [
  { value: 'electronics', displayedValue: 'Electronics' } as DropDownItem,
  { value: 'clothing', displayedValue: 'Clothing' } as DropDownItem,
  { value: 'books', displayedValue: 'Books' } as DropDownItem,
  { value: 'sports', displayedValue: 'Sports' } as DropDownItem,
  { value: 'furniture', displayedValue: 'Furniture' } as DropDownItem,
  { value: 'other', displayedValue: 'Other' } as DropDownItem,
];

const submit = handleSubmit((values) => {
  console.log(values);
});
</script>

<style scoped></style>
