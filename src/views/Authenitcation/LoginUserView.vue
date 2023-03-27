<template>
  <div class="form">
    <h2 class="form-header">{{ $t('LoginUserView.title') }}</h2>
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
        class="attention"
        :buttonText="$t('LoginUserView.submit')"
        dataTestid="login-user-button"
        @click="submit" />
    </form>
    <span>{{ $t('LoginUserView.register') }}</span>
    <router-link to="/register">{{ $t('navigation.register') }}</router-link>
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
import { useUserInfoStore } from '@/stores/UserStore';
import { TokenControllerService, AuthenticateDTO, OpenAPI, UserService } from '@/api/backend';
import { useRouter, useRoute } from 'vue-router';
import handleUnknownError from '@/components/Exceptions/unkownErrorHandler';
import { useErrorStore } from '@/stores/ErrorStore';

const errorStore = useErrorStore();

const userStore = useUserInfoStore();
const { t } = useI18n();
let errorBoxMsg = ref<string>('');
const router = useRouter();
const route = useRoute();

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
    let user = await UserService.getUser1();
    userStore.setUserInfo({
      accessToken: token,
      firstname: user.firstName,
      lastname: user.lastName,
      username: user.username,
      role: user.role,
    });

    router.push((route.query.redirect as string) || '/');
  } catch (error: any) {
    if (error.status === 401) {
      setTimeout(() => {
        router.push({ name: 'login' });
        userStore.clearUserInfo();
      }, 100);
    }
    const message = handleUnknownError(error);
    if (message == 'UsernameAlreadyExistsException') {
      errors.value.username = 'UserForm.Error.usernameAlreadyExists';
      return;
    } else if (message == 'EmailAlreadyExistsException') {
      errors.value.username = 'UserForm.Error.emailAlreadyExists';
      return;
    }
    errorStore.addError(message);
  }
});

/* form values */
const { value: username } = useField('username') as FieldContext<string>;
const { value: password } = useField('password') as FieldContext<string>;
</script>

<style scoped>
span {
  margin: 2em 0em 0.5em 0em;
}
</style>
