import { createApp } from 'vue';
import './style.css';
import router from './router';
import App from './App.vue';
import { createI18n } from 'vue-i18n';
import en from '@/locales/en.json';
import no from '@/locales/no.json';

const app = createApp(App);

type MessageSchema = typeof en;
const i18n = createI18n<[MessageSchema], 'en' | 'no'>({
  locale: 'en',
  allowComposition: true,
  messages: {
    en: en,
    no: no,
  },
});

app.use(router).use(i18n).mount('#app');
