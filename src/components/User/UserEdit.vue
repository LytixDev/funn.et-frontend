<template>
  <p>{{ $t('UserDetailView.title') }}</p>

  <p>{{ $t('UserDetailView.username') }}: {{ user.username }}</p>
  <OhVueIcon @click="usernameNote = !usernameNote" name="px-warning-box" class="username-note" />
  <p v-if="usernameNote">{{ $t('UserDetailView.usernameCannotChange') }}</p>

  <form @submit.prevent="submit" class="form">
    <FormInput
      labelId="email-label"
      :labelText="$t('UserForm.email')"
      fieldId="email"
      v-model="email"
      :error="errors?.email"
      :fieldType="FormInputTypes.Email"
      fieldRequired
      dataTestid="email" />
    <FormInput
      labelId="first-name-label"
      :labelText="$t('UserForm.firstName')"
      fieldId="firstName"
      v-model="firstName"
      :error="errors?.firstName"
      fieldRequired
      dataTestid="first-name" />
    <FormInput
      labelId="last-name-label"
      :labelText="$t('UserForm.lastName')"
      fieldId="lastName"
      v-model="lastName"
      :error="errors?.lastName"
      fieldRequired
      dataTestid="last-name" />
    <FormButton
      buttonId="create-user-button"
      :class="{ attention: !submitIsDisabled }"
      :disabled="submitIsDisabled"
      :buttonText="$t('UserDetailView.submit')"
      dataTestid="create-user-button"
      @click="submit" />
  </form>
</template>

<script setup lang="ts">
import { UserDTO, UserPatchDTO, UserService } from '@/api/backend';
import { PropType, Ref, ref, computed } from 'vue';
import { useForm, useField, FieldContext } from 'vee-validate';
import { object as yupObject, string as yupString, ref as yupRef } from 'yup';
import FormInput from '@/components/Form/FormInput.vue';
import FormButton from '../Form/FormButton.vue';
import { useI18n } from 'vue-i18n';
import { FormInputTypes } from '@/enums/FormEnums';
import { PxWarningBox } from 'oh-vue-icons/icons';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { useUserInfoStore } from '@/stores/UserStore';
import { useRouter } from 'vue-router';
import handleUnknownError from '@/components/Exceptions/unkownErrorHandler';
import { useErrorStore } from '@/stores/ErrorStore';

const errorStore = useErrorStore();
const router = useRouter();

addIcons(PxWarningBox);
const { t } = useI18n();
const userStore = useUserInfoStore();
const usernameNote: Ref<boolean> = ref(false);
const props = defineProps({
  user: {
    type: Object as PropType<UserDTO>,
    required: true,
  },
  activePage: {
    type: String,
  },
});
const emit = defineEmits(['update:activePage']);

const submitIsDisabled = computed(() => {
  return (
    Object.values(errors.value).filter((value) => value !== undefined).length > 0 ||
    (email.value === props.user.email &&
      firstName.value === props.user.firstName &&
      lastName.value === props.user.lastName)
  );
});

const schema = computed(() =>
  yupObject({
    email: yupString().required(t('UserForm.Error.emailRequired')).email(t('UserForm.Error.emailInvalid')),
    firstName: yupString().required(t('UserForm.Error.firstNameRequired')),
    lastName: yupString().required(t('UserForm.Error.lastNameRequired')),
  }),
);

const { handleSubmit, errors } = useForm({
  validationSchema: schema,
});

const submit = handleSubmit(async (values) => {
  /* if the value has not changed then there is no point sending it in the patch request*/
  const payload = {
    email: props.user.email === values.email ? undefined : values.email,
    firstName: props.user.firstName === values.firstName ? undefined : values.firstName,
    lastName: props.user.lastName === values.firstName ? undefined : values.lastName,
  } as UserPatchDTO;

  UserService.updateUser({ username: props.user.username!, requestBody: payload })
    .then((user: UserDTO) => {
      userStore.setUserInfo({
        firstname: user.firstName,
        lastname: user.lastName,
        role: user.role,
      });
      emit('update:activePage', 'UserDetail');
    })
    .catch((error) => {
      if (error.status === 401) {
        setTimeout(() => {
          router.push({ name: 'login' });
          userStore.clearUserInfo();
        }, 100);
      }
      const message = handleUnknownError(error);
      errorStore.addError(message);
    });
});

const { value: email } = useField('email') as FieldContext<string>;
const { value: firstName } = useField('firstName') as FieldContext<string>;
const { value: lastName } = useField('lastName') as FieldContext<string>;
email.value = props.user.email!;
firstName.value = props.user.firstName!;
lastName.value = props.user.lastName!;
</script>

<style scoped>
.username-note {
  color: #f5a623;
  cursor: pointer;
}
</style>
