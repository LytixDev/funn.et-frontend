import { defineStore } from 'pinia';

export const useLanguageStore = defineStore('LanguageStore', {
  state: () => ({
    language: localStorage.getItem('language') || 'no',
  }),
  actions: {
    setLanguage(language: string) {
      this.language = language;
      localStorage.setItem('language', language);
    },
  },
});
