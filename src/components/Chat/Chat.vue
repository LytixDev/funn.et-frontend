<template>
  <SideBar :username="username" :key="updateRefSideBar" :chatDTOs="chatDTOs" />
  <div data-testid="chat" class="chat">
    <ChatHeader :username="username" :key="updateRefHeader" :chatData="chatData" />
    <div ref="message_div" data-testid="messages" id="messages" class="chat__messages" :key="updateRefMessages">
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
import SideBar from '@/components/Chat/SideBar.vue';
import FormInput from '@/components/Form/FormInput.vue';
import FormButton from '@/components/Form/FormButton.vue';
import Message from '@/components/Chat/Message.vue';
import ChatHeader from '@/components/Chat/ChatHeader.vue';
import ErrorBox from '@/components/Exceptions/ErrorBox.vue';
import { ChatDTO, MessageDTO } from '@/api/backend';
import { useUserInfoStore } from '@/stores/UserStore';
import { computed, onMounted, ref, watch } from 'vue';
import { object as yupObject, string as yupString } from 'yup';
import { useI18n } from 'vue-i18n';
import { ChatControllerService } from '@/api/backend';
import { useRoute } from 'vue-router';
import { FormButtonClasses, FormButtonTypes } from '@/enums/FormEnums';
import handleUnknownError from '@/components/Exceptions/unkownErrorHandler';
import { useErrorStore } from '@/stores/ErrorStore';

const errorStore = useErrorStore();

const { t } = useI18n();

const route = useRoute();

const errorBoxMsg = ref('');

const updateRefSideBar = ref(0);
const updateRefHeader = ref(0);
const updateRefMessages = ref(0);

const message_div = ref<HTMLElement>();

console.log(message_div);

const chatIdParam = computed(() => route.params.id);

const usernameParam = computed(() => route.params.username);

let chatData: ChatDTO;
let chatDTOs: ChatDTO[];

watch(
  () => route.params,
  async () => {
    try {
      chatData = await ChatControllerService.getChatByListingAndUser({
        id: chatIdParam.value as unknown as number,
        username: usernameParam.value as string,
      });
      updateRefMessages.value++;
      updateRefHeader.value++;
    } catch (error) {
      const message = handleUnknownError(error);
      errorStore.addError(message);
    }
  },
);

try {
  chatData = await ChatControllerService.getChatByListingAndUser({
    id: chatIdParam.value as unknown as number,
    username: usernameParam.value as string,
  });
} catch (error) {
  try {
    chatData = await ChatControllerService.createChat({
      id: chatIdParam.value as unknown as number,
    });
  } catch (error) {
    const message = handleUnknownError(error);
    errorStore.addError(message);
  }
}

try {
  chatDTOs = await ChatControllerService.getChats();
} catch (error) {
  const message = handleUnknownError(error);
  errorStore.addError(message);
}

const schema = computed(() =>
  yupObject({
    sendMessage: yupString().required(t('ChatView.Error.messageRequired')).max(255, t('ChatView.Error.messageMax')),
  }),
);

const { handleSubmit, errors } = useForm({
  validationSchema: schema,
});

onMounted(() => {
  message_div.value?.scrollTo(0, message_div.value.scrollHeight);
});

const userStore = useUserInfoStore();
const username = computed(() => userStore.username);

const submit = handleSubmit(async (values) => {
  const messagePayload: MessageDTO = {
    message: values.sendMessage,
  };

  let received: MessageDTO;
  try {
    received = await ChatControllerService.sendMessage({
      id: chatData.id,
      requestBody: messagePayload,
    });
    chatData.messages.push(received);
  } catch (error) {
    const message = handleUnknownError(error);
    errorStore.addError(message);
  }
  sendMessage.value = '';
  chatDTOs = chatDTOs.filter((chatDTO: ChatDTO) => chatDTO.id !== chatData.id);
  chatDTOs.unshift(chatData);
  updateRefMessages.value++;
});

const messageClass = (messager: string | undefined): string => {
  return messager === username.value ? 'message__self' : 'message__other';
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
  border: 2px solid var(--primary-color);
  border-radius: 0.5rem;
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
    margin-left: auto;
    width: 90%;
  }
}
</style>
