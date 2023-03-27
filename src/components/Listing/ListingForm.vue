<template>
  <form @submit.prevent="submit" class="form" enctype="multipart/form-data">
    <h2>{{ $t(`navigation.${formType === 'create' ? 'create' : 'edit'}Listing`) }}</h2>
    <FormInput
      labelId="listing-title-label"
      :labelText="$t('ListingForm.title')"
      fieldId="listing-title"
      v-model="title"
      :error="errors?.title"
      fieldRequired
      dataTestId="listing-title" />
    <div class="break"></div>
    <div class="image-upload">
      <h3>Last opp bilder</h3>
      <ImageUploader v-model="images" />
      <div v-for="(image, key) in images" class="images">
        <div class="mini-break"></div>
        <img :src="image.url" />
        <button type="button" @click="images.splice(key, 1)">{{ $t('ListingForm.removeImage') }}</button>
        <FormInput
          :key="key"
          :labelId="'listing-image-description-label-'.concat(key.toString())"
          :labelText="$t('ListingForm.imageDescription').concat(' for ').concat(image.name)"
          :fieldId="'listing-image-description-'.concat(key.toString())"
          v-model="images[key].alt"
          :dataTestId="'listing-image-description-'.concat(key.toString())" />
      </div>
    </div>
    <div class="break"></div>
    <FormInput
      labelId="listing-brief-description-label"
      :labelText="$t('ListingForm.briefDescription')"
      fieldId="listing-brief-description"
      v-model="briefDescription"
      :error="errors?.briefDescription"
      fieldRequired
      dataTestId="listing-brief-description" />
    <FormInput
      labelId="listing-description-label"
      :labelText="$t('ListingForm.description')"
      fieldId="listing-description"
      v-model="description"
      :error="errors?.description"
      dataTestId="listing.description"
      :inputWrapperClass="FormInputWrapperClasses.FormInputTextArea" />
    <FormInput
      labelId="listing-price-label"
      :labelText="$t('ListingForm.price')"
      fieldId="listing-price"
      v-model="price"
      :error="errors?.price"
      :field-type="FormInputTypes.Number"
      fieldRequired
      dataTestId="listing-price" />

    <CategoryDropDownList v-model:category="categoryId" />

    <div class="break"></div>

    <error-boundary-catcher>
      <div>{{ errors?.location }}</div>
      <create-location-form v-model="location" />
    </error-boundary-catcher>

    <div class="break"></div>
    <FormButton
      :buttonId="`${formType}-listing-button`"
      :buttonText="$t(`ListingForm.submit${formType}`)"
      :dataTestId="`${formType}-listing-button`"
      @click="submit" />
  </form>
  <error-box v-model="errorMessage" />
</template>

