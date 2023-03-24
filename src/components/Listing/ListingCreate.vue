<template>
  <h2>{{ $t('navigation.createListing') }}</h2>

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
        :field-type="FormInputTypes.Number"
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
      <create-location-form v-model="location" />
    </fieldset>

    <p>Location: {{ location }}</p>

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
  <error-box v-model="errorMessage" />
</template>

<script lang="ts" setup>
import { useForm, useField, FieldContext } from 'vee-validate';
import FormInput from '@/components/Form/FormInput.vue';
import FormButton from '@/components/Form/FormButton.vue';
import { FormInputWrapperClasses } from '@/enums/FormEnums';
import FormDropDownList from '@/components/Form/FormDropDownList.vue';
import { DropDownItem } from '@/types/FormTypes';
import { FormInputTypes } from '@/enums/FormEnums';
import ImageUploader from '@/components/Form/ImageUploader.vue';
import { object as yupObject, string as yupString, number as yupNumber } from 'yup';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import ErrorBox from '@/components/Exceptions/ErrorBox.vue';
import { useRouter } from 'vue-router';
import { ListingControllerService, ListingCreateDTO, ListingDTO, LocationCreateDTO, LocationControllerService, LocationResponseDTO } from '@/api';
import { useUserInfoStore } from '@/stores/UserStore';
import CreateLocationForm from '@/components/Location/CreateLocationForm.vue';

const { t } = useI18n();
const router = useRouter();
const userStore = useUserInfoStore();
const username = computed(() => userStore.username);
const errorMessage = ref('');

const schema = computed(() =>
  yupObject({
    title: yupString()
      .required(t('CreateListingView.Error.titleRequired'))
      .max(256, t('CreateListingView.Error.titleMax')),
    briefDescription: yupString()
      .required(t('CreateListingView.Error.briefDescriptionRequired'))
      .min(32, t('CreateListingView.Error.briefDescriptionMin'))
      .max(128, t('CreateListingView.Error.briefDescriptionMax')),
    description: yupString().max(512, t('CreateListingView.Error.descriptionMax')),
    price: yupNumber()
      .required(t('CreateListingView.Error.priceRequired'))
      .min(0, t('CreateListingView.Error.priceMin')),
    category: yupString().default('OTHER'),
    location: yupString().required(t('CreateListingView.Error.locationRequired')),
  }),
);

const location = ref({} as LocationCreateDTO);

const { handleSubmit, errors } = useForm({
  validationSchema: schema,
});

const submit = handleSubmit((values) => {
  /* This code was written by a soidev. Probably callum. */
  const date: Date = new Date();
  let day: string = date.getDate().toString();
  if (day.length == 1) day = '0'.concat(day);
  let month: string = (date.getMonth() + 1).toString();
  if (month.length == 1) month = '0'.concat(month);
  const dateStr: string = date.getFullYear() + '-' + month + '-' + date.getDate();

  const imageResponse = [] as Array<Blob>;
  imageResponse.push(values.image.data);
  const imageAltResponse = [] as Array<string>;
  if (values.image.alt) imageAltResponse.push(values.image.alt);

  let payload = {
    username: username.value,
    location: values.location,
    title: values.title,
    briefDescription: values.briefDescription,
    fullDescription: values.description,
    category: values.category,
    price: values.price,
    publicationDate: dateStr,
    expirationDate: dateStr,
    imageResponse: imageResponse,
    imageUpload: imageAltResponse.length > 0 ? imageAltResponse : undefined,
  } as ListingCreateDTO;

  ListingControllerService.createListing({ formData: payload })
    .then((response) => {
      router.push({ name: 'listing', params: { id: response.id } });
    })
    .catch((error) => {
      errorMessage.value = error.message;
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

const locations = await computed(async () => {
  const locationResponse: Array<LocationResponseDTO> = await LocationControllerService.getAllLocations();
  const ListOfLocations = [] as DropDownItem[];
  for (const value of locationResponse) {
    ListOfLocations.push({
      value: value.id.toString(),
      displayedValue: value.address.concat(', ').concat(value.city).concat(', ').concat(value.postCode.toString()),
    });
  }
  return ListOfLocations;
}).value;

const { value: title } = useField('title') as FieldContext<string>;
const { value: briefDescription } = useField('briefDescription') as FieldContext<string>;
const { value: description } = useField('description') as FieldContext<string>;
const { value: price } = useField('price') as FieldContext<string>;
const { value: category } = useField('category') as FieldContext<string>;
const { value: image } = useField('image') as FieldContext<string>;
const { value: imageDescription } = useField('imageDescription') as FieldContext<string>;
</script>

<style scoped></style>
