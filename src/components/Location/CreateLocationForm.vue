<template>
  <form @submit.prevent="">
    <!-- Inputs for creating location -->
    <form-input
      labelId="location-address-label"
      fieldId="location-address"
      :labelText="$t('CreateLocationForm.addressLabel') + ': '"
      v-model="address"
      data-testid="address-input" />
    <form-input
      labelId="location-postcode-label"
      fieldId="location-postcode"
      :labelText="$t('CreateLocationForm.postcodeLabel') + ': '"
      :field-type="FormInputTypes.Number"
      v-model="postCode"
      data-testid="postcode-input" />
    <form-input
      labelId="location-city-label"
      fieldId="location-city"
      :labelText="$t('CreateLocationForm.cityLabel') + ': '"
      v-model="city"
      data-testid="city-input" />
    <form-drop-down-list
      label-id="locations-label"
      field-id="locations-select"
      :label-text="$t('CreateLocationForm.locationsSelectLabel') + ': '"
      v-model="chosenLocation"
      :field-options="locationOptions"
      field-name="locations-select"
      data-testid="locations-select" />
      <form-button
        button-id="submit-button"
        :button-text="$t('CreateLocationForm.submitButton')"
        data-testid="submit-button" />
  </form>
  <p>{{ errorMessage }}</p>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { FormInputTypes } from '@/enums/FormEnums';
import 'leaflet/dist/leaflet.css';
import FormInput from '@/components/Form/FormInput.vue';
import { DefaultService, OutputAdresse, OutputAdresseList } from '@/api/geonorge';
import FormDropDownList from '@/components/Form/FormDropDownList.vue';
import FormButton from '@/components/Form/FormButton.vue';
import { DropDownItem } from '@/types/FormTypes';

const address = ref('');
const postCode = ref(undefined as string | undefined);
const city = ref(undefined as string | undefined);
const chosenLocation = ref('');

const errorMessage = ref('');

const locationOptions = ref([] as DropDownItem[]);
const locationList = ref([] as OutputAdresse[]);

watchEffect(async () => {
  if (address.value === '') {
    return;
  }
  let locations: OutputAdresseList | undefined;
  try {
    locations = await DefaultService.getSok({
      sok: address.value ?? '',
      postnummer: postCode.value === '' ? undefined : postCode.value,
      poststed: city.value === '' ? undefined : city.value,
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
    displayedValue: location.adressetekst!!,
  }))!!;
  return;
});
</script>

<style scoped></style>
