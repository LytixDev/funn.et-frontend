<template>
  <h2>{{ $t('LoginUserView.title') }}</h2>
  <form @submit.prevent="submit">
    <form-input
      labelId="username-label"
      :labelText="$t('UserForm.username')"
      fieldId="username"
      v-model="username"
      :error="errors?.username"
      fieldRequired
      dataTestId="username" />
    <form-input
      labelId="password-label"
      :labelText="$t('UserForm.password')"
      fieldId="password"
      v-model="password"
      :error="errors?.password"
      :fieldType="FormInputTypes.Password"
      fieldRequired
      dataTestId="password" />

    <form-button
      buttonId="login-user-button"
      :buttonText="$t('LoginUserView.submit')"
      dataTestId="login-user-button"
      @click="submit" />
  </form>

  <ErrorBox v-if="errorBoxMsg" v-model="errorBoxMsg" />
</template>

<script setup lang="ts">
import FormButton from '@/components/Form/FormButton.vue';
import FormInput from '@/components/Form/FormInput.vue';
import { FormInputTypes } from '@/enums/FormEnums';
import { useForm, useField, FieldContext } from 'vee-validate';
import { object as yupObject, string as yupString } from 'yup';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import ErrorBox from '@/components/Exceptions/ErrorBox.vue';
import { useUserInfoStore } from '@/stores/UserStore';
import { TokenControllerService, AuthenticateDTO } from '@/api';
import router from '@/router';

const userStore = useUserInfoStore();
const { t } = useI18n();
let errorBoxMsg = ref<string>('');

const schema = computed(() =>
  yupObject({
    username: yupString().required(t('UserForm.Error.usernameRequired')),
    password: yupString().required(t('UserForm.Error.passwordRequired')),
  }),
);

const { handleSubmit, errors } = useForm({
  validationSchema: schema,
});

const submit = handleSubmit(async (values) => {
  const loginUserPayload: AuthenticateDTO = {
    username: values.username,
    password: values.password,
  };

  await TokenControllerService.generateToken({ requestBody: loginUserPayload })
    .then((token) => {
      if (token == null || token == undefined) {
        errorBoxMsg.value = 'Could not log in user';
        return;
      }

      userStore.setUserInfo({ token: token, username: values.username });
      router.push({ name: 'home' });
    })
    .catch((authError) => {
      console.log(authError.body);
      if (authError.detail !== undefined) {
        errorBoxMsg.value = authError.detail;
      } else {
        errorBoxMsg.value = authError.body;
      }
    });
});

/* form values */
const { value: username } = useField('username') as FieldContext<string>;
const { value: password } = useField('password') as FieldContext<string>;
</script>

<style scoped></style>
