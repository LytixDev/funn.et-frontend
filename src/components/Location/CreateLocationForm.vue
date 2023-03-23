<template>
  <form>
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
  </form>
</template>

<script setup lang="ts">
import { LocationControllerService } from '@/api';
import { ref } from 'vue';
import { FormInputTypes } from '@/enums/FormEnums';

const address = ref('');
const latitude = ref(undefined as number | undefined);
const longitude = ref(undefined as number | undefined);
const postCode = ref(undefined as number | undefined);
const city = ref('');


</script>

<style scoped></style>
