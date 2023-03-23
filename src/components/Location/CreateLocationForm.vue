<template>
  <form @submit.prevent="submit">
    <!-- Inputs for creating location -->
    <form-input
      labelId="location-search-label"
      fieldId="location-search"
      :labelText="$t('CreateLocationForm.searchLabel') + ': '"
      v-model="address"
      data-testid="search-input" />

    <form-drop-down-list
      label-id="locations-label"
      field-id="locations-select"
      :label-text="$t('CreateLocationForm.locationsSelectLabel') + ': '"
      v-model="selectField"
      :field-options="locationOptions"
      field-name="locations-select"
      data-testid="locations-select"
      :error="errors?.select" />
    <form-button
      button-id="submit-button"
      :button-text="$t('CreateLocationForm.submitButton')"
      data-testid="submit-button" />
  </form>
  <p>{{ errorMessage }}</p>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { FormInputTypes } from '@/enums/FormEnums';
import 'leaflet/dist/leaflet.css';
import FormInput from '@/components/Form/FormInput.vue';
import { DefaultService, OutputAdresse, OutputAdresseList } from '@/api/geonorge';
import { LocationControllerService } from '@/api';
import FormDropDownList from '@/components/Form/FormDropDownList.vue';
import FormButton from '@/components/Form/FormButton.vue';
import { DropDownItem } from '@/types/FormTypes';
import { object as yupObject, string as yupString } from 'yup';
import { useForm, useField, FieldContext } from 'vee-validate';
import { useI18n } from 'vue-i18n';

const address = ref('');
const chosenLocation = ref('');

const errorMessage = ref('');

const locationOptions = ref([] as DropDownItem[]);
const locationList = ref([] as OutputAdresse[]);

const { t } = useI18n();

const schema = computed(() =>
  yupObject({
    select: yupString().required(t('CreateLocationForm.Error.AddressRequired')),
  }),
);

const { handleSubmit, errors } = useForm({
  validationSchema: schema,
});

const submit = handleSubmit(async (values) => {
  console.log(values);
  const location = locationList.value.at(locationList.value.map(location => location.adressekode?.toString()).indexOf(values.select))!!;
  LocationControllerService.createLocation({
    requestBody: {
      address: location.adressetekst!!,
      latitude: location.representasjonspunkt?.lat!!,
      longitude: location.representasjonspunkt?.lon!!,
      postCode: +(location.postnummer!!),
      city: location.poststed!!,
    }
  }).then(() => {
    console.log('Location created');
  }).catch((error: any) => {
    errorMessage.value = error.message;
  });
})

const { value: selectField } = useField('select') as FieldContext<string>;

watchEffect(async () => {
  if (address.value === '') {
    return;
  }
  let locations: OutputAdresseList | undefined;
  try {
    locations = await DefaultService.getSok({
      sok: address.value ?? '',
      fuzzy: true,
    });
  } catch (error: any) {
    errorMessage.value = error.message;
  }
  if (locations?.adresser === undefined || locations.metadata?.totaltAntallTreff === 0) {
    return;
  }
  locationList.value = locations.adresser!!;
  locationOptions.value = locationList.value.map((location: OutputAdresse) => ({
    value: location.adressekode!!.toString(),
    displayedValue: `${location.adressetekst} ${location.postnummer} ${location.poststed}`,
  }))!!;
  return;
});
</script>

<style scoped></style>
