import { createApp } from 'vue';
import './style.css';
import router from '@/router';
import App from '@/App.vue';
import { createI18n } from 'vue-i18n';
import en from '@/locales/en.json';
import no from '@/locales/no.json';
import { createPinia } from 'pinia';
import { useLanguageStore } from './stores/LanguageStore';
import piniaPersist from 'pinia-plugin-persist';

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPersist);

app.use(pinia);

let localeStore = useLanguageStore();
type MessageSchema = typeof en;
export const i18n = createI18n<[MessageSchema], 'en' | 'no'>({
  locale: localeStore.language,
  allowComposition: true,
  // Set locale messages
  messages: {
    en: en,
    no: no,
  },
});
app.use(i18n).use(router).mount('#app');
