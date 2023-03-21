<template>
  <h2>{{ $t('RegisterUserView.title') }}</h2>
  <form @submit.prevent="submit">
    <FormInput
      labelId="username-label"
      :labelText="$t('RegisterUserView.username')"
      fieldId="username"
      v-model="username"
      :error="errors?.username"
      fieldRequired
      dataTestId="username" />
    <FormInput
      labelId="password-label"
      :labelText="$t('RegisterUserView.password')"
      fieldId="password"
      v-model="password"
      :error="errors?.password"
      :fieldType="FormInputTypes.Password"
      fieldRequired
      dataTestId="password" />

    <FormButton
      buttonId="login-user-button"
      :buttonText="$t('RegisterUserView.submit')"
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

const schema = yupObject({
  username: yupString()
    .min(3, computed(() => t?.('RegisterUserView.Error.usernameMin')).value)
    .max(32, computed(() => t?.('RegisterUserView.Error.usernameMax')).value)
    .required(computed(() => t?.('RegisterUserView.Error.usernameRequired')).value),
  password: yupString()
    .required(computed(() => t?.('RegisterUserView.Error.passwordRequired')).value)
    .min(8, computed(() => t?.('RegisterUserView.Error.passwordMin')).value)
    .test('isValidPass', computed(() => t?.('RegisterUserView.Error.passwordInvalid')).value, (value) => {
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      return hasUpperCase && hasLowerCase && hasNumber;
    }),
});

const { handleSubmit, errors } = useForm({
  validationSchema: schema,
});

const submit = handleSubmit(async (values) => {
  const loginUserPayload: AuthenticateDTO = {
    username: values.username,
    password: values.password,
  };

  await await TokenControllerService.generateToken({ requestBody: loginUserPayload })
    .then((token) => {
      if (token == null || token == undefined) {
        errorBoxMsg.value = 'Could not log in user';
        return;
      }

      userStore.setUserInfo({ token: token, username: values.username });
      router.push({ name: 'home' });
    })
    .catch((authError) => {
      errorBoxMsg.value = authError.body;
      console.log(authError.body);
    });
});

/* form values */
const { value: username } = useField('username') as FieldContext<string>;
const { value: password } = useField('password') as FieldContext<string>;
</script>

<style scoped></style>
