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
        :error-message="$t(errorMessage)"
        :error="true" />
      <p>{{ $t('CreateLocationForm.numberOfLocationsDisplaying') }}: {{ locationList.length }}</p>
    </div>
    <form-button
      button-id="submit-button"
      :button-text="$t('CreateLocationForm.submitButton')"
      data-testid="submit-button" />
  </form>
  <location-map :center="{ lat: mapCenterLat, lon: matCenterLon }" :marker-coords="markerCoords" :zoom="zoom" />
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import 'leaflet/dist/leaflet.css';
import FormInput from '@/components/Form/FormInput.vue';
import { DefaultService, OutputAdresse, OutputAdresseList } from '@/api/geonorge';
import { ApiError, LocationControllerService, LocationCreateDTO } from '@/api';
import FormDropDownList from '@/components/Form/FormDropDownList.vue';
import FormButton from '@/components/Form/FormButton.vue';
import { DropDownItem } from '@/types/FormTypes';
import LocationMap from '@/components/Location/LocationMap.vue';
import { useRouter } from 'vue-router';
import { useUserInfoStore } from '@/stores/UserStore';

const router = useRouter();
const userStore = useUserInfoStore();

defineProps({
  modelValue: {
    type: Object as () => LocationCreateDTO,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const address = ref('');

const errorMessage = ref('');

const locationOptions = ref([] as DropDownItem[]);
const locationList = ref([] as OutputAdresse[]);

const mapCenterLat = ref(0);
const matCenterLon = ref(0);

const selectField = ref('');

const selectedLocation = computed(() => {
  if (locationList.value.length === 0) {
    return undefined;
  }
  if (selectField.value === undefined) {
    selectField.value = locationList.value.at(0)?.adressetekst?.toString()!!;
    return locationList.value[0];
  }
  const location = locationList.value.at(
    locationList.value.map((location) => location.adressetekst?.toString()).indexOf(selectField.value),
  )!!;
  selectField.value = location.adressetekst?.toString()!!;
  return location;
});
const markerCoords = computed(() => {
  const lat = selectedLocation.value?.representasjonspunkt?.lat;
  const lon = selectedLocation.value?.representasjonspunkt?.lon;
  if (lat && lon) {
    zoom.value = 16;
    return { lat, lon };
  }
  return undefined;
});

const zoom = ref(2);

const createLocation = async () => {
  if (selectedLocation.value === undefined) {
    errorMessage.value = 'CreateLocationForm.Error.AddressRequired';
  }
  const payload = {
    address: selectedLocation.value?.adressetekst!!,
    latitude: selectedLocation.value?.representasjonspunkt?.lat!!,
    longitude: selectedLocation.value?.representasjonspunkt?.lon!!,
    postCode: +selectedLocation.value?.postnummer!!,
    city: selectedLocation.value?.poststed!!,
  };
  LocationControllerService.createLocation({
    requestBody: payload,
  })
    .then(() => {
      emit('update:modelValue', payload);
    })
    .catch((error: any) => {
      if (error.status === 401) {
        router.push({ name: 'login' });
        userStore.clearUserInfo();
      }
      errorMessage.value = `Exceptions.${error.body.detail}`;
    });
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
    errorMessage.value = error;
  }
  if (locations?.adresser === undefined || locations.metadata?.totaltAntallTreff === 0) {
    return;
  }
  locationList.value = locations.adresser!!;
  locationOptions.value = locationList.value.map((location: OutputAdresse) => ({
    value: location.adressetekst!!.toString(),
    displayedValue: `${location.adressetekst} ${location.postnummer} ${location.poststed}`,
  }))!!;
  return;
});
</script>

<style scoped></style>
