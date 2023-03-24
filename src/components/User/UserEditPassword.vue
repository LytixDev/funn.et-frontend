<template>
  <p>{{ $t('UserDetailView.editPasswordLong', { username: user.username}) }}</p>

  <form @submit.prevent="submit">
    <FormInput
      labelId="old-password-label"
      :labelText="$t('UserForm.oldPassword')"
      fieldId="old-password"
      v-model="oldPassword"
      :error="errors?.oldPassword"
      :fieldType="FormInputTypes.Password"
      fieldRequired
      dataTestid="old-password" />
    <FormInput
      labelId="password-label"
      :labelText="$t('UserForm.newPassword')"
      fieldId="password"
      v-model="password"
      :error="errors?.password"
      :fieldType="FormInputTypes.Password"
      fieldRequired
      dataTestid="password" />
    <FormInput
      labelId="repeat-password-label"
      :labelText="$t('UserForm.repeatPassword')"
      fieldId="repeat-password"
      v-model="repeatPassword"
      :error="errors?.repeatPassword"
      :fieldType="FormInputTypes.Password"
      fieldRequired
      dataTestid="repeat-password" />

    <FormButton
      buttonId="create-user-button"
      class="attention"
      :buttonText="$t('RegisterUserView.submit')"
      :class="{ attention: !submitIsDisabled }"
      :disabled="submitIsDisabled"
      dataTestid="create-user-button"
      @click="submit" />
  </form>
</template>

<script setup lang="ts">
import FormButton from '@/components/Form/FormButton.vue';
import FormInput from '@/components/Form/FormInput.vue';
import { FormInputTypes } from '@/enums/FormEnums';
import { useForm, useField, FieldContext } from 'vee-validate';
import { object as yupObject, string as yupString, ref as yupRef } from 'yup';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useUserInfoStore } from '@/stores/UserStore';
import { UserDTO, UserPatchDTO, UserService } from '@/api';
import { PropType } from 'vue';

const userStore = useUserInfoStore();
const { t } = useI18n();

const props = defineProps({
  user: {
    type: Object as PropType<UserDTO>,
    required: true,
  },
  activePage: {
    type: String
  },
});
const emit = defineEmits(['update:activePage']);

const schema = computed(() =>
  yupObject({
    oldPassword: yupString().required(t('UserForm.Error.passwordRequired')),
    password: yupString()
      .required(t('UserForm.Error.passwordRequired'))
      .min(8, t('UserForm.Error.passwordMin'))
      .test('isValidPass', t('UserForm.Error.passwordInvalid'), (value) => {
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        return hasUpperCase && hasLowerCase && hasNumber;
      }),
    repeatPassword: yupString()
      .required(t('UserForm.Error.repeatPasswordRequired'))
      .oneOf([yupRef('password')], t('UserForm.Error.repeatPasswordNotMatch')),
  }),
);

const { handleSubmit, errors } = useForm({
  validationSchema: schema,
});

const submit = handleSubmit(async (values) => {
  const payload = {
    oldPassword: values.oldPassword,
    newPassword: values.password,
  } as UserPatchDTO;

  await UserService.updateUser({ username: props.user.username!, requestBody: payload })
  .then(() => {
    emit('update:activePage', 'UserDetail');
  });
});

/* form values */
const { value: oldPassword } = useField('oldPassword') as FieldContext<string>;
const { value: password } = useField('password') as FieldContext<string>;
const { value: repeatPassword } = useField('repeatPassword') as FieldContext<string>;
/* 
 * sets the password to an empty string.
 * removing this line will somehow break the 'submitIsDisabled' function
 */
password.value = '';

const submitIsDisabled = computed(() => {
  return Object.values(errors.value).filter((value) => value !== undefined).length > 0 ||
  password.value === '' || repeatPassword.value === '' || oldPassword.value === '';
});
</script>