<script lang="ts" setup>
import { useForm, useField, FieldContext } from 'vee-validate';
import FormInput from '@/components/Form/FormInput.vue';
import FormButton from '@/components/Form/FormButton.vue';
import { FormInputWrapperClasses } from '@/enums/FormEnums';
import { DropDownItem } from '@/types/FormTypes';
import { FormInputTypes } from '@/enums/FormEnums';
import ImageUploader, { Image as ImageUpload } from '@/components/Form/ImageUploader.vue';
import { object as yupObject, string as yupString, number as yupNumber } from 'yup';
import { computed, PropType, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import ErrorBox from '@/components/Exceptions/ErrorBox.vue';
import { CategoryControllerService, ListingCreateDTO, LocationResponseDTO } from '@/api/backend';
import CategoryDropDownList from '@/components/Form/CategoryDropDownList.vue';
import { useUserInfoStore } from '@/stores/UserStore';
import CreateLocationForm from '@/components/Location/CreateLocationForm.vue';
import ErrorBoundaryCatcher from '@/components/Exceptions/ErrorBoundaryCatcher.vue';

const { t } = useI18n();
const userStore = useUserInfoStore();
const username = computed(() => userStore.username);
const errorMessage = ref('');

type OnSubmitFunction = (payload: ListingCreateDTO) => void;

const { listingPayload, onSubmit, foundLocation, formType, intialImages } = defineProps({
  listingPayload: {
    type: Object as () => ListingCreateDTO,
    required: false,
  },
  onSubmit: {
    type: Function as PropType<OnSubmitFunction>,
    required: true,
  },
  foundLocation: {
    type: Object as () => LocationResponseDTO,
    required: false,
  },
  formType: {
    type: String as PropType<'create' | 'update'>,
    required: false,
    default: 'create',
  },
  intialImages: {
    type: Array<ImageUpload>,
    required: false,
    default: [],
  },
});

const schema = computed(() =>
  yupObject({
    title: yupString().required(t('ListingForm.Error.titleRequired')).max(256, t('ListingForm.Error.titleMax')),
    briefDescription: yupString()
      .required(t('ListingForm.Error.briefDescriptionRequired'))
      .max(128, t('ListingForm.Error.briefDescriptionMax')),
    description: yupString().max(512, t('ListingForm.Error.descriptionMax')),
    price: yupNumber().required(t('ListingForm.Error.priceRequired')).min(0, t('ListingForm.Error.priceMin')),
    category: yupString().default('OTHER'),
    location: yupObject<LocationResponseDTO>().required(t('ListingForm.Error.locationRequired')),
  }),
);

const { handleSubmit, errors } = useForm({
  validationSchema: schema,
});

const { value: title } = useField('title') as FieldContext<string>;
const { value: briefDescription } = useField('briefDescription') as FieldContext<string>;
const { value: description } = useField('description') as FieldContext<string>;
const { value: price } = useField('price') as FieldContext<string>;
const { value: categoryId } = useField('category') as FieldContext<number>;
const { value: location } = useField('location') as FieldContext<LocationResponseDTO>;
const { value: images } = useField('images') as FieldContext<ImageUpload[]>;

const submit = handleSubmit((values) => {
  const date: Date = new Date();
  let day: string = date.getDate().toString();
  if (day.length == 1) day = '0'.concat(day);
  let month: string = (date.getMonth() + 1).toString();
  if (month.length == 1) month = '0'.concat(month);
  const dateStr: string = date.getFullYear() + '-' + month + '-' + date.getDate();

  const images = [] as Array<Blob>;
  values.images.forEach((image: any) => {
    images.push(new Blob([image.data], { type: image.type }));
  });
  const imageAlts = [] as Array<string>;
  values.images.forEach((image: any) => {
    imageAlts.push(image.alt || '');
  });
  let payload = {
    username: username.value,
    location: values.location.id,
    title: values.title,
    briefDescription: values.briefDescription,
    fullDescription: values.description,
    category: values.category,
    price: values.price,
    publicationDate: dateStr,
    expirationDate: dateStr,
    images: images,
    imageAlts: imageAlts,
    status: listingPayload?.status || 'ACTIVE',
  } as ListingCreateDTO;

  onSubmit(payload);
});

let listOfCategories = ref([] as DropDownItem[]);
const response = await CategoryControllerService.getAllCategories();
response.forEach((category) => {
  listOfCategories.value.push({ value: category.id.toString(), displayedValue: category.name });
});

images.value = [];
if (foundLocation) {
  location.value = foundLocation!!;
}
if (listingPayload) {
  title.value = listingPayload.title;
  briefDescription.value = listingPayload.briefDescription;
  description.value = listingPayload.fullDescription ?? '';
  price.value = listingPayload.price?.toString() ?? '';
  categoryId.value = listingPayload.category.id ?? 0;
  images.value = intialImages;
}
</script>

<style scoped>
.form {
  width: 100%;
}

img {
  width: min(500px, 100%);
}

.images {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
}

.break {
  background-color: var(--primary-color);
  width: 100%;
  height: 2px;
  margin: 1rem 0;
}

.mini-break {
  background-color: var(--secondary-color);
  width: 100%;
  height: 1px;
  margin: 0.5rem 0;
}

.image-upload {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
}
</style>
