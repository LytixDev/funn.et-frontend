<template>
  <form @submit.prevent="createLocation">
    <!-- Inputs for creating location -->
    <form-input
      labelId="location-search-label"
      fieldId="location-search"
      :labelText="$t('CreateLocationForm.searchLabel') + ': '"
      v-model="address"
      data-testid="search-input" />

    <div>
      <form-drop-down-list
        label-id="locations-label"
        field-id="locations-select"
        :label-text="$t('CreateLocationForm.locationsSelectLabel') + ': '"
        v-model="selectField"
        :field-options="locationOptions"
        field-name="locations-select"
        data-testid="locations-select"
        :error-message="!errorMessage ? '' : $t(errorMessage)"
        :error="!!errorMessage" />
      <p>{{ $t('CreateLocationForm.numberOfLocationsDisplaying') }}: {{ locationList.length }}</p>
    </div>
    <form-button
      button-id="submit-button"
      :button-text="$t('CreateLocationForm.submitButton')"
      data-testid="submit-button" />
    <p>
      <span>{{ $t(`CreateLocationForm.selectedLocation`) }}</span
      >: {{ modelValue?.address }}
    </p>
  </form>

  <div v-if="!!modelValue">
    <button @click="removeLocation">{{ $t('CreateLocationForm.removeLocationButton') }}</button>
  </div>
  <location-map
    :center="{ lat: mapCenterLat, lon: matCenterLon }"
    :selected-coords="selectedMarkerCoords"
    :marker-coords-list="markerCoordsList"
    :zoom="zoom" />
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import 'leaflet/dist/leaflet.css';
import FormInput from '@/components/Form/FormInput.vue';
import { DefaultService, OutputAdresse, OutputAdresseList } from '@/api/geonorge';
import { ApiError, LocationControllerService, LocationResponseDTO } from '@/api/backend';
import FormDropDownList from '@/components/Form/FormDropDownList.vue';
import FormButton from '@/components/Form/FormButton.vue';
import { DropDownItem } from '@/types/FormTypes';
import LocationMap from '@/components/Location/LocationMap.vue';
import { AxiosError } from 'axios';

const { modelValue } = defineProps({
  modelValue: {
    type: Object as () => LocationResponseDTO | undefined,
    required: false,
  },
});

const emit = defineEmits(['update:modelValue']);

const address = ref('');

const errorMessage = ref('');

const locationOptions = ref([] as DropDownItem[]);
const locationList = ref([] as OutputAdresse[]);

const mapCenterLat = ref(64);
const matCenterLon = ref(10);
const zoom = ref(5);

const selectField = ref('');

const selectedLocation = computed(() => {
  if (locationList.value.length === 0) {
    return undefined;
  }
  if (selectField.value === undefined) {
    selectField.value = locationList.value.at(0)?.adressetekst?.toString()!!;
    return locationList.value[0];
  }
  let index = locationList.value.map((location) => location.adressetekst?.toString()).indexOf(selectField.value);
  index = index === -1 ? 0 : index;
  const location = locationList.value.at(index)!!;
  selectField.value = location.adressetekst?.toString()!!;
  return location;
});
const selectedMarkerCoords = computed(() => {
  const lat = selectedLocation.value?.representasjonspunkt?.lat ?? modelValue?.latitude;
  const lon = selectedLocation.value?.representasjonspunkt?.lon ?? modelValue?.longitude;
  if (lat && lon) {
    zoom.value = 16;
    return { lat, lon };
  }
  return undefined;
});

const markerCoordsList = computed(() => {
  return locationList.value
    .map((location) => {
      const lat = location.representasjonspunkt?.lat;
      const lon = location.representasjonspunkt?.lon;
      if (lat && lon) {
        return { lat, lon };
      }
      return undefined;
    })
    .filter(
      (coords) => coords?.lat !== selectedMarkerCoords.value?.lat && coords?.lon !== selectedMarkerCoords.value?.lon,
    );
});

const createLocation = async () => {
  if (selectedLocation.value === undefined) {
    errorMessage.value = 'CreateLocationForm.Error.AddressRequired';
    return;
  }
  if (Object.values(selectedLocation.value!!).filter((_key, value) => value === undefined).length > 0) {
    errorMessage.value = 'CreateLocationForm.Error.AddressRequired';
    return;
  }
  const payload = {
    address: selectedLocation.value!!.adressetekst!!,
    latitude: selectedLocation.value!!.representasjonspunkt?.lat!!,
    longitude: selectedLocation.value!!.representasjonspunkt?.lon!!,
    postCode: +selectedLocation.value!!.postnummer!!,
    city: selectedLocation.value!!.poststed!!,
  };
  LocationControllerService.createLocation({
    requestBody: payload,
  })
    .then((data) => {
      emit('update:modelValue', data);
    })
    .catch((error: any) => {
      if (error instanceof AxiosError) {
        errorMessage.value = `Exceptions.${error.code!!}`;
        return;
      }
      Promise.reject(error);
    });
};

const removeLocation = () => {
  emit('update:modelValue', undefined);
  address.value = '';
};

watchEffect(async () => {
  if (address.value === '') {
    return;
  }
  let locations: OutputAdresseList | undefined;
  try {
    locations = await DefaultService.getSok({
      sok: address.value,
      fuzzy: address.value?.length > 12,
    });
  } catch (error: any) {
    if (error instanceof ApiError) {
      errorMessage.value = error.body.detail;
    }
    Promise.reject(error);
  }
  if (locations?.adresser === undefined || locations.metadata?.totaltAntallTreff === 0) {
    return;
  }
  locationList.value = locations.adresser!!;
  locationOptions.value = locationList.value.map((location: OutputAdresse) => ({
    value: location.adressetekst!!,
    displayedValue: `${location.adressetekst} ${location.postnummer} ${location.poststed}`,
  }))!!;
  return;
});
</script>

<style></style>
