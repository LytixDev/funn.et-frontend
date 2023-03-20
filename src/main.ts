import { createApp } from 'vue';
import './style.css';
import router from './router';
import App from './App.vue';
import { createI18n } from 'vue-i18n';
import en from '@/locales/en.json';
import no from '@/locales/no.json';
import { createPinia } from 'pinia';
import { useLanguageStore } from './stores/LanguageStore';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);

let localeStore = useLanguageStore();
type MessageSchema = typeof en;
export const i18n = createI18n<[MessageSchema], 'en' | 'no'>({
  locale: localeStore.language,
  allowComposition: true,
  messages: {
    en: en,
    no: no,
  },
});

app.use(router).use(i18n).mount('#app');
