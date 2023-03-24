<template>
  <div data-testid="chat" class="chat">
    <h2 class="chat__header">{{ $t('ChatView.title') }} {{ userToDisplay(chatData.messager.username) }}</h2>
    <div data-testid="messages" id="messages" class="chat__messages">
      <div v-for="message in chatData.messages" :key="message.id">
        <Message :messageData="message" :messageClass="messageClass(message.username)" :key="message.id" />
      </div>
    </div>
    <div data-testid="chat-input" class="chat__input">
      <form @submit.prevent="submit">
        <FormInput
          labelId="send-message"
          :labelText="$t('ChatView.message')"
          fieldId="send-message"
          v-model="sendMessage"
          :error="errors?.message"
          fieldRequired
          dataTestId="send-message" />
        <form-button
          buttonId="send-message-button"
          class="attention"
          :buttonText="$t('ChatView.submit')"
          dataTestId="send-message-button"
          :formButtonClass="FormButtonClasses.Wider"
          :buttonType="FormButtonTypes.Submit"
          @click="submit" />
      </form>
    </div>
    <error-box v-model="errorBoxMsg" />
  </div>
</template>

<script lang="ts" setup>
import { FieldContext, useField, useForm } from 'vee-validate';
import FormInput from '@/components/Form/FormInput.vue';
import FormButton from '@/components/Form/FormButton.vue';
import Message from '@/components/Chat/Message.vue';
import ErrorBox from '@/components/Exceptions/ErrorBox.vue';
import { ChatDTO, MessageDTO } from '@/api';
import { useUserInfoStore } from '@/stores/UserStore';
import { computed, onMounted, ref } from 'vue';
import { object as yupObject, string as yupString } from 'yup';
import { useI18n } from 'vue-i18n';
import { ChatControllerService } from '@/api';
import { useRoute } from 'vue-router';
import { FormButtonClasses, FormButtonTypes, FormInputWrapperClasses } from '@/enums/FormEnums';

const { t } = useI18n();

const route = useRoute();

let chatData: ChatDTO = await ChatControllerService.getChatByListingAndUser({
  id: route.params.id as unknown as number,
  username: route.params.username as string,
});

let errorBoxMsg = ref<string>('');

const schema = computed(() =>
  yupObject({
    sendMessage: yupString().required(t('ChatView.Error.messageRequired')).max(256, t('ChatView.Error.messageMax')),
  }),
);

const { handleSubmit, errors } = useForm({
  validationSchema: schema,
});

var messageDiv: HTMLElement;

onMounted(() => {
  messageDiv = document.getElementById('messages') as HTMLElement;
  messageDiv.scrollTop = 9999999;
});

const userStore = useUserInfoStore();
const username = computed(() => userStore.username);

const submit = handleSubmit(async (values) => {
  console.log('Submitting message');
  const messagePayload: MessageDTO = {
    message: values.sendMessage,
  };

  var received: MessageDTO;
  try {
    received = await ChatControllerService.sendMessage({
      id: chatData.id,
      requestBody: messagePayload,
    });
    chatData.messages.push(received);
  } catch (error) {
    errorBoxMsg.value = t('ChatView.Error.messageFailed');
  }
  sendMessage.value = '';
});

const messageClass = (messager: string | undefined): string => {
  return messager === username.value ? 'message__self' : 'message__other';
};

const userToDisplay = (messager: string | undefined): string | undefined => {
  return messager === username.value ? chatData.listingUser.username : chatData.messager.username;
};

const { value: sendMessage } = useField('sendMessage') as FieldContext<string>;
</script>

<style scoped>
.form_button_wider {
  display: inline-block;
  width: 80%;
}
.chat {
  margin-top: var(--spacing-2);
  display: flex;
  flex-direction: column;
  height: 80vh;
  width: 60vw;
  overscroll-behavior: contain;
}

.chat__messages::-webkit-scrollbar {
  width: 0.5rem;
  background: #999;
}

.chat__messages::-webkit-scrollbar-thumb {
  background: var(--primary-color);
}

.chat__messages::-webkit-scrollbar-track {
  background: #999;
}

.chat__header {
  padding: 0;
  font-size: 1.5rem;
  font-weight: 500;
  text-align: center;
  color: var(--color-primary);
}

.chat__messages {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  /* Style a overflow */
}

.chat__input {
  display: inline-flex;
  padding: 1rem;
  justify-content: space-between;
}

.message__self {
  text-align: right;
  display: flex;
  justify-content: flex-end;
}

.message__other {
  text-align: left;
  display: flex;
  justify-content: flex-start;
}

@media only screen and (max-width: 600px) {
  .chat {
    width: 100%;
  }
}
</style>
