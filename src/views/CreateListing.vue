<template>
  <h2>Create a new listing</h2>

  <form @submit.prevent="submit">
    <fieldset>
      <FormInput
        labelId="listing-title-label"
        :labelText="$t('CreateListingView.title')"
        fieldId="listing-title"
        v-model="title"
        :error="errors?.title"
        fieldRequired
        dataTestId="listing-title" />
      <FormInput
        labelId="listing-brief-description-label"
        :labelText="$t('CreateListingView.briefDescription')"
        fieldId="listing-brief-description"
        v-model="briefDescription"
        :error="errors?.briefDescription"
        fieldRequired
        dataTestId="listing-brief-description" />
      <FormInput
        labelId="listing-description-label"
        :labelText="$t('CreateListingView.description')"
        fieldId="listing-description"
        v-model="description"
        :error="errors?.description"
        fieldRequired
        dataTestId="listing.description"
        :inputWrapperClass="FormInputWrapperClasses.FormInputTextArea" />
      <FormInput
        labelId="listing-price-label"
        :labelText="$t('CreateListingView.price')"
        fieldId="listing-price"
        v-model="price"
        :error="errors?.price"
        fieldRequired
        dataTestId="listing-price" />
    </fieldset>

    <fieldset>
      <FormDropDownList
        labelId="listing-category-label"
        :labelText="$t('CreateListingView.category')"
        fieldId="listing-category"
        v-model="category"
        fieldRequired
        dataTestId="listing-category"
        fieldName="category"
        :fieldOptions="categories" />
    </fieldset>

    <fieldset>
      <FormInput
        labelId="listing-address-label"
        :labelText="$t('CreateListingView.address')"
        fieldId="listing-address-description"
        v-model="address"
        :error="errors?.address"
        fieldRequired
        dataTestId="listing-address" />
      <FormInput
        labelId="listing-city-label"
        :labelText="$t('CreateListingView.city')"
        fieldId="listing-city-description"
        v-model="city"
        :error="errors?.city"
        fieldRequired
        dataTestId="listing-city" />
      <FormInput
        labelId="listing-postcode-label"
        :labelText="$t('CreateListingView.postcode')"
        fieldId="listing-postcode-description"
        v-model="postcode"
        :error="errors?.postcode"
        fieldRequired
        dataTestId="listing-city" />
    </fieldset>

    <fieldset>
      <ImageUploader v-model="image" />
      <FormInput
        labelId="listing-image-description-label"
        :labelText="$t('CreateListingView.imageDescription')"
        fieldId="listing-image-description"
        v-model="imageDescription"
        dataTestId="listing-image-description" />

      <FormButton
        buttonId="create-listing-button"
        :buttonText="$t('CreateListingView.submit')"
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
import { object as yupObject, string as yupString, number as yupNumber } from 'yup';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { ListingDTO } from '@/api';
import { ListingControllerService } from '@/api';
import { useUserInfoStore } from '@/stores/UserStore';

const { t } = useI18n();
const userStore = useUserInfoStore();

const schema = computed(() =>
  yupObject({
    title: yupString().required(t('CreateListingView.Error.titleRequired')),
    briefDescription: yupString()
      .required(t('CreateListingView.Error.briefDescriptionRequired'))
      .max(128, t('CreateListingView.Error.briefDescriptionMax')),
    description: yupString().max(512, t('CreateListingView.Error.descriptionMax')),
    price: yupNumber()
      .required(t('CreateListingView.Error.priceRequired'))
      .min(0, t('CreateListingView.Error.priceMin')),
    category: yupString().default('other'),
    address: yupString().required(t('CreateListingView.Error.addressRequired')),
    city: yupString().required(t('CreateListingView.Error.cityRequired')),
    postcode: yupString().required(t('CreateListingView.Error.postcodeRequired')).min(4).max(4),
    image: yupString(),
    imageDescription: yupString(),
  }),
);

const { handleSubmit, errors } = useForm({
  validationSchema: schema,
});

const submit = handleSubmit((values) => {
  console.log(values)
  let payload = {
    id: undefined,
    username: userStore.username,
    location: undefined,
    title: values.title,
    briefDescription: values.briefDescription,
    fullDescription: values.description,
    category: values.category,
    price: values.price,
    publicationDate: undefined,
    expirationDate: undefined,
    imageResponse: undefined,
    imageUpload: undefined,
  } as ListingDTO;

  ListingControllerService.createListing({ requestBody: payload })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
});

const categories = computed(() => {
  const listOfCategories = [] as DropDownItem[];
  for (const value in ListingDTO.category) {
    listOfCategories.push({
      value: value,
      displayedValue: t('ListingListView.Categories.' + value),
    });
  }
  return listOfCategories;
});

const { value: title } = useField('title') as FieldContext<string>;
const { value: briefDescription } = useField('briefDescription') as FieldContext<string>;
const { value: description } = useField('description') as FieldContext<string>;
const { value: price } = useField('price') as FieldContext<string>;
const { value: category } = useField('category') as FieldContext<string>;
const { value: address } = useField('address') as FieldContext<string>;
const { value: postcode } = useField('postcode') as FieldContext<string>;
const { value: city } = useField('city') as FieldContext<string>;
const { value: image } = useField('image') as FieldContext<string>;
const { value: imageDescription } = useField('imageDescription') as FieldContext<string>;
</script>

<style scoped></style>
