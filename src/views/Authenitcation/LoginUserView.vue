<template>
  <div class="login-form">
    <h2>{{ $t('LoginUserView.title') }}</h2>
    <form @submit.prevent="submit">
      <form-input
        labelId="username-label"
        :labelText="$t('UserForm.username')"
        fieldId="username"
        v-model="username"
        :error="errors?.username"
        fieldRequired
        dataTestid="username" />
      <form-input
        labelId="password-label"
        :labelText="$t('UserForm.password')"
        fieldId="password"
        v-model="password"
        :error="errors?.password"
        :fieldType="FormInputTypes.Password"
        fieldRequired
        dataTestid="password" />

      <form-button
        buttonId="login-user-button"
        :buttonText="$t('LoginUserView.submit')"
        dataTestid="login-user-button"
        @click="submit" />
    </form>
    <span>{{ $t('LoginUserView.register') }}</span>
    <router-link to="/register">{{ $t('navigation.register') }}</router-link>
    <error-box v-model="errorBoxMsg" />
  </div>
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
import { TokenControllerService, AuthenticateDTO, OpenAPI, ApiError } from '@/api';
import router from '@/router';
import { PrivateUserControllerService } from '@/api/services/PrivateUserControllerService';

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

  try {
    // Fetch token
    let token = await TokenControllerService.generateToken({ requestBody: loginUserPayload });
    if (token == null || token == undefined) {
      errorBoxMsg.value = 'A valid token could not be created';
      return;
    }
    // Set token
    OpenAPI.TOKEN = token;

    // Fetch user info
    let user = await PrivateUserControllerService.getUser1();
    userStore.setUserInfo({ accessToken: token, username: values.username, role: user.role });
    router.push({ name: 'home' });
  } catch (authError: any) {
    if (authError.detail !== undefined) {
      errorBoxMsg.value = authError.detail;
    } else if (authError.message !== undefined) {
      errorBoxMsg.value = authError.message;
    } else {
      errorBoxMsg.value = 'Could not log with the given credentials';
    }
  }
});

/* form values */
const { value: username } = useField('username') as FieldContext<string>;
const { value: password } = useField('password') as FieldContext<string>;
</script>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.25);
  width: fit-content;
  margin: 2em;
  padding: 2em;
  border-radius: 1em;
  width: min(400px, 100%);
  height: fit-content;
}

h2 {
  color: var(--primary-color);
  margin-bottom: 1.5em;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

span {
  margin: 2em 0em 0.5em 0em;
}

#login-user-button {
  background-color: var(--primary-color);
  color: var(--primary-text-color);
}
</style>
