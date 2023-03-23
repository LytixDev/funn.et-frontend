<template>
  <div class="form">
    <h2 class="form-header">{{ $t('RegisterUserView.title') }}</h2>
    <form @submit.prevent="submit">
      <FormInput
        labelId="username-label"
        :labelText="$t('UserForm.username')"
        fieldId="username"
        v-model="username"
        :error="errors?.username"
        fieldRequired
        dataTestid="username" />
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
      <FormInput
        labelId="password-label"
        :labelText="$t('UserForm.password')"
        fieldId="password"
        v-model="password"
        :error="errors?.password"
        :fieldType="FormInputTypes.Password"
        fieldRequired
        dataTestid="password" />

      <FormButton
        buttonId="create-user-button"
        class="attention"
        :buttonText="$t('RegisterUserView.submit')"
        dataTestid="create-user-button"
        @click="submit" />
    </form>
  </div>
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
import { PublicUserControllerService, RegisterDTO } from '@/api';
import ErrorBox from '@/components/Exceptions/ErrorBox.vue';
import { useUserInfoStore } from '@/stores/UserStore';
import { TokenControllerService, AuthenticateDTO } from '@/api';
import router from '@/router';

const userStore = useUserInfoStore();
const { t } = useI18n();
let errorBoxMsg = ref<string>('');

const schema = computed(() =>
  yupObject({
    username: yupString()
      .min(3, t('UserForm.Error.usernameMin'))
      .max(32, t('UserForm.Error.usernameMax'))
      .required(t('UserForm.Error.usernameRequired')),
    email: yupString().required(t('UserForm.Error.emailRequired')).email(t('UserForm.Error.emailInvalid')),
    firstName: yupString().required(t('UserForm.Error.firstNameRequired')),
    lastName: yupString().required(t('UserForm.Error.lastNameRequired')),
    password: yupString()
      .required(t('UserForm.Error.passwordRequired'))
      .min(8, t('UserForm.Error.passwordMin'))
      .test('isValidPass', t('UserForm.Error.passwordInvalid'), (value) => {
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        return hasUpperCase && hasLowerCase && hasNumber;
      }),
  }),
);

const { handleSubmit, errors } = useForm({
  validationSchema: schema,
});

const submit = handleSubmit(async (values) => {
  const createUserPayload: RegisterDTO = {
    username: values.username,
    email: values.email,
    firstName: values.firstName,
    lastName: values.lastName,
    password: values.password,
  };

  await PublicUserControllerService.createUser({ requestBody: createUserPayload })
    .then(() => {
      let auth: AuthenticateDTO = { username: values.username, password: values.password };

      TokenControllerService.generateToken({ requestBody: auth })
        .then((token) => {
          if (token == null || token == undefined) {
            errorBoxMsg.value = 'Internal server error, please try again later.';
            return;
          }

          userStore.setUserInfo({ accessToken: token, username: values.username });
          router.push({ name: 'home' });
        })
        .catch((authError) => {
          errorBoxMsg.value = authError.body;
          console.log(authError.body);
        });
    })
    .catch((error) => {
      errorBoxMsg.value = error.body;
      console.log(error.body, error);
      //TODO: handle error
      //switch (
      //  error.body as string
      //) {
      //}
    });
});

/* form values */
const { value: username } = useField('username') as FieldContext<string>;
const { value: email } = useField('email') as FieldContext<string>;
const { value: firstName } = useField('firstName') as FieldContext<string>;
const { value: lastName } = useField('lastName') as FieldContext<string>;
const { value: password } = useField('password') as FieldContext<string>;
</script>

<style scoped></style>
