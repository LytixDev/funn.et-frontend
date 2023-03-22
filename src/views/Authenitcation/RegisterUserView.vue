<template>
  <h2>{{ $t('RegisterUserView.title') }}</h2>
  <form @submit.prevent="submit" method="post">
    <FormInput
      labelId="username-label"
      :labelText="$t('UserForm.username')"
      fieldId="username"
      v-model="username"
      :error="errors?.username"
      fieldRequired
      dataTestId="username" />
    <FormInput
      labelId="email-label"
      :labelText="$t('UserForm.email')"
      fieldId="email"
      v-model="email"
      :error="errors?.email"
      :fieldType="FormInputTypes.Email"
      fieldRequired
      dataTestId="email" />
    <FormInput
      labelId="first-name-label"
      :labelText="$t('UserForm.firstName')"
      fieldId="firstName"
      v-model="firstName"
      :error="errors?.firstName"
      fieldRequired
      dataTestId="first-name" />
    <FormInput
      labelId="last-name-label"
      :labelText="$t('UserForm.lastName')"
      fieldId="lastName"
      v-model="lastName"
      :error="errors?.lastName"
      fieldRequired
      dataTestId="last-name" />
    <FormInput
      labelId="password-label"
      :labelText="$t('UserForm.password')"
      fieldId="password"
      v-model="password"
      :error="errors?.password"
      :fieldType="FormInputTypes.Password"
      fieldRequired
      dataTestId="password" />

    <FormButton
      buttonId="create-user-button"
      :buttonText="$t('RegisterUserView.submit')"
      dataTestId="create-user-button"
      @click="submit" />
  </form>

  <ErrorBox v-if="errorBoxMsg" v-model="errorBoxMsg" />
</template>

<script lang="ts">
import FormButton from '@/components/Form/FormButton.vue';
import FormInput from '@/components/Form/FormInput.vue';
import { FormInputTypes } from '@/enums/FormEnums';
import BasePageView from '@/views/BasePageView.vue';
import { useForm, useField, FieldContext } from 'vee-validate';
import { object as yupObject, string as yupString } from 'yup';
import { defineComponent } from 'vue';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { PublicUserControllerService, RegisterDTO } from '@/api';
import ErrorBox from '@/components/Exceptions/ErrorBox.vue';
import { useUserInfoStore } from '@/stores/UserStore';
import { TokenControllerService, AuthenticateDTO } from '@/api';
import router from '@/router';

export default defineComponent({
  components: {
    BasePageView,
    FormInput,
    FormButton,
    ErrorBox,
  },
  setup() {
    const userStore = useUserInfoStore();
    const { t } = useI18n();
    let errorBoxMsg = ref<string>('');

    const schema = yupObject({
      username: yupString()
        .min(3, computed(() => t?.('UserForm.Error.usernameMin')).value)
        .max(32, computed(() => t?.('UserForm.Error.usernameMax')).value)
        .required(computed(() => t?.('UserForm.Error.usernameRequired')).value),
      email: yupString()
        .required(computed(() => t?.('UserForm.Error.emailRequired')).value)
        .email(computed(() => t?.('UserForm.Error.emailInvalid')).value),
      firstName: yupString().required(computed(() => t?.('UserForm.Error.firstNameRequired')).value),
      lastName: yupString().required(computed(() => t?.('UserForm.Error.lastNameRequired')).value),
      password: yupString()
        .required(computed(() => t?.('UserForm.Error.passwordRequired')).value)
        .min(8, computed(() => t?.('UserForm.Error.passwordMin')).value)
        .test('isValidPass', computed(() => t?.('UserForm.Error.passwordInvalid')).value, (value) => {
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
      console.log(values);

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

              userStore.setUserInfo({ token: token, username: values.username });
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

    return {
      username,
      email,
      firstName,
      lastName,
      password,
      schema,
      submit,
      errors,
      errorBoxMsg,
      FormInputTypes,
    };
  },
});
</script>

<style scoped></style>
