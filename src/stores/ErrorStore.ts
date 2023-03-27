import { defineStore } from 'pinia';

export const useErrorStore = defineStore('ErrorStore', {
  state: () => ({
    errors: [] as string[],
  }),
  actions: {
    addError(error: string) {
      this.errors.push(error);
    },
    removeCurrentError() {
      if (this.errors.length > 0) {
        this.errors.shift();
      }
    },
  },
  getters: {
    getFirstError(): string {
      if (this.errors.length > 0) {
        return `Exceptions.${this.errors[0]}`;
      }
      return '';
    },
    getLastError(): string {
      if (this.errors.length > 0) {
        return `Exceptions.${this.errors[this.errors.length - 1]}`;
      }
      return '';
    },
  },
});
